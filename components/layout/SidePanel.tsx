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
                      isAirQualityActive ? "border-black/10" : "border-black/15"
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
                  {airQualitySummary ? (
                    <div
                      className={`space-y-1 rounded-xl border p-3 text-sm text-black/70 ${
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
                      className={`space-y-1 rounded-xl border p-3 text-sm text-black/70 ${
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
  );
}
