
"use client";

import { useEffect } from "react";

export default function TransaksiError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Terjadi error pada halaman transaksi:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section
        role="alert"
        className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
          !
        </div>

        <h1 className="text-xl font-bold text-slate-900">
          Terjadi Kesalahan
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Maaf, halaman transaksi mengalami kendala. Silakan coba muat ulang
          bagian halaman ini.
        </p>

        {error.digest && (
          <p className="mt-3 text-xs text-slate-400">
            Kode error: {error.digest}
          </p>
        )}

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          Coba Lagi
        </button>
      </section>
    </main>
  );
}
