"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import type { Role } from "@/lib/sesi";

const menu = [
  { label: "Dashboard", href: "/" },
  { label: "Kas", href: "/kas" },
  { label: "Transaksi", href: "/transaksi" },
  { label: "Tujuan Keuangan", href: "/tujuan" },
  { label: "Tentang", href: "/tentang" },
];

function NavigationLinks() {
  const pathname = usePathname();

  return (
    <>
      {menu.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
              active
                ? "bg-emerald-700 text-white"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export default function AppNavigation({ role }: { role: Role }) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-700">
          KasVault
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {role === "BENDAHARA" ? "Bendahara" : "Anggota"}
        </span>
      </div>

      <nav
        aria-label="Navigasi utama"
        className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
      >
        <Suspense
          fallback={
            <div
              aria-label="Memuat navigasi"
              className="h-11 w-full animate-pulse rounded-xl bg-slate-100 sm:w-64"
            />
          }
        >
          <NavigationLinks />
        </Suspense>
      </nav>
    </div>
  );
}