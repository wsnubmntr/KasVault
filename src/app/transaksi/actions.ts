"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { skemaTransaksi } from "@/lib/skema";
import { bacaSesi } from "@/lib/sesi";
import { prisma } from "../../../lib/prisma";
import type { StatusForm } from "@/lib/status-form";

export async function tambahTransaksiAction(
  _sebelumnya: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const sesi = await bacaSesi();

  if (!sesi) {
    redirect("/masuk");
  }

  const mentah = Object.fromEntries(formData);

  const nilai = {
    description: String(mentah.description ?? ""),
    amount: String(mentah.amount ?? ""),
    type: String(mentah.type ?? ""),
    category: String(mentah.category ?? ""),
  };

  const hasil = skemaTransaksi.safeParse(mentah);

  if (!hasil.success) {
    return {
      galat: z.flattenError(hasil.error).fieldErrors,
      pesan: "Periksa kembali isian formulir.",
      nilai,
    };
  }

  try {
    const kas = await prisma.kas.findFirst({
      orderBy: {
        id: "asc",
      },
    });

    if (!kas) {
      return {
        pesan: "Data kas belum tersedia. Silakan hubungi administrator.",
        nilai,
      };
    }

    await prisma.transaksi.create({
      data: {
        deskripsi: hasil.data.description,
        jumlah: hasil.data.amount,
        jenis:
          hasil.data.type === "Pemasukan"
            ? "PEMASUKAN"
            : "PENGELUARAN",
        kategori: hasil.data.category,
        nomorBukti: `TRX-${Date.now()}`,
        kasId: kas.id,
      },
    });
  } catch (error) {
    console.error("tambahTransaksiAction gagal:", error);

    return {
      pesan: "Transaksi gagal ditambahkan. Silakan coba lagi.",
      nilai,
    };
  }

  revalidatePath("/transaksi");
  redirect("/transaksi");
}