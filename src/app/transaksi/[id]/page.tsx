
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect, notFound } from "next/navigation";

import { prisma } from "../../../../lib/prisma";
import { bacaSesi } from "@/lib/sesi";
import AppNavigation from "../../components/AppNavigation";
import PageHeader from "../../components/PageHeader";

type TransactionDetailPageProps = {
  params: Promise<{ id: string }>;
};

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function TransactionDetailPage({
  params,
}: TransactionDetailPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 p-6">
          <div
            role="status"
            className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 text-slate-600"
          >
            Memuat detail transaksi...
          </div>
        </main>
      }
    >
      <TransactionDetailContent params={params} />
    </Suspense>
  );
}

async function TransactionDetailContent({
  params,
}: TransactionDetailPageProps) {
  // Menunggu request sebelum melakukan pemeriksaan sesi
  await connection();

  // Memastikan pengguna sudah login
  const sesi = await bacaSesi();

  if (!sesi) {
    redirect("/masuk");
  }

  const { id } = await params;

  // Memastikan ID berupa angka positif
  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  const idTransaksi = Number(id);

  if (!Number.isSafeInteger(idTransaksi)) {
    notFound();
  }

  // Mengambil detail transaksi dari PostgreSQL
  const transaction = await prisma.transaksi.findUnique({
    where: {
      id: idTransaksi,
    },
    include: {
      kas: true,
    },
  });

  if (!transaction) {
    notFound();
  }

  const isIncome = transaction.jenis === "PEMASUKAN";

  const tanggal = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(transaction.tanggal);

  const jumlah = Number(transaction.jumlah);

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <AppNavigation />

        <div className="mb-8 mt-5">
          <p className="mb-3 text-sm text-slate-500">
            KasVault / Transaksi / Detail
          </p>

          <PageHeader
            title="Detail Transaksi"
            description="Informasi lengkap transaksi keuangan organisasi."
          />
        </div>

        <section
          aria-labelledby="detail-title"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <p className="text-sm text-slate-500">
                ID Transaksi
              </p>

              <h2
                id="detail-title"
                className="mt-1 text-xl font-bold text-slate-900"
              >
                {transaction.id}
              </h2>
            </div>

            <span
              className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                isIncome
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {isIncome ? "Pemasukan" : "Pengeluaran"}
            </span>
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-slate-500">
                Nama transaksi
              </dt>

              <dd className="mt-1 font-semibold text-slate-900">
                {transaction.deskripsi}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slate-500">
                Kategori
              </dt>

              <dd className="mt-1 font-semibold text-slate-900">
                {transaction.kategori}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slate-500">
                Tanggal
              </dt>

              <dd className="mt-1 font-semibold text-slate-900">
                {tanggal}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slate-500">
                Jumlah
              </dt>

              <dd
                className={`mt-1 text-xl font-bold ${
                  isIncome
                    ? "text-emerald-700"
                    : "text-red-600"
                }`}
              >
                {isIncome ? "+" : "−"}
                {formatRupiah(jumlah)}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slate-500">
                Nomor Bukti
              </dt>

              <dd className="mt-1 font-semibold text-slate-900">
                {transaction.nomorBukti}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slate-500">
                Nama Kas
              </dt>

              <dd className="mt-1 font-semibold text-slate-900">
                {transaction.kas.nama}
              </dd>
            </div>
          </dl>

          <div className="mt-8 border-t border-slate-100 pt-5">
            <Link
              href="/transaksi"
              className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Kembali ke Transaksi
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
