import { Suspense } from "react";
import { connection } from "next/server";

import { prisma } from "../../../lib/prisma";
import { wajibLogin } from "@/lib/akses";

import AppNavigation from "../components/AppNavigation";
import PageHeader from "../components/PageHeader";
import KasForm from "./KasForm";
import EditKasForm from "./EditKasForm";
import HapusKasButton from "./HapusKasButton";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function KasPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 p-8">
          <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 text-slate-500">
            Memuat halaman kas...
          </div>
        </main>
      }
    >
      <KasPageContent />
    </Suspense>
  );
}

async function KasPageContent() {
  await connection();

  const sesi = await wajibLogin();
  const isBendahara = sesi.role === "BENDAHARA";

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <AppNavigation role={sesi.role} />

        <div className="mb-8 mt-5">
          <p className="mb-3 text-sm text-slate-500">
            KasVault / Kas
          </p>

          <PageHeader
            title="Pengelolaan Kas"
            description="Kelola data kas dan pantau jumlah transaksi setiap kas."
          />

          <p className="mt-2 text-sm text-slate-500">
            Login sebagai: <span className="font-semibold">{sesi.role}</span>
          </p>
        </div>

        {isBendahara && <KasForm />}

        {!isBendahara && (
          <p className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            Anda masuk sebagai Anggota. Akses Anda hanya untuk melihat data kas.
          </p>
        )}

        <Suspense
          fallback={
            <div
              role="status"
              className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500"
            >
              Memuat data kas...
            </div>
          }
        >
          <DaftarKas isBendahara={isBendahara} />
        </Suspense>
      </div>
    </main>
  );
}

async function DaftarKas({
  isBendahara,
}: {
  isBendahara: boolean;
}) {
  const dataKas = await prisma.kas.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      _count: {
        select: {
          transaksi: true,
        },
      },
    },
  });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Daftar Kas
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Total {dataKas.length} kas terdaftar.
        </p>
      </div>

      {dataKas.length === 0 ? (
        <p className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
          Belum ada data kas.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-4 py-3 font-semibold">Nama Kas</th>
                <th className="px-4 py-3 font-semibold">Periode</th>
                <th className="px-4 py-3 font-semibold">Saldo Awal</th>
                <th className="px-4 py-3 font-semibold">Jumlah Transaksi</th>
                {isBendahara && (
                  <th className="px-4 py-3 font-semibold">Aksi</th>
                )}
              </tr>
            </thead>

            <tbody>
              {dataKas.map((kas) => (
                <tr
                  key={kas.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    {kas.nama}
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    {kas.periode}
                  </td>

                  <td className="px-4 py-4 font-semibold text-emerald-700">
                    {formatRupiah(Number(kas.saldoAwal))}
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    {kas._count.transaksi} transaksi
                  </td>

                  {isBendahara && (
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap items-start gap-2">
                        <EditKasForm
                          id={kas.id}
                          nama={kas.nama}
                          periode={kas.periode}
                          saldoAwal={String(kas.saldoAwal)}
                        />

                        <HapusKasButton
                          id={kas.id}
                          nama={kas.nama}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
