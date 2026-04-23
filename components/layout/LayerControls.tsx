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
      className="inline-flex gap-1.5 w-fit rounded-full bg-black/5 p-1"
    >
      {layerOptions.map((layer) => {
        const isActive = activeLayer === layer.value;

        return (
          <button
            key={layer.value}
            type="button"
            onClick={() => onLayerChange(layer.value)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
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
