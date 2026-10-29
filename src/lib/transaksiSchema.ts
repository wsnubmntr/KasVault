
import { z } from "zod";

export const transaksiSchema = z.object({
  description: z
    .string()
    .trim()
    .min(3, "Nama transaksi minimal 3 karakter.")
    .max(100, "Nama transaksi maksimal 100 karakter."),

  amount: z
    .string()
    .trim()
    .min(1, "Jumlah transaksi wajib diisi.")
    .regex(/^\d+$/, "Jumlah harus berupa angka bulat.")
    .transform(Number)
    .pipe(
      z
        .number()
        .int("Jumlah harus berupa bilangan bulat.")
        .positive("Jumlah harus lebih dari Rp0.")
        .max(100000000, "Jumlah maksimal Rp100.000.000.")
    ),

  type: z.enum(["Pemasukan", "Pengeluaran"], {
    error: "Jenis transaksi tidak valid.",
  }),

  category: z.enum(
    ["Iuran", "Sponsor", "Operasional", "Kegiatan", "Lainnya"],
    {
      error: "Kategori transaksi tidak valid.",
    }
  ),
});

export type TransaksiInput = z.infer<typeof transaksiSchema>;
