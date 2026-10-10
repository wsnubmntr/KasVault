
type GoalCardProps = {
  name: string;
  description: string;
  target: number;
  collected: number;
  deadline: string;
  color: string;
};

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function GoalCard({
  name,
  description,
  target,
  collected,
  deadline,
  color,
}: GoalCardProps) {
  const percentage =
    target > 0
      ? Math.min(Math.round((collected / target) * 100), 100)
      : 0;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900">{name}</h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>

        <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {percentage}%
        </span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-slate-600">Dana terkumpul</p>
          <p className="mt-1 text-lg font-bold text-slate-900">
            {formatRupiah(collected)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-600">Target dana</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {formatRupiah(target)}
          </p>
        </div>
      </div>

      <div
        className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label={`Progres dana ${name}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs">
        <span className="text-slate-600">
          Kurang {formatRupiah(Math.max(target - collected, 0))}
        </span>
        <span className="text-slate-600">Batas: {deadline}</span>
      </div>
    </article>
  );
}
