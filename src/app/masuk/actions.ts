"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { skemaMasuk } from "@/lib/skema";
import { buatSesi, hapusSesi } from "@/lib/sesi";
import type { Role } from "@/lib/sesi";
import type { StatusForm } from "@/lib/status-form";

const AKUN_DEMO = [
  {
    email: process.env.BENDAHARA_EMAIL,
    hash: process.env.BENDAHARA_PASSWORD_HASH_BASE64,
    role: "BENDAHARA" as Role,
  },
  {
    email: process.env.ANGGOTA_EMAIL,
    hash: process.env.ANGGOTA_PASSWORD_HASH_BASE64,
    role: "ANGGOTA" as Role,
  },
];

export async function masuk(
  _sebelumnya: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const hasil = skemaMasuk.safeParse(Object.fromEntries(formData));

  if (!hasil.success) {
    return {
      galat: z.flattenError(hasil.error).fieldErrors,
      pesan: "Periksa kembali data login.",
    };
  }

  const { email, kataSandi } = hasil.data;

  const akun = AKUN_DEMO.find(
    (item) => item.email?.toLowerCase() === email.toLowerCase()
  );

  if (!akun?.email || !akun.hash) {
    return { pesan: "Email atau kata sandi salah." };
  }

  let hashKataSandi: string;

  try {
    hashKataSandi = Buffer.from(akun.hash, "base64").toString("utf8");

    if (!hashKataSandi.startsWith("$2")) {
      return { pesan: "Email atau kata sandi salah." };
    }

    const kataSandiCocok = await bcrypt.compare(
      kataSandi,
      hashKataSandi
    );

    if (!kataSandiCocok) {
      return { pesan: "Email atau kata sandi salah." };
    }
  } catch {
    return { pesan: "Email atau kata sandi salah." };
  }

  await buatSesi(akun.email, akun.role);
  redirect("/");
}

export async function keluar() {
  await hapusSesi();
  redirect("/masuk");
}
