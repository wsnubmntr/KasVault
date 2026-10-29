import "server-only";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";

const NAMA_COOKIE = "sesi";
const DELAPAN_JAM = 60 * 60 * 8;

type DataSesi = {
  email: string;
  kedaluwarsa: number;
};

const globalSesi = globalThis as typeof globalThis & {
  penyimpananSesiKasVault?: Map<string, DataSesi>;
};

const penyimpanan =
  (globalSesi.penyimpananSesiKasVault ??= new Map<string, DataSesi>());

export async function buatSesi(email: string) {
  const idSesi = randomUUID();

  penyimpanan.set(idSesi, {
    email,
    kedaluwarsa: Date.now() + DELAPAN_JAM * 1000,
  });

  const tokoCookie = await cookies();

  tokoCookie.set(NAMA_COOKIE, idSesi, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DELAPAN_JAM,
  });
}

export async function bacaSesi() {
  const tokoCookie = await cookies();
  const idSesi = tokoCookie.get(NAMA_COOKIE)?.value;

  if (!idSesi) {
    return null;
  }

  const dataSesi = penyimpanan.get(idSesi);

  if (!dataSesi || dataSesi.kedaluwarsa <= Date.now()) {
    penyimpanan.delete(idSesi);
    return null;
  }

  return { email: dataSesi.email };
}

export async function hapusSesi() {
  const tokoCookie = await cookies();
  const idSesi = tokoCookie.get(NAMA_COOKIE)?.value;

  if (idSesi) {
    penyimpanan.delete(idSesi);
  }

  tokoCookie.delete(NAMA_COOKIE);
}
