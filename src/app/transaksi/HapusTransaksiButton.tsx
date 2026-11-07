
"use client";

import { useActionState } from "react";
import { hapusTransaksiAction } from "./actions";

type HapusTransaksiButtonProps = {
  id: number;
  description: string;
};

export default function HapusTransaksiButton({
  id,
  description,
}: HapusTransaksiButtonProps) {
  const [status, formAction, pending] = useActionState(
    hapusTransaksiAction,
    {}
  );

  return (
    <div>
      <form
        action={formAction}
        onSubmit={(event) => {
          const yakin = window.confirm(
            `Apakah kamu yakin ingin menghapus transaksi "${description}"?`
          );

          if (!yakin) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={id} />

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Menghapus..." : "Hapus"}
        </button>
      </form>

      {status.pesan && (
        <p role="alert" className="mt-2 max-w-40 text-xs text-red-600">
          {status.pesan}
        </p>
      )}
    </div>
  );
}
