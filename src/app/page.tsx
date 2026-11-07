
import { Suspense } from "react";
import { connection } from "next/server";

import Link from "next/link";

import StatCard from "./components/StatCard";
import GoalCard from "./components/GoalCard";
import { keluar } from "./masuk/actions";
import { prisma } from "../../lib/prisma";
import { wajibLogin } from "@/lib/akses";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <main
          role="status"
          className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600"
        >
          Memuat Dashboard KasVault...
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  // Menunggu request agar tidak dijalankan saat prerendering
  await connection();

  // Memeriksa sesi dan role pengguna
  const sesi = await wajibLogin();

  // Mengambil seluruh transaksi dari database
  const dataTransaksi = await prisma.transaksi.findMany({
    orderBy: {
      tanggal: "desc",
    },
  });

  // Menghitung total pemasukan
  const totalIncome = dataTransaksi
    .filter((item) => item.jenis === "PEMASUKAN")
    .reduce((total, item) => total + Number(item.jumlah), 0);

  // Menghitung total pengeluaran
  const totalExpense = dataTransaksi
    .filter((item) => item.jenis === "PENGELUARAN")
    .reduce((total, item) => total + Number(item.jumlah), 0);

  // Menghitung saldo berdasarkan transaksi
  const balance = totalIncome - totalExpense;

  // Mengambil maksimal 5 transaksi terbaru
  const transactions = dataTransaksi.slice(0, 5).map((transaksi) => ({
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

  // Data tujuan keuangan masih berupa simulasi
  const goals = [
    {
      name: "Liburan Akhir Semester",
      description: "Target dana untuk liburan bersama",
      target: 5000000,
      collected: 3250000,
      deadline: "20 Desember 2026",
      color: "bg-emerald-500",
    },
    {
      name: "Makrab Organisasi",
      description: "Dana kegiatan malam keakraban",
      target: 3000000,
      collected: 1200000,
      deadline: "15 Januari 2027",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-6 md:flex">
          <a href="#beranda" className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-xl font-bold text-white"
            >
              K
            </span>

            <span>
              <span className="block text-xl font-bold text-slate-900">
                KasVault
              </span>
              <span className="text-xs text-slate-600">
                Keuangan organisasi
              </span>
            </span>
          </a>

          <p className="mb-3 mt-10 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Menu utama
          </p>

          <nav aria-label="Navigasi utama" className="space-y-2">
            <a
              href="#beranda"
              aria-current="page"
              className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
            >
              <span aria-hidden="true">⌂</span>
              Dashboard
            </a>

            <Link
              href="/kas"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              <span aria-hidden="true">▤</span>
              Kas
            </Link>

            <Link
              href="/transaksi"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              <span aria-hidden="true">↔</span>
              Transaksi
            </Link>

            <Link
              href="/tujuan"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              <span aria-hidden="true">◎</span>
              Tujuan Keuangan
            </Link>

            <a
              href="#riwayat"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              <span aria-hidden="true">◷</span>
              Riwayat Aktivitas
            </a>
          </nav>

          <form action={keluar} className="mb-4 mt-auto">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <span aria-hidden="true">↪</span>
              Keluar
            </button>
          </form>

          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-900">
              Kas Terjaga,
              <br />
              Organisasi Terpercaya.
            </p>

            <p className="mt-2 text-xs leading-5 text-emerald-800">
              Kelola keuangan bersama dengan lebih transparan.
            </p>
          </div>
        </aside>

        <main
          id="beranda"
          className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8"
        >
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-600">
                Organisasi Mahasiswa
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Dashboard KasVault
              </h1>

              <p className="mt-2 text-sm text-slate-600">
                Pantau kas dan capai tujuan organisasi bersama.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700"
              >
                B
              </span>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {sesi.role === "BENDAHARA" ? "Bendahara" : "Anggota"}
                </p>
                <p className="text-xs text-slate-600">
                  {sesi.email}
                </p>
              </div>
            </div>
          </header>

          <section
            aria-labelledby="ringkasan-title"
            className="mb-8"
          >
            <div className="mb-4">
              <h2
                id="ringkasan-title"
                className="text-lg font-bold text-slate-900"
              >
                Ringkasan Keuangan
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Ringkasan berdasarkan data transaksi PostgreSQL.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Saldo Kas"
                value={formatRupiah(balance)}
                description="Selisih pemasukan dan pengeluaran"
                icon="◇"
                color="bg-emerald-100 text-emerald-700"
              />

              <StatCard
                title="Total Pemasukan"
                value={formatRupiah(totalIncome)}
                description="Dari seluruh transaksi pemasukan"
                icon="↓"
                color="bg-blue-100 text-blue-700"
              />

              <StatCard
                title="Total Pengeluaran"
                value={formatRupiah(totalExpense)}
                description="Dari seluruh transaksi pengeluaran"
                icon="↑"
                color="bg-orange-100 text-orange-700"
              />

              <StatCard
                title="Anggota Organisasi"
                value="30 orang"
                description="Contoh jumlah anggota terdaftar"
                icon="♧"
                color="bg-violet-100 text-violet-700"
              />
            </div>
          </section>

          <section
            id="tujuan"
            aria-labelledby="tujuan-title"
            className="mb-8"
          >
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2
                  id="tujuan-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Tujuan Keuangan
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Lihat progres pengumpulan dana untuk kegiatan bersama.
                </p>
              </div>

              <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                2 tujuan aktif
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {goals.map((goal) => (
                <GoalCard key={goal.name} {...goal} />
              ))}
            </div>
          </section>

          <section
            id="transaksi"
            aria-labelledby="transaksi-title"
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
              <div>
                <h2
                  id="transaksi-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Transaksi Terbaru
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Catatan pemasukan dan pengeluaran organisasi.
                </p>
              </div>

              <Link
                href="/transaksi"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Lihat transaksi
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <caption className="sr-only">
                  Daftar transaksi keuangan terbaru
                </caption>

                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Transaksi
                    </th>

                    <th scope="col" className="px-5 py-4 font-semibold">
                      Kategori
                    </th>

                    <th scope="col" className="px-5 py-4 font-semibold">
                      Tanggal
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-4 text-right font-semibold"
                    >
                      Jumlah
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
                        </th>

                        <td className="px-5 py-4 text-slate-600">
                          {transaction.category}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                          {transaction.date}
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-8 text-center text-slate-500"
                      >
                        Belum ada transaksi yang tercatat.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div
              id="riwayat"
              className="border-t border-slate-100 bg-slate-50 px-5 py-4"
            >
              <p className="text-xs leading-5 text-slate-600">
                <span className="font-semibold text-slate-700">
                  Transparansi kas:
                </span>{" "}
                Riwayat aktivitas dan verifikasi perubahan transaksi
                akan dikembangkan pada tahap berikutnya. Data transaksi
                pada Dashboard diambil langsung dari database PostgreSQL.
              </p>
            </div>
          </section>

          <footer className="py-8 text-center text-xs text-slate-600">
            KasVault © 2026 · Kas Terjaga, Organisasi Terpercaya.
          </footer>
        </main>
      </div>
    </div>
  );
}
