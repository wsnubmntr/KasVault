import type { Metadata } from "next";
import FormMasuk from "./FormMasuk";

export const metadata: Metadata = {
  title: "Masuk | KasVault",
  description: "Masuk ke dashboard keuangan KasVault.",
};

export default function HalamanMasuk() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-emerald-700">
          KasVault
        </p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          Selamat datang kembali
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Masuk untuk mengelola keuangan kelas atau organisasi.
        </p>

        <FormMasuk />

        <p className="mt-5 text-center text-xs text-slate-500">
          Akun demo untuk keperluan praktikum.
        </p>
      </section>
    </main>
  );
}
