type LayerExplanationProps = {
  title: string;
  legendItems: { color: string; label: string }[] | null;
};

export default function LayerExplanation({
  title,
  legendItems,
}: LayerExplanationProps) {
  if (!legendItems) {
    return null;
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {title}
      </p>
      <div className="mt-2 space-y-2">
        {legendItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 text-sm text-slate-300"
          >
            <span
              aria-hidden="true"
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
