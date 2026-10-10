
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Dashboard", href: "/" },
  { label: "Transaksi", href: "/transaksi" },
  { label: "Tujuan Keuangan", href: "/tujuan" },
];

export default function AppNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi utama"
      className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
    >
      {menu.map((item) => {
        const active = pathname === item.href;

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
    </nav>
  );
}
