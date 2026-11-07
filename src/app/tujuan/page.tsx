import { Suspense } from "react";
import { connection } from "next/server";
import { wajibLogin } from "@/lib/akses";
import TujuanContent from "./TujuanContent";

export default function TujuanPage() {
  return (
    <Suspense
      fallback={
        <main
          role="status"
          className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600"
        >
          Memuat Tujuan Keuangan KasVault...
        </main>
      }
    >
      <TujuanPageContent />
    </Suspense>
  );
}

async function TujuanPageContent() {
  await connection();

  const sesi = await wajibLogin();

  return <TujuanContent role={sesi.role} />;
}