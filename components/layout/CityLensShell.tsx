"use client";

import { useState } from "react";

import MapView from "@/components/map/MapView";
import airQualityById from "@/public/data/air-quality.json";
import districtInfoById from "@/public/data/district-info.json";

type SelectedDistrict = {
  id: string;
  name: string;
} | null;

type DistrictInfo = {
  name: string;
  population: number;
  area_km2: number;
  density: number;
};

type AirQualityInfo = {
  no2: number;
};

type ActiveLayer = "districts" | "density" | "area" | "airQuality";

type LayerFillColors = Record<ActiveLayer, Record<string, string>>;

const districtInfoList = Object.values(districtInfoById) as DistrictInfo[];
const districtInfoEntries = Object.entries(districtInfoById) as [
  string,
  DistrictInfo,
][];
const airQualityEntries = Object.entries(airQualityById) as [
  string,
  AirQualityInfo,
][];
const layerOptions: { value: ActiveLayer; label: string }[] = [
  { value: "districts", label: "Districts" },
  { value: "density", label: "Density" },
  { value: "area", label: "Area" },
  { value: "airQuality", label: "Air quality" },
];

function getThresholds(values: number[]) {
  const sortedValues = [...values].sort((a, b) => a - b);

  return {
    lowUpper: sortedValues[3],
    mediumUpper: sortedValues[7],
  };
}

function getLevelLabel(
  value: number,
  thresholds: { lowUpper: number; mediumUpper: number },
  labels: [string, string, string],
) {
  if (value <= thresholds.lowUpper) {
    return labels[0];
  }

  if (value <= thresholds.mediumUpper) {
    return labels[1];
  }

  return labels[2];
}

const densityThresholds = getThresholds(
  districtInfoList.map((district) => district.density),
);
const populationThresholds = getThresholds(
  districtInfoList.map((district) => district.population),
);
const areaThresholds = getThresholds(
  districtInfoList.map((district) => district.area_km2),
);
const airQualityThresholds = getThresholds(
  airQualityEntries.map(([, airQuality]) => airQuality.no2),
);

const layerFillColors: LayerFillColors = {
  districts: Object.fromEntries(
    districtInfoEntries.map(([districtId]) => [districtId, "#6f7c6e"]),
  ),
  density: Object.fromEntries(
    districtInfoEntries.map(([districtId, district]) => [
      districtId,
      getLevelLabel(district.density, densityThresholds, [
        "#d8e2d1",
        "#8faa80",
        "#4f6b50",
      ]),
    ]),
  ),
  area: Object.fromEntries(
    districtInfoEntries.map(([districtId, district]) => [
      districtId,
      getLevelLabel(district.area_km2, areaThresholds, [
        "#efe3c7",
        "#d5b679",
        "#a7722f",
      ]),
    ]),
  ),
  airQuality: Object.fromEntries(
    airQualityEntries.map(([districtId, airQuality]) => [
      districtId,
      getLevelLabel(airQuality.no2, airQualityThresholds, [
        "#dcefe3",
        "#97c5a6",
        "#4e8f67",
      ]),
    ]),
  ),
};

