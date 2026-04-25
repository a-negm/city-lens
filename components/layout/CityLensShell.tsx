"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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
  | "airQuality"
  | "greenSpace";

type DistrictLevel = "lower" | "medium" | "higher";

type LiveAqiData =
  | { status: "ok"; aqi: number; dominantPollutant: string; stationName: string; updatedAt?: string; districts?: Record<string, DistrictLevel> }
  | { status: "unavailable" };

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
  { value: "airQuality", label: "Air quality" },
  { value: "greenSpace", label: "Green space" },
];
const layerExplanations: Record<
  ActiveLayer,
  { title: string; items: { color: string; label: string }[] }
> = {
  density: {
    title: "Population density",
    items: [
      { color: "#d8b4fe", label: "Low" },
      { color: "#8b5cf6", label: "Medium" },
      { color: "#581c87", label: "High" },
    ],
  },
  airQuality: {
    title: "Air quality",
    items: [
      { color: "#4ade80", label: "Good" },
      { color: "#fb923c", label: "Moderate" },
      { color: "#f87171", label: "Poor" },
    ],
  },
  greenSpace: {
    title: "Green space",
    items: [
      { color: "#86efac", label: "Lower" },
      { color: "#9fc78f", label: "Medium" },
      { color: "#166534", label: "Higher" },
    ],
  },
};
const PANEL_TRANSITION_MS = 180;

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

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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

const LEVEL_COLORS: Record<DistrictLevel, string> = {
  lower: "#4ade80",
  medium: "#fb923c",
  higher: "#f87171",
};

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
  airQuality: Object.fromEntries(
    airQualityEntries.map(([districtId, airQuality]) => [
      districtId,
      getLevelLabel(airQuality.no2, airQualityThresholds, [
        "#4ade80",
        "#fb923c",
        "#f87171",
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
  const [renderedDistrict, setRenderedDistrict] =
    useState<SelectedDistrict>(null);
  const [liveAqi, setLiveAqi] = useState<LiveAqiData | null>(null);

  const liveDistricts =
    liveAqi?.status === "ok" && liveAqi.districts ? liveAqi.districts : null;

  const effectiveLayerFillColors = useMemo<LayerFillColors>(() => {
    if (!liveDistricts) return layerFillColors;
    return {
      ...layerFillColors,
      airQuality: Object.fromEntries(
        Object.entries(layerFillColors.airQuality).map(([id, fallback]) => [
          id,
          liveDistricts[id] !== undefined
            ? LEVEL_COLORS[liveDistricts[id]]
            : fallback,
        ]),
      ),
    };
  }, [liveDistricts]);

  const handleResetLayer = useCallback(() => {
    setActiveLayer(null);
  }, []);

  // Keep renderedDistrict in sync with selectedDistrict during render so we never
  // call setState synchronously inside an effect. React re-renders immediately
  // without painting, matching the behaviour of the old synchronous effect branch.
  if (selectedDistrict !== null && renderedDistrict !== selectedDistrict) {
    setRenderedDistrict(selectedDistrict);
  }

  // Only the exit path needs a timer: hold renderedDistrict until the animation
  // finishes, then clear it so the panel unmounts.
  useEffect(() => {
    if (selectedDistrict !== null || renderedDistrict === null) return;
    const id = window.setTimeout(
      () => setRenderedDistrict(null),
      PANEL_TRANSITION_MS,
    );
    return () => window.clearTimeout(id);
  }, [selectedDistrict, renderedDistrict]);

  useEffect(() => {
    fetch("/api/air-quality")
      .then((res) => res.json())
      .then((data: LiveAqiData) => setLiveAqi(data))
      .catch(() => setLiveAqi({ status: "unavailable" }));
  }, []);

  const panelDistrict = selectedDistrict ?? renderedDistrict;
  const activeLayerExplanation = activeLayer ? layerExplanations[activeLayer] : null;
  const districtInfo = panelDistrict
    ? (districtInfoById[panelDistrict.id as keyof typeof districtInfoById] as
        | DistrictInfo
        | undefined)
    : undefined;
  const airQualityInfo = panelDistrict
    ? (airQualityById[panelDistrict.id as keyof typeof airQualityById] as
        | AirQualityInfo
        | undefined)
    : undefined;
  const greenSpaceInfo = panelDistrict
    ? (greenSpaceById[panelDistrict.id as keyof typeof greenSpaceById] as
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
  const liveDistrictLevel =
    liveDistricts && panelDistrict ? liveDistricts[panelDistrict.id] : null;

  const airQualitySummary = liveDistrictLevel
    ? `Air quality: ${liveDistrictLevel === "lower" ? "Good" : liveDistrictLevel === "medium" ? "Moderate" : "Poor"}`
    : airQualityInfo
      ? `Air quality: ${getLevelLabel(airQualityInfo.no2, airQualityThresholds, [
          "Good",
          "Moderate",
          "Poor",
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
          layerFillColors={effectiveLayerFillColors}
          onDistrictSelect={setSelectedDistrict}
          onResetLayer={handleResetLayer}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 p-6 md:p-8">
        <section
          aria-labelledby="map-shell-title"
          className="pointer-events-auto absolute left-6 top-6 flex w-[24rem] max-w-[calc(100vw-3rem)] flex-col gap-3 rounded-3xl border border-slate-700/45 bg-slate-900/88 p-4 text-white shadow-[0_12px_36px_rgba(2,6,23,0.28)] backdrop-blur-sm md:left-8 md:top-8"
        >
          <p
            id="map-shell-title"
            className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400"
          >
            CityLens
          </p>
          <p className="text-sm leading-6 text-slate-300">
            Select a layer to color districts by a specific urban signal.
          </p>

          <div className="flex flex-col gap-3">
            <LayerControls
              activeLayer={activeLayer}
              layerOptions={layerOptions}
              onLayerChange={setActiveLayer}
            />
            {activeLayerExplanation ? (
              <div>
                <div className="border-t border-white/10 pt-3">
                  <LayerExplanation
                    title={activeLayerExplanation.title}
                    legendItems={activeLayerExplanation.items}
                  />
                </div>
              </div>
            ) : null}
            {liveAqi !== null && (
              <div className="border-t border-white/10 pt-3">
                {liveAqi.status === "ok" ? (
                  <p className="text-xs text-slate-400">
                    Live AQI · {liveAqi.aqi}
                    {liveAqi.updatedAt
                      ? ` · Updated ${formatTime(liveAqi.updatedAt)}`
                      : null}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    Live data unavailable
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {renderedDistrict !== null ? (
          <div className="absolute inset-x-6 bottom-6 md:inset-x-auto md:right-8 md:top-8">
            <div
  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
    selectedDistrict
      ? "translate-y-0 opacity-100 md:translate-x-0"
      : "pointer-events-none translate-y-4 opacity-0 md:translate-x-2 md:translate-y-0"
  }`}
>
              <SidePanel
                selectedDistrict={panelDistrict}
                districtInfo={districtInfo}
                contextSummary={contextSummary}
                airQualitySummary={airQualitySummary}
                greenSpaceSummary={greenSpaceSummary}
                activeLayer={activeLayer}
                isAirQualityActive={isAirQualityActive}
                isGreenSpaceActive={isGreenSpaceActive}
              />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
