
import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";

import AppNavigation from "../components/AppNavigation";
import PageHeader from "../components/PageHeader";
import TransaksiForm from "./TransaksiForm";
import EditTransaksiForm from "./EditTransaksiForm";
import HapusTransaksiButton from "./HapusTransaksiButton";
import { prisma } from "../../../lib/prisma";
import { bacaSesi } from "@/lib/sesi";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function TransaksiPage() {
  await connection();

  const sesi = await bacaSesi();

  if (!sesi) {
    redirect("/masuk");
  }

  const dataTransaksi = await prisma.transaksi.findMany({
    orderBy: {
      tanggal: "desc",
    },
  });

  const transactions = dataTransaksi.map((transaksi) => ({
    id: transaksi.id,
    description: transaksi.deskripsi,
    category: transaksi.kategori,
    date: new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(transaksi.tanggal),
    amount: Number(transaksi.jumlah),
    type:
      transaksi.jenis === "PEMASUKAN"
        ? "Pemasukan"
        : "Pengeluaran",
  }));

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <AppNavigation />

        <div className="mb-8 mt-5">
          <p className="mb-3 text-sm text-slate-500">
            KasVault / Keuangan
          </p>

          <PageHeader
            title="Transaksi"
            description="Catat dan pantau pemasukan serta pengeluaran organisasi."
          />
        </div>

        <TransaksiForm />

        <section
          aria-labelledby="list-title"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 p-5">
            <h2
              id="list-title"
              className="text-lg font-bold text-slate-900"
            >
              Daftar Transaksi
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Total {transactions.length} transaksi tersimpan.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <caption className="sr-only">
                Daftar pemasukan dan pengeluaran organisasi
              </caption>

              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-4">
                    Nama transaksi
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Kategori
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Jenis
                  </th>
                  <th scope="col" className="px-5 py-4 text-right">
                    Jumlah
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-slate-50"
                    >
                      <th
                        scope="row"
                        className="px-5 py-4 font-medium text-slate-800"
                      >
                        {transaction.description}
                        <span className="mt-1 block text-xs font-normal text-slate-500">
                          {transaction.date}
                        </span>
                      </th>

                      <td className="px-5 py-4 text-slate-500">
                        {transaction.category}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            transaction.type === "Pemasukan"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>

                      <td
                        className={`whitespace-nowrap px-5 py-4 text-right font-semibold ${
                          transaction.type === "Pemasukan"
                            ? "text-emerald-700"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "Pemasukan" ? "+" : "−"}
                        {formatRupiah(transaction.amount)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/transaksi/${transaction.id}`}
                            className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                          >
                            Detail
                          </Link>

                          <EditTransaksiForm
                            id={transaction.id}
                            description={transaction.description}
                            amount={String(transaction.amount)}
                            type={transaction.type}
                            category={transaction.category}
                          />

                          <HapusTransaksiButton
                            id={transaction.id}
                            description={transaction.description}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      Belum ada transaksi yang tercatat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-5 text-xs leading-5 text-slate-500">
          Catatan: seluruh transaksi disimpan secara permanen di database
          PostgreSQL.
        </p>
      </div>
    </main>
  );
}