export default function CityLensShell() {
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>("districts");
  const [selectedDistrict, setSelectedDistrict] =
    useState<SelectedDistrict>(null);
  const districtInfo = selectedDistrict
    ? (districtInfoById[selectedDistrict.id as keyof typeof districtInfoById] as
        | DistrictInfo
        | undefined)
    : undefined;
  const airQualityInfo = selectedDistrict
    ? (airQualityById[selectedDistrict.id as keyof typeof airQualityById] as
        | AirQualityInfo
        | undefined)
    : undefined;
  const contextSummary = districtInfo
    ? [
        `Density: ${getLevelLabel(districtInfo.density, densityThresholds, [
          "Low",
          "Medium",
          "High",
        ])}`,
        `Population size: ${getLevelLabel(
          districtInfo.population,
          populationThresholds,
          ["Smaller district", "Mid-sized district", "Large district"],
        )}`,
        `Area size: ${getLevelLabel(districtInfo.area_km2, areaThresholds, [
          "Compact",
          "Medium",
          "Expansive",
        ])}`,
      ]
    : null;
  const airQualitySummary = airQualityInfo
    ? `Air quality: ${getLevelLabel(airQualityInfo.no2, airQualityThresholds, [
        "Lower NO2",
        "Medium NO2",
        "Higher NO2",
      ])}`
    : null;
  const isAirQualityActive = activeLayer === "airQuality";

  return (
    <main className="min-h-screen p-6 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm md:min-h-[calc(100vh-4rem)] md:flex-row">
        <section
          aria-labelledby="map-shell-title"
          className="flex min-h-[24rem] flex-1 flex-col justify-between border-b border-black/10 bg-[linear-gradient(180deg,#f6f7f4_0%,#ecefe7_100%)] p-6 md:min-h-0 md:border-b-0 md:border-r md:p-8"
        >
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
              CityLens
            </p>
            <div className="space-y-2">
              <h1
                id="map-shell-title"
                className="max-w-xl text-3xl font-medium tracking-tight text-black md:text-4xl"
              >
                A calm starting point for a map-first urban health interface.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-black/65 md:text-base">
                This placeholder marks where the future Berlin map experience
                will live.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div
              role="group"
              aria-label="Map layer controls"
              className="inline-flex rounded-xl border border-black/10 bg-white/80 p-1"
            >
              {layerOptions.map((layer) => {
                const isActive = activeLayer === layer.value;

                return (
                  <button
                    key={layer.value}
                    type="button"
                    onClick={() => setActiveLayer(layer.value)}
                    className={`rounded-lg px-3 py-1.5 text-sm transition ${
                      isActive
                        ? "bg-black text-white"
                        : "text-black/65 hover:bg-black/5"
                    }`}
                  >
                    {layer.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-1 overflow-hidden rounded-2xl border border-black/15 bg-white/55">
              <MapView
                activeLayer={activeLayer}
                layerFillColors={layerFillColors}
                onDistrictSelect={setSelectedDistrict}
              />
            </div>
          </div>
        </section>

        <aside
          aria-labelledby="panel-shell-title"
          className="flex w-full flex-col justify-between bg-stone-50 p-6 md:max-w-sm md:p-8"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
                Side Panel
              </p>
              {selectedDistrict ? (
                <>
                  <h2
                    id="panel-shell-title"
                    className="text-xl font-medium tracking-tight text-black"
                  >
                    Selected district
                  </h2>
                  {districtInfo ? (
                    <div className="space-y-3 rounded-2xl border border-black/10 bg-white p-4">
                      <p className="text-sm font-medium text-black">
                        {districtInfo.name}
                      </p>
                      <div
                        className={`space-y-1 rounded-xl border p-3 text-sm text-black/70 ${
                          isAirQualityActive
                            ? "border-black/10"
                            : "border-black/15"
                        }`}
                      >
                        <p
                          className={`text-black ${
                            isAirQualityActive ? "font-medium" : "font-semibold"
                          }`}
                        >
                          Context summary
                        </p>
                        {contextSummary?.map((label) => (
                          <p key={label}>{label}</p>
                        ))}
                      </div>
                      {airQualitySummary ? (
                        <div
                          className={`space-y-1 rounded-xl border p-3 text-sm text-black/70 ${
                            isAirQualityActive
                              ? "border-black/15"
                              : "border-black/10"
                          }`}
                        >
                          <p
                            className={`text-black ${
                              isAirQualityActive ? "font-semibold" : "font-medium"
                            }`}
                          >
                            Air quality
                          </p>
                          <p>{airQualitySummary}</p>
                        </div>
                      ) : null}
                      <dl className="space-y-2 text-sm text-black/70">
                        <div className="flex items-center justify-between gap-4">
                          <dt>Population</dt>
                          <dd className="font-medium text-black">
                            {districtInfo.population.toLocaleString("en-US")}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <dt>Area (km²)</dt>
                          <dd className="font-medium text-black">
                            {districtInfo.area_km2}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <dt>Density (people/km²)</dt>
                          <dd className="font-medium text-black">
                            {districtInfo.density.toLocaleString("en-US")}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                      <p className="text-sm font-medium text-black">
                        {selectedDistrict.name}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-black/65">
                        District info is not available yet.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h2
                    id="panel-shell-title"
                    className="text-xl font-medium tracking-tight text-black"
                  >
                    No district selected
                  </h2>
                  <p className="text-sm leading-6 text-black/65">
                    Select a district on the map to see its name here.
                  </p>
                </>
              )}
            </div>
          </div>

          <p className="mt-8 text-xs leading-5 text-black/45">
            Static shell only. No live data, interactivity, or scoring yet.
          </p>
        </aside>
      </div>
    </main>
  );
}
