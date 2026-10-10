
"use client";

import { useState } from "react";
import AppNavigation from "../components/AppNavigation";
import PageHeader from "../components/PageHeader";
import FormField from "../components/FormField";

type Transaction = {
  id: number;
  description: string;
  category: string;
  date: string;
  amount: number;
  type: "Pemasukan" | "Pengeluaran";
};

const initialTransactions: Transaction[] = [
  {
    id: 1,
    description: "Iuran anggota Oktober",
    category: "Iuran",
    date: "10 Okt 2026",
    amount: 1500000,
    type: "Pemasukan",
  },
  {
    id: 2,
    description: "Dana sponsor kegiatan",
    category: "Sponsor",
    date: "9 Okt 2026",
    amount: 500000,
    type: "Pemasukan",
  },
  {
    id: 3,
    description: "Pembelian perlengkapan",
    category: "Operasional",
    date: "8 Okt 2026",
    amount: 250000,
    type: "Pengeluaran",
  },
  {
    id: 4,
    description: "Pembayaran uang muka tempat",
    category: "Kegiatan",
    date: "7 Okt 2026",
    amount: 300000,
    type: "Pengeluaran",
  },
];

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function TransaksiPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Iuran");
  const [amount, setAmount] = useState("");
  const [type, setType] =
    useState<"Pemasukan" | "Pengeluaran">("Pemasukan");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const numericAmount = Number(amount);

    if (!description.trim()) {
      setError("Nama transaksi wajib diisi.");
      return;
    }

    if (
      !amount.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      !Number.isSafeInteger(numericAmount)
    ) {
      setError("Jumlah transaksi harus berupa bilangan bulat lebih dari Rp0.");
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      description: description.trim(),
      category,
      date: new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date()),
      amount: numericAmount,
      type,
    };

    setTransactions((previous) => [newTransaction, ...previous]);
    setDescription("");
    setAmount("");
    setCategory("Iuran");
    setType("Pemasukan");
    setSuccess("Transaksi berhasil ditambahkan ke data simulasi.");
  }

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

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="Nama transaksi" htmlFor="description">
                <input
                  id="description"
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Contoh: Iuran anggota"
                  aria-invalid={Boolean(error && !description.trim())}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </FormField>

              <FormField label="Jumlah (Rp)" htmlFor="amount">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="Contoh: 150000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </FormField>

              <FormField label="Jenis transaksi" htmlFor="type">
                <select
                  id="type"
                  name="type"
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value as "Pemasukan" | "Pengeluaran")
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="Pemasukan">Pemasukan</option>
                  <option value="Pengeluaran">Pengeluaran</option>
                </select>
              </FormField>

              <FormField label="Kategori" htmlFor="category">
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="Iuran">Iuran anggota</option>
                  <option value="Sponsor">Sponsor</option>
                  <option value="Operasional">Operasional</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </FormField>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700"
              >
                {success}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-emerald-700 sm:w-auto"
            >
              + Simpan Transaksi
            </button>
          </form>
        </section>

        <section
          aria-labelledby="list-title"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 p-5">
            <h2 id="list-title" className="text-lg font-bold text-slate-900">
              Daftar Transaksi
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Total {transactions.length} transaksi dalam data simulasi.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">
                Daftar pemasukan dan pengeluaran organisasi
              </caption>
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-4">Nama transaksi</th>
                  <th scope="col" className="px-5 py-4">Kategori</th>
                  <th scope="col" className="px-5 py-4">Jenis</th>
                  <th scope="col" className="px-5 py-4 text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-slate-50">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-5 text-xs leading-5 text-slate-500">
          Catatan: data transaksi masih tersimpan sementara di state halaman.
          Data akan kembali ke simulasi awal saat halaman dimuat ulang.
        </p>
      </div>
    </main>
  );
}
