type ActiveLayer =
  | "density"
  | "airQuality"
  | "greenSpace"
  | "heatStress";

type LayerOption = {
  value: ActiveLayer;
  label: string;
};

type LayerControlsProps = {
  activeLayer: ActiveLayer | null;
  layerOptions: LayerOption[];
  onLayerChange: (layer: ActiveLayer) => void;
};

export default function LayerControls({
  activeLayer,
  layerOptions,
  onLayerChange,
}: LayerControlsProps) {
  return (
    <div
      role="group"
      aria-label="Map layer controls"
      className="inline-flex w-fit gap-1.5 rounded-full bg-slate-800/90 p-1 ring-1 ring-inset ring-white/10"
    >
      {layerOptions.map((layer) => {
        const isActive = activeLayer === layer.value;

        return (
          <button
            key={layer.value}
            type="button"
            onClick={() => onLayerChange(layer.value)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
              isActive
                ? "bg-white text-slate-950"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            {layer.label}
          </button>
        );
      })}
    </div>
  );
}
