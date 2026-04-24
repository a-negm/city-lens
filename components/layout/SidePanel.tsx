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
  isAirQualityActive: boolean;
  isGreenSpaceActive: boolean;
};

export default function SidePanel({
  selectedDistrict,
  districtInfo,
  contextSummary,
  airQualitySummary,
  greenSpaceSummary,
  isAirQualityActive,
  isGreenSpaceActive,
}: SidePanelProps) {
  return (
    <aside
      aria-labelledby="panel-shell-title"
      className="pointer-events-auto w-full md:w-[24rem]"
    >
      <div className="rounded-3xl border border-black/10 bg-white/96 p-6 shadow-sm backdrop-blur-sm md:p-8">
        <div className="space-y-6">
          <div className="space-y-4">
            {selectedDistrict ? (
              <>
                {districtInfo ? (
                  <div className="space-y-4">
                    <h2
                      id="panel-shell-title"
                      className="text-sm font-medium text-black"
                    >
                      {districtInfo.name}
                    </h2>
                    {airQualitySummary ? (
                      <div
                        className={`space-y-1 border-t pt-4 text-sm text-black/70 ${
                          isAirQualityActive ? "border-black/15" : "border-black/10"
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
                    {greenSpaceSummary ? (
                      <div
                        className={`space-y-1 border-t pt-4 text-sm text-black/70 ${
                          isGreenSpaceActive ? "border-black/15" : "border-black/10"
                        }`}
                      >
                        <p
                          className={`text-black ${
                            isGreenSpaceActive ? "font-semibold" : "font-medium"
                          }`}
                        >
                          Green space
                        </p>
                        <p>{greenSpaceSummary}</p>
                      </div>
                    ) : null}
                    <div
                      className={`space-y-1 border-t pt-4 text-sm text-black/70 ${
                        isAirQualityActive ? "border-black/15" : "border-black/10"
                      }`}
                    >
                      <p
                        className={`text-black ${
                          isAirQualityActive ? "font-medium" : "font-semibold"
                        }`}
                      >
                        Context summary
                      </p>
                      {contextSummary?.map((label) => <p key={label}>{label}</p>)}
                    </div>
                    <dl className="space-y-2 border-t border-black/10 pt-4 text-sm text-black/70">
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
                  <div className="space-y-2">
                    <h2
                      id="panel-shell-title"
                      className="text-sm font-medium text-black"
                    >
                      {selectedDistrict.name}
                    </h2>
                    <p className="text-sm leading-6 text-black/65">
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
