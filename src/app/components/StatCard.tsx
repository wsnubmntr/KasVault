
type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: string;
  color: string;
};

export default function StatCard({
  title,
  value,
  description,
  icon,
  color,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {value}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${color}`}
        >
          {icon}
        </span>
      </div>

      <p className="mt-3 text-xs text-slate-600">{description}</p>
    </article>
  );
}
