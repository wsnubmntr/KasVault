
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-3xl font-bold text-emerald-700">
          404
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-emerald-700">
          KasVault
        </p>

        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          Halaman Tidak Ditemukan
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Maaf, halaman yang kamu cari tidak tersedia atau mungkin sudah
          dipindahkan. Periksa kembali alamat yang kamu masukkan.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          Kembali ke Dashboard
        </Link>
      </section>
    </main>
  );
}
