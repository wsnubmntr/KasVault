
export default function TransaksiLoading() {
  return (
    <main
      role="status"
      aria-label="Memuat halaman transaksi"
      className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 h-14 animate-pulse rounded-2xl bg-white shadow-sm" />

        <div className="mb-8 space-y-3">
          <div className="h-7 w-56 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded-lg bg-slate-200" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 h-6 w-40 animate-pulse rounded-lg bg-slate-200" />

          <div className="space-y-4">
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          Memuat halaman transaksi...
        </p>
      </div>
    </main>
  );
}
