type LayerExplanationProps = {
  title: string;
  description: string;
};

export default function LayerExplanation({
  title,
  description,
}: LayerExplanationProps) {
  return (
    <div className="min-h-[4.75rem]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {title}
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}
