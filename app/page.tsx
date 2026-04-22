import MapView from "@/components/map/MapView";

export default function Home() {
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
            <MapView />
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
              <h2
                id="panel-shell-title"
                className="text-xl font-medium tracking-tight text-black"
              >
                Selected area details will appear here.
              </h2>
              <p className="text-sm leading-6 text-black/65">
                Future metrics, comparisons, and explanations can layer into
                this panel without changing the shell.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-black/10 bg-white p-4">
                <p className="text-sm font-medium text-black">Primary metric</p>
                <p className="mt-3 text-sm text-black/45">Placeholder only</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-4">
                <p className="text-sm font-medium text-black">Context</p>
                <p className="mt-3 text-sm text-black/45">
                  Comparison and notes will sit here later.
                </p>
              </div>
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
