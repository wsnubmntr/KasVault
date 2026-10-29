
import "server-only";

import type { MasukanTransaksi } from "@/lib/skema";

export type Transaction = {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
  type: "Pemasukan" | "Pengeluaran";
};

export const transactions: Transaction[] = [
  {
    id: "TRX001",
    description: "Iuran anggota Oktober",
    category: "Iuran",
    date: "10 Okt 2026",
    amount: 1500000,
    type: "Pemasukan",
  },
  {
    id: "TRX002",
    description: "Dana sponsor kegiatan",
    category: "Sponsor",
    date: "9 Okt 2026",
    amount: 500000,
    type: "Pemasukan",
  },
  {
    id: "TRX003",
    description: "Pembelian perlengkapan",
    category: "Operasional",
    date: "8 Okt 2026",
    amount: 250000,
    type: "Pengeluaran",
  },
  {
    id: "TRX004",
    description: "Pembayaran uang muka tempat",
    category: "Kegiatan",
    date: "7 Okt 2026",
    amount: 300000,
    type: "Pengeluaran",
  },
];

export function getTransactionById(id: string) {
  return transactions.find((transaction) => transaction.id === id);
}

export function judulSudahAda(description: string) {
  const dicari = description.trim().toLowerCase();

  return transactions.some(
    (transaction) =>
      transaction.description.trim().toLowerCase() === dicari
  );
}

export function tambahTransaksi(
  masukan: MasukanTransaksi
): Transaction {
  const idBerikutnya =
    Math.max(
      0,
      ...transactions.map((transaction) =>
        Number(transaction.id.replace("TRX", ""))
      )
    ) + 1;

  const transaksiBaru: Transaction = {
    id: `TRX${String(idBerikutnya).padStart(3, "0")}`,
    description: masukan.description,
    category: masukan.category,
    date: new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date()),
    amount: masukan.amount,
    type: masukan.type,
  };

  transactions.unshift(transaksiBaru);

  return transaksiBaru;
}
