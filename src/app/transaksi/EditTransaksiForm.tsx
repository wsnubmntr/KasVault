
"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "../components/FormField";
import { ubahTransaksiAction } from "./actions";

type EditTransaksiFormProps = {
  id: number;
  description: string;
  amount: string;
  type: string;
  category: string;
};

export default function EditTransaksiForm({
  id,
  description,
  amount,
  type,
  category,
}: EditTransaksiFormProps) {
  const [terbuka, setTerbuka] = useState(false);
  const router = useRouter();

  const [status, formAction, pending] = useActionState(
    ubahTransaksiAction,
    {}
  );

  function tutupForm() {
    setTerbuka(false);
    router.refresh();
  }

  if (!terbuka) {
    return (
      <button
        type="button"
        onClick={() => setTerbuka(true)}
        className="rounded-lg border border-emerald-600 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
      >
        Edit
      </button>
    );
  }

  const nilai = status.nilai;
  const galat = status.galat;

  return (
    <section className="min-w-[280px] rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="mb-4 font-bold text-slate-900">
        Edit Transaksi
      </h3>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={id} />

        <FormField label="Nama transaksi" htmlFor={`description-${id}`}>
          <>
            <input
              id={`description-${id}`}
              name="description"
              defaultValue={nilai?.description ?? description}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
            {galat?.description && (
              <p className="mt-1 text-sm text-red-600">
                {galat.description[0]}
              </p>
            )}
          </>
        </FormField>

        <FormField label="Jumlah (Rp)" htmlFor={`amount-${id}`}>
          <>
            <input
              id={`amount-${id}`}
              name="amount"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              defaultValue={nilai?.amount ?? amount}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
            {galat?.amount && (
              <p className="mt-1 text-sm text-red-600">
                {galat.amount[0]}
              </p>
            )}
          </>
        </FormField>

        <FormField label="Jenis transaksi" htmlFor={`type-${id}`}>
          <select
            id={`type-${id}`}
            name="type"
            defaultValue={nilai?.type ?? type}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
          >
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
          </select>
        </FormField>

        <FormField label="Kategori" htmlFor={`category-${id}`}>
          <select
            id={`category-${id}`}
            name="category"
            defaultValue={nilai?.category ?? category}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
          >
            <option value="Iuran">Iuran anggota</option>
            <option value="Sponsor">Sponsor</option>
            <option value="Operasional">Operasional</option>
            <option value="Kegiatan">Kegiatan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </FormField>

        {status.pesan && (
          <p role="alert" className="text-sm text-red-600">
            {status.pesan}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {pending ? "Menyimpan..." : "Simpan"}
          </button>

          <button
            type="button"
            onClick={tutupForm}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600"
          >
            Batal
          </button>
        </div>
      </form>
    </section>
  );
}
