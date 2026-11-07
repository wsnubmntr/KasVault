
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { bacaSesi } from "@/lib/sesi";
import { skemaKas } from "@/lib/skema";
import type { StatusForm } from "@/lib/status-form";

export async function tambahKasAction(
  _sebelumnya: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const sesi = await bacaSesi();

  if (!sesi) {
    redirect("/masuk");
  }

  const mentah = Object.fromEntries(formData);

  const nilai = {
    nama: String(mentah.nama ?? ""),
    periode: String(mentah.periode ?? ""),
    saldoAwal: String(mentah.saldoAwal ?? ""),
  };

  const hasil = skemaKas.safeParse(mentah);

  if (!hasil.success) {
    return {
      galat: z.flattenError(hasil.error).fieldErrors,
      pesan: "Periksa kembali isian formulir.",
      nilai,
    };
  }

  try {
    await prisma.kas.create({
      data: {
        nama: hasil.data.nama,
        periode: hasil.data.periode,
        saldoAwal: hasil.data.saldoAwal,
      },
    });
  } catch (error) {
    console.error("tambahKasAction gagal:", error);

    return {
      pesan: "Kas gagal ditambahkan. Periksa apakah nama kas sudah digunakan.",
      nilai,
    };
  }

  revalidatePath("/kas");
  revalidatePath("/");
  redirect("/kas");
}

export async function ubahKasAction(
  _sebelumnya: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const sesi = await bacaSesi();

  if (!sesi) {
    redirect("/masuk");
  }

  const id = Number(formData.get("id"));

  const mentah = {
    nama: String(formData.get("nama") ?? ""),
    periode: String(formData.get("periode") ?? ""),
    saldoAwal: String(formData.get("saldoAwal") ?? ""),
  };

  const nilai = {
    ...mentah,
    id: String(formData.get("id") ?? ""),
  };

  if (!Number.isSafeInteger(id) || id <= 0) {
    return {
      pesan: "ID kas tidak valid.",
      nilai,
    };
  }

  const hasil = skemaKas.safeParse(mentah);

  if (!hasil.success) {
    return {
      galat: z.flattenError(hasil.error).fieldErrors,
      pesan: "Periksa kembali isian formulir.",
      nilai,
    };
  }

  try {
    await prisma.kas.update({
      where: {
        id,
      },
      data: {
        nama: hasil.data.nama,
        periode: hasil.data.periode,
        saldoAwal: hasil.data.saldoAwal,
      },
    });
  } catch (error) {
    console.error("ubahKasAction gagal:", error);

    return {
      pesan: "Kas gagal diperbarui. Periksa data yang dimasukkan.",
      nilai,
    };
  }

  revalidatePath("/kas");
  revalidatePath("/");
  redirect("/kas");
}

export async function hapusKasAction(
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
      pesan: "ID kas tidak valid.",
    };
  }

  try {
    const kas = await prisma.kas.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            transaksi: true,
          },
        },
      },
    });

    if (!kas) {
      return {
        pesan: "Data kas tidak ditemukan.",
      };
    }

    if (kas._count.transaksi > 0) {
      return {
        pesan: "Kas tidak dapat dihapus karena masih memiliki transaksi.",
      };
    }

    await prisma.kas.delete({
      where: { id },
    });
  } catch (error) {
    console.error("hapusKasAction gagal:", error);

    return {
      pesan: "Kas gagal dihapus. Silakan coba lagi.",
    };
  }

  revalidatePath("/kas");
  revalidatePath("/");
  redirect("/kas");
}
