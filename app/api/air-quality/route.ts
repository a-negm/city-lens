import { NextResponse } from "next/server";
import https from "https";

type OkData = {
  status: "ok";
  aqi: number;
  dominantPollutant: string;
  stationName: string;
  updatedAt?: string;
};

const UNAVAILABLE = { status: "unavailable" as const };

function fetchJson(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { family: 4 }, (res) => {
      let body = "";
      res.on("data", (chunk: Buffer) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.setTimeout(8000, () => req.destroy(new Error("timeout")));
    req.on("error", reject);
  });
}

export async function GET(): Promise<NextResponse> {
  const token = process.env.WAQI_API_TOKEN;
  if (!token) return NextResponse.json(UNAVAILABLE);

  let raw: unknown;
  try {
    raw = await fetchJson(
      `https://api.waqi.info/feed/berlin/?token=${token}`,
    );
  } catch {
    return NextResponse.json(UNAVAILABLE);
  }

  if (
    typeof raw !== "object" ||
    raw === null ||
    (raw as { status?: unknown }).status !== "ok"
  ) {
    return NextResponse.json(UNAVAILABLE);
  }

  const data = (raw as { data?: unknown }).data;
  if (typeof data !== "object" || data === null) {
    return NextResponse.json(UNAVAILABLE);
  }

  const d = data as Record<string, unknown>;

  if (typeof d.aqi !== "number" || isNaN(d.aqi)) {
    return NextResponse.json(UNAVAILABLE);
  }

  const dominantPollutant =
    typeof d.dominantpol === "string" ? d.dominantpol : "unknown";

  const city =
    typeof d.city === "object" && d.city !== null
      ? (d.city as Record<string, unknown>)
      : null;

  const stationName =
    city && typeof city.name === "string" ? city.name : "Berlin";

  const time =
    typeof d.time === "object" && d.time !== null
      ? (d.time as Record<string, unknown>)
      : null;

  const updatedAt =
    time && typeof time.iso === "string"
      ? time.iso
      : time && typeof time.s === "string"
        ? time.s
        : undefined;

  const result: OkData = {
    status: "ok",
    aqi: d.aqi,
    dominantPollutant,
    stationName,
    ...(updatedAt !== undefined && { updatedAt }),
  };

  return NextResponse.json(result);
}
