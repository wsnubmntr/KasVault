
import { z } from "zod";

export const skemaTransaksi = z.object({
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
    { error: "Kategori transaksi tidak valid." }
  ),
});

export type MasukanTransaksi = z.infer<typeof skemaTransaksi>;

export const skemaMasuk = z.object({
  email: z.email("Format email tidak valid."),
  kataSandi: z.string().min(8, "Kata sandi minimal 8 karakter."),
});
