
"use client";

import { useActionState } from "react";
import FormField from "../components/FormField";
import { tambahKasAction } from "./actions";

export default function KasForm() {
  const [status, formAction, pending] = useActionState(
    tambahKasAction,
    {}
  );

  const galat = status.galat;

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-slate-900">
        Tambah Kas
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Masukkan informasi kas yang akan dikelola.
      </p>

      <form action={formAction} noValidate className="mt-6 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Nama Kas" htmlFor="nama">
            <>
              <input
                id="nama"
                name="nama"
                type="text"
                autoComplete="off"
                defaultValue={status.nilai?.nama ?? ""}
                placeholder="Contoh: Kas Kelas Ilmu Komputer"
                aria-invalid={Boolean(galat?.nama)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />

              {galat?.nama && (
                <p className="mt-1 text-sm text-red-600">
                  {galat.nama[0]}
                </p>
              )}
            </>
          </FormField>

          <FormField label="Periode" htmlFor="periode">
            <>
              <input
                id="periode"
                name="periode"
                type="text"
                autoComplete="off"
                defaultValue={status.nilai?.periode ?? ""}
                placeholder="Contoh: 2026/2027"
                aria-invalid={Boolean(galat?.periode)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />

              {galat?.periode && (
                <p className="mt-1 text-sm text-red-600">
                  {galat.periode[0]}
                </p>
              )}
            </>
          </FormField>

          <FormField label="Saldo Awal (Rp)" htmlFor="saldoAwal">
            <>
              <input
                id="saldoAwal"
                name="saldoAwal"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                defaultValue={status.nilai?.saldoAwal ?? ""}
                placeholder="Contoh: 500000"
                aria-invalid={Boolean(galat?.saldoAwal)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />

              {galat?.saldoAwal && (
                <p className="mt-1 text-sm text-red-600">
                  {galat.saldoAwal[0]}
                </p>
              )}
            </>
          </FormField>
        </div>

        {status.pesan && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {status.pesan}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Menyimpan..." : "+ Simpan Kas"}
        </button>
      </form>
    </section>
  );
}
