type ActiveLayer =
  | "density"
  | "area"
  | "airQuality"
  | "greenSpace";

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
      className="inline-flex rounded-xl border border-black/10 bg-white/80 p-1"
    >
      {layerOptions.map((layer) => {
        const isActive = activeLayer === layer.value;

        return (
          <button
            key={layer.value}
            type="button"
            onClick={() => onLayerChange(layer.value)}
            className={`rounded-lg px-3 py-1.5 text-sm transition ${
              isActive ? "bg-black text-white" : "text-black/65 hover:bg-black/5"
            }`}
          >
            {layer.label}
          </button>
        );
      })}
    </div>
  );
}
