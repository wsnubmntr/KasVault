
"use client";

import { useActionState } from "react";
import FormField from "../components/FormField";
import { tambahTransaksiAction } from "./actions";

export default function TransaksiForm() {
  const [status, formAction, pending] = useActionState(
    tambahTransaksiAction,
    {}
  );

  const galat = status.galat;

  return (
    <section
      aria-labelledby="form-title"
      className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 id="form-title" className="text-lg font-bold text-slate-900">
        Tambah Transaksi
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Isi informasi transaksi di bawah ini.
      </p>

      <form action={formAction} noValidate className="mt-6 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Nama transaksi" htmlFor="description">
            <>
              <input
                id="description"
                name="description"
                defaultValue={status.nilai?.description ?? ""}
                placeholder="Contoh: Iuran anggota"
                aria-invalid={Boolean(galat?.description)}
                aria-describedby={
                  galat?.description ? "description-error" : undefined
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
              {galat?.description && (
                <p id="description-error" className="mt-1 text-sm text-red-600">
                  {galat.description[0]}
                </p>
              )}
            </>
          </FormField>

          <FormField label="Jumlah (Rp)" htmlFor="amount">
            <>
              <input
                id="amount"
                name="amount"
                type="number"
                min="1"
                step="1"
                defaultValue={status.nilai?.amount ?? ""}
                placeholder="Contoh: 150000"
                aria-invalid={Boolean(galat?.amount)}
                aria-describedby={galat?.amount ? "amount-error" : undefined}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
              {galat?.amount && (
                <p id="amount-error" className="mt-1 text-sm text-red-600">
                  {galat.amount[0]}
                </p>
              )}
            </>
          </FormField>

          <FormField label="Jenis transaksi" htmlFor="type">
            <>
              <select
                id="type"
                name="type"
                defaultValue={status.nilai?.type ?? "Pemasukan"}
                aria-invalid={Boolean(galat?.type)}
                aria-describedby={galat?.type ? "type-error" : undefined}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:border-emerald-600 focus:outline-none"
              >
                <option value="Pemasukan">Pemasukan</option>
                <option value="Pengeluaran">Pengeluaran</option>
              </select>
              {galat?.type && (
                <p id="type-error" className="mt-1 text-sm text-red-600">
                  {galat.type[0]}
                </p>
              )}
            </>
          </FormField>

          <FormField label="Kategori" htmlFor="category">
            <>
              <select
                id="category"
                name="category"
                defaultValue={status.nilai?.category ?? "Iuran"}
                aria-invalid={Boolean(galat?.category)}
                aria-describedby={
                  galat?.category ? "category-error" : undefined
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:border-emerald-600 focus:outline-none"
              >
                <option value="Iuran">Iuran anggota</option>
                <option value="Sponsor">Sponsor</option>
                <option value="Operasional">Operasional</option>
                <option value="Kegiatan">Kegiatan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              {galat?.category && (
                <p id="category-error" className="mt-1 text-sm text-red-600">
                  {galat.category[0]}
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
          className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Menyimpan..." : "+ Simpan Transaksi"}
        </button>
      </form>
    </section>
  );
}
