
"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "../components/FormField";
import { ubahKasAction } from "./actions";

type EditKasFormProps = {
  id: number;
  nama: string;
  periode: string;
  saldoAwal: string;
};

export default function EditKasForm({
  id,
  nama,
  periode,
  saldoAwal,
}: EditKasFormProps) {
  const [terbuka, setTerbuka] = useState(false);
  const router = useRouter();

  const [status, formAction, pending] = useActionState(
    ubahKasAction,
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
        className="rounded-lg border border-emerald-700 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
      >
        Edit
      </button>
    );
  }

  const nilai = status.nilai;

  return (
    <section className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
      <h3 className="mb-4 font-bold text-slate-900">
        Edit Data Kas
      </h3>

      <form action={formAction} className="space-y-4" noValidate>
        <input type="hidden" name="id" value={id} />

        <FormField label="Nama Kas" htmlFor={`nama-${id}`}>
          <>
            <input
              id={`nama-${id}`}
              name="nama"
              defaultValue={nilai?.nama ?? nama}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600"
            />
            {status.galat?.nama && (
              <p className="mt-1 text-sm text-red-600">
                {status.galat.nama[0]}
              </p>
            )}
          </>
        </FormField>

        <FormField label="Periode" htmlFor={`periode-${id}`}>
          <>
            <input
              id={`periode-${id}`}
              name="periode"
              defaultValue={nilai?.periode ?? periode}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600"
            />
            {status.galat?.periode && (
              <p className="mt-1 text-sm text-red-600">
                {status.galat.periode[0]}
              </p>
            )}
          </>
        </FormField>

        <FormField label="Saldo Awal (Rp)" htmlFor={`saldo-${id}`}>
          <>
            <input
              id={`saldo-${id}`}
              name="saldoAwal"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              defaultValue={nilai?.saldoAwal ?? saldoAwal}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600"
            />
            {status.galat?.saldoAwal && (
              <p className="mt-1 text-sm text-red-600">
                {status.galat.saldoAwal[0]}
              </p>
            )}
          </>
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
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
          >
            {pending ? "Menyimpan..." : "Simpan Perubahan"}
          </button>

          <button
            type="button"
            onClick={tutupForm}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Batal
          </button>
        </div>
      </form>
    </section>
  );
}
