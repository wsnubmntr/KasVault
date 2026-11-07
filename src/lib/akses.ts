import "server-only";

import { redirect } from "next/navigation";
import { bacaSesi, type Role } from "@/lib/sesi";

export async function wajibLogin() {
  const sesi = await bacaSesi();

  if (!sesi) {
    redirect("/masuk");
  }

  return sesi;
}

export async function wajibRole(role: Role) {
  const sesi = await wajibLogin();

  if (sesi.role !== role) {
    redirect("/");
  }

  return sesi;
}
