
"use client";

import { useActionState } from "react";
import { hapusKasAction } from "./actions";

type HapusKasButtonProps = {
  id: number;
  nama: string;
};

export default function HapusKasButton({
  id,
  nama,
}: HapusKasButtonProps) {
  const [status, formAction, pending] = useActionState(
    hapusKasAction,
    {}
  );

  return (
    <div>
      <form
        action={formAction}
        onSubmit={(event) => {
          const yakin = window.confirm(
            `Apakah kamu yakin ingin menghapus kas "${nama}"?`
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
        <p className="mt-2 max-w-40 text-xs text-red-600">
          {status.pesan}
        </p>
      )}
    </div>
  );
}
