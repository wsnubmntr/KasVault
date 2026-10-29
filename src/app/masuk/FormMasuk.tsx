"use client";

import { useActionState, useState } from "react";
import { masuk } from "./actions";
import type { StatusForm } from "@/lib/status-form";

const statusAwal: StatusForm = {};

export default function FormMasuk() {
  const [status, aksi, pending] = useActionState(masuk, statusAwal);
  const [lihatSandi, setLihatSandi] = useState(false);
  const galat = status.galat;

  return (
    <form action={aksi} noValidate className="mt-6 space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          aria-invalid={Boolean(galat?.email)}
          aria-describedby={galat?.email ? "email-error" : undefined}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-black placeholder:text-slate-400 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          placeholder="pengelola@contoh.ac.id"
        />

        {galat?.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {galat.email[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="kataSandi"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Kata sandi
        </label>

        <div className="relative">
          <input
            id="kataSandi"
            name="kataSandi"
            type={lihatSandi ? "text" : "password"}
            autoComplete="current-password"
            required
            aria-invalid={Boolean(galat?.kataSandi)}
            aria-describedby={
              galat?.kataSandi ? "kata-sandi-error" : undefined
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 text-black placeholder:text-slate-400 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            placeholder="Masukkan kata sandi"
          />

          <button
            type="button"
            onClick={() => setLihatSandi((sebelumnya) => !sebelumnya)}
            aria-label={
              lihatSandi ? "Sembunyikan kata sandi" : "Lihat kata sandi"
            }
            aria-pressed={lihatSandi}
            className="absolute inset-y-0 right-0 flex items-center justify-center rounded-r-xl px-3 text-slate-500 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            {lihatSandi ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M9.9 5.2A11 11 0 0 1 12 5c5 0 8.3 4.5 9 7-.3.7-1.2 2-2.7 3.2" />
                <path d="M6.2 6.2C3.9 7.7 2.5 10 2 12c.7 1.5 4 7 10 7 1.1 0 2.1-.2 3-.5" />
              </svg>
            )}
          </button>
        </div>

        {galat?.kataSandi && (
          <p id="kata-sandi-error" className="mt-1 text-sm text-red-600">
            {galat.kataSandi[0]}
          </p>
        )}
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
        className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Memeriksa..." : "Masuk ke KasVault"}
      </button>
    </form>
  );
}
