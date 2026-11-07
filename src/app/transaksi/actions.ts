
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
  revalidatePath("/kas");
  revalidatePath("/");
  redirect("/transaksi");
}

export async function ubahTransaksiAction(
  _sebelumnya: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const sesi = await bacaSesi();

  if (!sesi) {
    redirect("/masuk");
  }

  const id = Number(formData.get("id"));

  const mentah = {
    description: String(formData.get("description") ?? ""),
    amount: String(formData.get("amount") ?? ""),
    type: String(formData.get("type") ?? ""),
    category: String(formData.get("category") ?? ""),
  };

  const nilai = {
    ...mentah,
    id: String(formData.get("id") ?? ""),
  };

  if (!Number.isSafeInteger(id) || id <= 0) {
    return {
      pesan: "ID transaksi tidak valid.",
      nilai,
    };
  }

  const hasil = skemaTransaksi.safeParse(mentah);

  if (!hasil.success) {
    return {
      galat: z.flattenError(hasil.error).fieldErrors,
      pesan: "Periksa kembali isian formulir.",
      nilai,
    };
  }

  try {
    await prisma.transaksi.update({
      where: {
        id,
      },
      data: {
        deskripsi: hasil.data.description,
        jumlah: hasil.data.amount,
        jenis:
          hasil.data.type === "Pemasukan"
            ? "PEMASUKAN"
            : "PENGELUARAN",
        kategori: hasil.data.category,
      },
    });
  } catch (error) {
    console.error("ubahTransaksiAction gagal:", error);

    return {
      pesan: "Transaksi gagal diperbarui. Silakan periksa data.",
      nilai,
    };
  }

  revalidatePath("/transaksi");
  revalidatePath("/kas");
  revalidatePath("/");
  redirect("/transaksi");
}

export async function hapusTransaksiAction(
  _sebelumnya: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const sesi = await bacaSesi();

  if (!sesi) {
    redirect("/masuk");
  }

  const id = Number(formData.get("id"));

  if (!Number.isSafeInteger(id) || id <= 0) {
    return {
      pesan: "ID transaksi tidak valid.",
    };
  }

  try {
    const transaksi = await prisma.transaksi.findUnique({
      where: {
        id,
      },
    });

    if (!transaksi) {
      return {
        pesan: "Transaksi tidak ditemukan.",
      };
    }

    await prisma.transaksi.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("hapusTransaksiAction gagal:", error);

    return {
      pesan: "Transaksi gagal dihapus. Silakan coba lagi.",
    };
  }

  revalidatePath("/transaksi");
  revalidatePath("/kas");
  revalidatePath("/");
  redirect("/transaksi");
}
