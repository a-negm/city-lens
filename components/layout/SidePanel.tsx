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

type SidePanelProps = {
  selectedDistrict: SelectedDistrict;
  districtInfo?: DistrictInfo;
  contextSummary: string[] | null;
  airQualitySummary: string | null;
  greenSpaceSummary: string | null;
  areaSummary: string | null;
  activeLayer: "density" | "area" | "airQuality" | "greenSpace" | null;
  isAirQualityActive: boolean;
  isGreenSpaceActive: boolean;
};

export default function SidePanel({
  selectedDistrict,
  districtInfo,
  contextSummary,
  airQualitySummary,
  greenSpaceSummary,
  areaSummary,
  activeLayer,
  isAirQualityActive,
  isGreenSpaceActive,
}: SidePanelProps) {
  const airQualityValue = airQualitySummary?.replace(/^Air quality:\s*/, "") ?? "Not available";
  const greenSpaceValue =
    greenSpaceSummary?.replace(/^Green space:\s*/, "") ?? "Not available";
  const areaValue = areaSummary?.replace(/^Area size:\s*/, "") ?? "Not available";
  const densityValue =
    contextSummary?.find((label) => label.startsWith("Density:"))?.replace(
      /^Density:\s*/,
      "",
    ) ?? "Not available";
  const airQualityScore =
    airQualityValue === "Lower NO2"
      ? 0
      : airQualityValue === "Medium NO2"
        ? 1
        : airQualityValue === "Higher NO2"
          ? 2
          : null;
  const greenSpaceScore =
    greenSpaceValue === "Higher"
      ? 0
      : greenSpaceValue === "Medium"
        ? 1
        : greenSpaceValue === "Lower"
          ? 2
          : null;
  const densityScore =
    densityValue === "Low"
      ? 0
      : densityValue === "Medium"
        ? 1
        : densityValue === "High"
          ? 2
          : null;
  const urbanPressureScore =
    airQualityScore !== null &&
    greenSpaceScore !== null &&
    densityScore !== null
      ? airQualityScore + greenSpaceScore + densityScore
      : null;
  const urbanPressureValue =
    urbanPressureScore === null
      ? null
      : urbanPressureScore <= 2
        ? "Lower pressure"
        : urbanPressureScore <= 4
          ? "Balanced conditions"
          : "Higher pressure";
  const insightText =
    activeLayer === "airQuality"
      ? airQualityValue === "Lower NO2"
        ? "Lower NO2 levels suggest less traffic-related air quality pressure here."
        : airQualityValue === "Medium NO2"
          ? "NO2 levels sit in a middle range compared with other districts."
          : airQualityValue === "Higher NO2"
            ? "Higher NO2 levels suggest stronger traffic-related air quality pressure in this district."
            : null
      : activeLayer === "greenSpace"
        ? greenSpaceValue === "Higher"
          ? "Higher green space availability suggests more environmental relief in this district."
          : greenSpaceValue === "Medium"
            ? "Green space availability sits in a middle range compared with other districts."
            : greenSpaceValue === "Lower"
              ? "Lower green space availability means less environmental relief compared with greener districts."
              : null
        : activeLayer === "density"
          ? densityValue === "Low"
            ? "Lower density suggests a less intense urban pattern."
            : densityValue === "Medium"
              ? "Density sits in a middle range compared with other districts."
              : densityValue === "High"
                ? "Higher density can indicate stronger urban intensity and less spatial relief."
                : null
          : activeLayer === "area"
            ? areaValue === "Compact"
              ? "This district is more compact in size."
              : areaValue === "Medium"
                ? "This district sits in a mid-range size band."
                : areaValue === "Expansive"
                  ? "This district covers a larger area."
                  : null
            : null;

  return (
    <aside
      aria-labelledby="panel-shell-title"
      className="pointer-events-auto w-full md:w-[24rem]"
    >
      <div className="rounded-3xl border border-transparent bg-transparent p-0 shadow-none md:p-0">
        <div className="space-y-6">
          <div className="space-y-4">
            {selectedDistrict ? (
              <>
                {districtInfo ? (
                  <div className="space-y-5 rounded-3xl border border-slate-700/45 bg-slate-900/92 p-5 text-white shadow-[0_12px_36px_rgba(2,6,23,0.28)] backdrop-blur-sm">
                    <h2
                      id="panel-shell-title"
                      className="text-lg font-medium tracking-tight text-white"
                    >
                      {districtInfo.name}
                    </h2>
                    {urbanPressureValue ? (
                      <div className="space-y-1 border-t border-white/10 pt-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          Urban pressure
                        </p>
                        <p className="text-base font-medium text-white">
                          {urbanPressureValue}
                        </p>
                      </div>
                    ) : null}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        insightText
                          ? "max-h-24 translate-y-0 opacity-100"
                          : "max-h-0 translate-y-1 opacity-0"
                      }`}
                    >
                      {insightText ? (
                        <p className="text-sm leading-6 text-slate-200">
                          {insightText}
                        </p>
                      ) : null}
                    </div>
                    <div
                      className={`flex items-center justify-between gap-4 border-t pt-4 text-sm ${
                        isAirQualityActive
                          ? "border-white/20 text-white"
                          : "border-white/10 text-slate-300"
                      }`}
                    >
                      <p
                        className={`${
                          isAirQualityActive ? "font-semibold text-white" : "font-medium"
                        }`}
                      >
                        Air quality
                      </p>
                      <p>{airQualityValue}</p>
                    </div>
                    <div
                      className={`flex items-center justify-between gap-4 border-t pt-4 text-sm ${
                        isGreenSpaceActive
                          ? "border-white/20 text-white"
                          : "border-white/10 text-slate-300"
                      }`}
                    >
                      <p
                        className={`${
                          isGreenSpaceActive ? "font-semibold text-white" : "font-medium"
                        }`}
                      >
                        Green space
                      </p>
                      <p>{greenSpaceValue}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-sm text-slate-300">
                      <p className="font-medium">Population density</p>
                      <p>{densityValue}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 rounded-3xl border border-slate-700/45 bg-slate-900/92 p-5 text-white shadow-[0_12px_36px_rgba(2,6,23,0.28)] backdrop-blur-sm">
                    <h2
                      id="panel-shell-title"
                      className="text-lg font-medium tracking-tight text-white"
                    >
                      {selectedDistrict.name}
                    </h2>
                    <p className="text-sm leading-6 text-slate-300">
                      District info is not available yet.
                    </p>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
