import "server-only";

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