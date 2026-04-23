"use client";

import { useState } from "react";

import LayerControls from "@/components/layout/LayerControls";
import LayerExplanation from "@/components/layout/LayerExplanation";
import SidePanel from "@/components/layout/SidePanel";
import MapView from "@/components/map/MapView";
import airQualityById from "@/public/data/air-quality.json";
import districtInfoById from "@/public/data/district-info.json";
import greenSpaceById from "@/public/data/green-space.json";

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

type GreenSpaceInfo = {
  green_space: number;
};

type ActiveLayer =
  | "density"
  | "area"
  | "airQuality"
  | "greenSpace";

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
const greenSpaceEntries = Object.entries(greenSpaceById) as [
  string,
  GreenSpaceInfo,
][];
const layerOptions: { value: ActiveLayer; label: string }[] = [
  { value: "density", label: "Density" },
  { value: "area", label: "Area" },
  { value: "airQuality", label: "Air quality" },
  { value: "greenSpace", label: "Green space" },
];
const layerExplanations: Record<
  ActiveLayer,
  { title: string; description: string }
> = {
  density: {
    title: "Population density",
    description:
      "Higher values indicate more people living per square kilometer.",
  },
  area: {
    title: "District area",
    description: "Larger districts cover more physical area.",
  },
  airQuality: {
    title: "Air quality",
    description:
      "Shows relative NO2 levels, where higher values mean higher traffic-related exposure.",
  },
  greenSpace: {
    title: "Green space",
    description:
      "Shows relative green space availability across Berlin districts.",
  },
};
const defaultLayerExplanation = {
  title: "Map overview",
  description: "Select a layer to color districts by a specific urban signal.",
};

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
const greenSpaceThresholds = getThresholds(
  greenSpaceEntries.map(([, greenSpace]) => greenSpace.green_space),
);
const defaultLayerFillColors = Object.fromEntries(
  districtInfoEntries.map(([districtId]) => [districtId, "#6f7c6e"]),
);

const layerFillColors: LayerFillColors = {
  density: Object.fromEntries(
    districtInfoEntries.map(([districtId, district]) => [
      districtId,
      getLevelLabel(district.density, densityThresholds, [
        "#d8b4fe",
        "#8b5cf6",
        "#581c87",
      ]),
    ]),
  ),
  area: Object.fromEntries(
    districtInfoEntries.map(([districtId, district]) => [
      districtId,
      getLevelLabel(district.area_km2, areaThresholds, [
        "#fcd34d",
        "#f59e0b",
        "#92400e",
      ]),
    ]),
  ),
  airQuality: Object.fromEntries(
    airQualityEntries.map(([districtId, airQuality]) => [
      districtId,
      getLevelLabel(airQuality.no2, airQualityThresholds, [
        "#fca5a5",
        "#ef4444",
        "#991b1b",
      ]),
    ]),
  ),
  greenSpace: Object.fromEntries(
    greenSpaceEntries.map(([districtId, greenSpace]) => [
      districtId,
      getLevelLabel(greenSpace.green_space, greenSpaceThresholds, [
        "#86efac",
        "#9fc78f",
        "#166534",
      ]),
    ]),
  ),
};

export default function CityLensShell() {
  const [activeLayer, setActiveLayer] = useState<ActiveLayer | null>(null);
  const [selectedDistrict, setSelectedDistrict] =
    useState<SelectedDistrict>(null);
  const activeLayerExplanation = activeLayer
    ? layerExplanations[activeLayer]
    : defaultLayerExplanation;
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
  const greenSpaceInfo = selectedDistrict
    ? (greenSpaceById[selectedDistrict.id as keyof typeof greenSpaceById] as
        | GreenSpaceInfo
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
  const greenSpaceSummary = greenSpaceInfo
    ? `Green space: ${getLevelLabel(
        greenSpaceInfo.green_space,
        greenSpaceThresholds,
        ["Lower", "Medium", "Higher"],
      )}`
    : null;
  const isAirQualityActive = activeLayer === "airQuality";
  const isGreenSpaceActive = activeLayer === "greenSpace";

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <MapView
          activeLayer={activeLayer}
          defaultFillColors={defaultLayerFillColors}
          layerFillColors={layerFillColors}
          onDistrictSelect={setSelectedDistrict}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 p-6 md:p-8">
        <div className="absolute left-6 top-6 flex max-w-[min(32rem,calc(100vw-3rem))] flex-col gap-4 md:left-8 md:top-8 md:max-w-xl">
          <section
            aria-labelledby="map-shell-title"
            className="pointer-events-auto rounded-3xl border border-black/10 bg-white/82 p-6 shadow-sm backdrop-blur-sm"
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
          </section>

          <div className="pointer-events-auto flex max-w-md flex-col gap-3 rounded-3xl border border-black/10 bg-white/78 p-4 shadow-sm backdrop-blur-sm">
            <LayerControls
              activeLayer={activeLayer}
              layerOptions={layerOptions}
              onLayerChange={setActiveLayer}
            />
            <LayerExplanation
              title={activeLayerExplanation.title}
              description={activeLayerExplanation.description}
            />
          </div>
        </div>

        <div className="absolute inset-x-6 bottom-6 md:inset-x-auto md:bottom-8 md:right-8 md:top-8">
          <SidePanel
            selectedDistrict={selectedDistrict}
            districtInfo={districtInfo}
            contextSummary={contextSummary}
            airQualitySummary={airQualitySummary}
            greenSpaceSummary={greenSpaceSummary}
            isAirQualityActive={isAirQualityActive}
            isGreenSpaceActive={isGreenSpaceActive}
          />
        </div>
      </div>
    </main>
  );
}
