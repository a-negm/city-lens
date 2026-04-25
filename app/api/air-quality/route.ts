import { NextResponse } from "next/server";
import https from "https";

type DistrictLevel = "lower" | "medium" | "higher";

type OkData = {
  status: "ok";
  aqi: number;
  dominantPollutant: string;
  stationName: string;
  updatedAt?: string;
  districts: Record<string, DistrictLevel>;
};

const UNAVAILABLE = { status: "unavailable" as const };

// Verified 2026-04-25 via WAQI search API. Each UID maps to the district IDs
// it proxies by geographic proximity. Station-proxy coverage only — not true
// district-level measurement.
const STATION_DISTRICTS: [number, string[]][] = [
  [10039, ["11000001"]],               // Mitte, Brückenstraße → Mitte
  [10038, ["11000002", "11000011"]],   // Friedrichshain-Frankfurter Allee → FK, Lichtenberg
  [10033, ["11000003", "11000012"]],   // Buch → Pankow, Reinickendorf
  [10031, ["11000004", "11000005"]],   // Grunewald → Charlottenburg-Wilmersdorf, Spandau
  [10035, ["11000006", "11000007"]],   // Steglitz-Schildhornstr. → Steglitz-Zehlendorf, Tempelhof-Schöneberg
  [10036, ["11000008"]],               // Neukölln-Silbersteinstr. → Neukölln
  [10034, ["11000009", "11000010"]],   // Friedrichshagen → Treptow-Köpenick, Marzahn-Hellersdorf
];

// Berlin-calibrated thresholds. EPA Good/Moderate/Unhealthy bands (≤50/51-100/>100)
// place nearly all Berlin readings in the lower two tiers on typical days.
// Tighter bands give visible map differentiation at normal Berlin AQI levels.
const AQI_THRESHOLDS = { low: 40, medium: 60 };

function aqiToLevel(aqi: number): DistrictLevel {
  if (aqi <= AQI_THRESHOLDS.low) return "lower";
  if (aqi <= AQI_THRESHOLDS.medium) return "medium";
  return "higher";
}

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

type StationData = {
  aqi: number;
  dominantPollutant: string;
  stationName: string;
  updatedAt?: string;
};

function parseStation(raw: unknown): StationData | null {
  if (
    typeof raw !== "object" ||
    raw === null ||
    (raw as { status?: unknown }).status !== "ok"
  ) {
    return null;
  }

  const data = (raw as { data?: unknown }).data;
  if (typeof data !== "object" || data === null) return null;

  const d = data as Record<string, unknown>;
  if (typeof d.aqi !== "number" || isNaN(d.aqi)) return null;

  const dominantPollutant =
    typeof d.dominentpol === "string" ? d.dominentpol : "unknown";

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

  return { aqi: d.aqi, dominantPollutant, stationName, updatedAt };
}

export async function GET(): Promise<NextResponse> {
  const token = process.env.WAQI_API_TOKEN;
  if (!token) return NextResponse.json(UNAVAILABLE);

  const results = await Promise.allSettled(
    STATION_DISTRICTS.map(([uid]) =>
      fetchJson(`https://api.waqi.info/feed/@${uid}/?token=${token}`),
    ),
  );

  const districts: Record<string, DistrictLevel> = {};
  let primary: StationData | null = null;

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status !== "fulfilled") continue;

    const station = parseStation(result.value);
    if (!station) continue;

    if (primary === null) primary = station;

    const level = aqiToLevel(station.aqi);
    for (const id of STATION_DISTRICTS[i][1]) {
      districts[id] = level;
    }
  }

  if (primary === null) return NextResponse.json(UNAVAILABLE);

  const response: OkData = {
    status: "ok",
    aqi: primary.aqi,
    dominantPollutant: primary.dominantPollutant,
    stationName: primary.stationName,
    ...(primary.updatedAt !== undefined && { updatedAt: primary.updatedAt }),
    districts,
  };

  return NextResponse.json(response);
}
