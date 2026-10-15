
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang | KasVault",
  description:
    "Informasi tentang KasVault dan tujuan pengembangan aplikasi manajemen keuangan organisasi.",
};

export default function TentangPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <Link
        href="/"
        className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
      >
        ← Kembali ke Dashboard
      </Link>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Tentang KasVault
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Pengelolaan keuangan organisasi yang lebih terstruktur
        </h1>

        <p className="mt-5 leading-7 text-slate-600">
          KasVault adalah aplikasi untuk membantu kelas dan organisasi
          mahasiswa mencatat pemasukan, pengeluaran, serta tujuan keuangan
          dalam satu tempat.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-slate-900">
          Tujuan Pengembangan
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          Aplikasi ini dikembangkan sebagai proyek pembelajaran yang
          menggabungkan pengembangan aplikasi web, kriptografi, dan keamanan
          komputasi serta siber. KasVault dirancang untuk mendukung pencatatan
          keuangan yang lebih transparan, terstruktur, dan memperhatikan aspek
          keamanan data.
        </p>
      </section>
    </main>
  );
}
