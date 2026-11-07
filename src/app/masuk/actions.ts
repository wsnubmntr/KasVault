
"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { skemaMasuk } from "@/lib/skema";
import { buatSesi, hapusSesi } from "@/lib/sesi";
import type { StatusForm } from "@/lib/status-form";

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

  const emailDemo = process.env.DEMO_EMAIL;
  const hashBase64 = process.env.DEMO_KATA_SANDI_HASH_BASE64;

  if (!emailDemo || !hashBase64 || email !== emailDemo) {
    return { pesan: "Email atau kata sandi salah." };
  }

  const hashKataSandi = Buffer.from(hashBase64, "base64").toString("utf8");

  const kataSandiCocok = await bcrypt.compare(
    kataSandi,
    hashKataSandi
  );

  if (!kataSandiCocok) {
    return { pesan: "Email atau kata sandi salah." };
  }

  await buatSesi(email);
  redirect("/");
}

export async function keluar() {
  await hapusSesi();
  redirect("/masuk");
}
