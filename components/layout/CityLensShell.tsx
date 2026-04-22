"use client";

import { useState } from "react";

import MapView from "@/components/map/MapView";
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

const districtInfoList = Object.values(districtInfoById) as DistrictInfo[];

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

export default function CityLensShell() {
  const [selectedDistrict, setSelectedDistrict] =
    useState<SelectedDistrict>(null);
  const districtInfo = selectedDistrict
    ? (districtInfoById[selectedDistrict.id as keyof typeof districtInfoById] as
        | DistrictInfo
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

          <div className="mt-8 flex flex-1 overflow-hidden rounded-2xl border border-black/15 bg-white/55">
            <MapView onDistrictSelect={setSelectedDistrict} />
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
                      <div className="space-y-1 text-sm text-black/70">
                        <p className="font-medium text-black">
                          Context summary
                        </p>
                        {contextSummary?.map((label) => (
                          <p key={label}>{label}</p>
                        ))}
                      </div>
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
