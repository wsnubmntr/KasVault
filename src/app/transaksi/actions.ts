"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { skemaTransaksi } from "@/lib/skema";
import { bacaSesi } from "@/lib/sesi";
import { judulSudahAda, tambahTransaksi } from "../../../lib/data";
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

  if (judulSudahAda(hasil.data.description)) {
    return {
      galat: {
        description: ["Nama transaksi sudah digunakan."],
      },
      pesan: "Gunakan nama transaksi yang berbeda.",
      nilai,
    };
  }

  try {
    tambahTransaksi(hasil.data);
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
