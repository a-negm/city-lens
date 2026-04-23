type LayerExplanationProps = {
  title: string;
  description: string;
};

export default function LayerExplanation({
  title,
  description,
}: LayerExplanationProps) {
  return (
    <div className="max-w-md rounded-xl border border-black/10 bg-white/70 px-3 py-2">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50">
        {title}
      </p>
      <p className="mt-1 text-sm leading-6 text-black/70">{description}</p>
    </div>
  );
}
