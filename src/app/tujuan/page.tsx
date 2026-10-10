
"use client";

import { useState } from "react";
import AppNavigation from "../components/AppNavigation";
import PageHeader from "../components/PageHeader";
import FormField from "../components/FormField";
import StatCard from "../components/StatCard";

type Tujuan = {
  id: number;
  name: string;
  description: string;
  target: number;
  collected: number;
  deadline: string;
};

const dataAwal: Tujuan[] = [
  {
    id: 1,
    name: "Liburan Bersama",
    description: "Dana untuk liburan bersama teman-teman.",
    target: 5000000,
    collected: 3250000,
    deadline: "2026-12-20",
  },
  {
    id: 2,
    name: "Acara Makrab",
    description: "Dana untuk kegiatan malam keakraban.",
    target: 3000000,
    collected: 1200000,
    deadline: "2026-11-30",
  },
];

function formatRupiah(nominal: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nominal);
}

function formatTanggal(tanggal: string) {
  if (!tanggal) return "-";

  const [tahun, bulan, hari] = tanggal.split("-").map(Number);

  return new Date(tahun, bulan - 1, hari).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getTanggalHariIni() {
  const sekarang = new Date();
  const tahun = sekarang.getFullYear();
  const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
  const tanggal = String(sekarang.getDate()).padStart(2, "0");

  return `${tahun}-${bulan}-${tanggal}`;
}

function GoalCard({ goal }: { goal: Tujuan }) {
  const persentase =
    goal.target > 0
      ? Math.min((goal.collected / goal.target) * 100, 100)
      : 0;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{goal.name}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {goal.description}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {Math.round(persentase)}%
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-500">Dana terkumpul</span>
          <span className="font-semibold text-slate-800">
            {formatRupiah(goal.collected)}
          </span>
        </div>

        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label={`Progress tujuan ${goal.name}`}
          aria-valuenow={Math.round(persentase)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${persentase}%` }}
          />
        </div>

        <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm">
          <span className="text-slate-500">
            Target: {formatRupiah(goal.target)}
          </span>
          <span className="text-slate-500">
            Sisa: {formatRupiah(Math.max(goal.target - goal.collected, 0))}
          </span>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-500">
          <span className="font-medium text-slate-700">Tenggat:</span>{" "}
          {formatTanggal(goal.deadline)}
        </p>
      </div>
    </article>
  );
}

export default function TujuanPage() {
  const [tujuan, setTujuan] = useState<Tujuan[]>(dataAwal);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const totalTarget = tujuan.reduce(
    (total, item) => total + item.target,
    0
  );

  const totalTerkumpul = tujuan.reduce(
    (total, item) => total + item.collected,
    0
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const namaBersih = name.trim();
    const deskripsiBersih = description.trim();
    const nominalTarget = Number(target);

    if (!namaBersih) {
      setError("Nama tujuan wajib diisi.");
      return;
    }

    if (namaBersih.length < 3) {
      setError("Nama tujuan minimal terdiri dari 3 karakter.");
      return;
    }

    if (
      !target ||
      !Number.isSafeInteger(nominalTarget) ||
      nominalTarget <= 0
    ) {
      setError("Target dana harus berupa nominal rupiah positif yang valid.");
      return;
    }

    if (!deadline) {
      setError("Silakan tentukan tenggat waktu tujuan.");
      return;
    }

    if (deadline < getTanggalHariIni()) {
      setError("Tenggat waktu tidak boleh sebelum tanggal hari ini.");
      return;
    }

    const tujuanBaru: Tujuan = {
      id: Date.now(),
      name: namaBersih,
      description: deskripsiBersih || "Tidak ada deskripsi.",
      target: nominalTarget,
      collected: 0,
      deadline,
    };

    setTujuan((daftarSebelumnya) => [...daftarSebelumnya, tujuanBaru]);
    setName("");
    setDescription("");
    setTarget("");
    setDeadline("");
    setSuccess("Tujuan keuangan berhasil ditambahkan.");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AppNavigation />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 mt-5">
          <p className="mb-3 text-sm text-slate-500">
            Dashboard / Tujuan Keuangan
          </p>

          <PageHeader
            title="Tujuan Keuangan"
            description="Rencanakan kebutuhan bersama dan pantau perkembangan dana yang terkumpul."
          />
        </div>

        <section
          aria-label="Ringkasan tujuan keuangan"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <StatCard
            title="Jumlah Tujuan"
            value={String(tujuan.length)}
            description="Tujuan keuangan yang tercatat"
            icon="🎯"
            color="blue"
          />

          <StatCard
            title="Total Target"
            value={formatRupiah(totalTarget)}
            description="Total dana yang direncanakan"
            icon="💰"
            color="purple"
          />

          <StatCard
            title="Dana Terkumpul"
            value={formatRupiah(totalTerkumpul)}
            description="Akumulasi dana dari semua tujuan"
            icon="📈"
            color="green"
          />
        </section>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                Tambah Tujuan
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Buat target dana baru untuk kebutuhan bersama.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                <FormField label="Nama Tujuan" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Contoh: Liburan Bersama"
                    maxLength={80}
                    aria-describedby={error ? "form-error" : undefined}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </FormField>

                <FormField label="Target Dana (Rp)" htmlFor="target">
                  <input
                    id="target"
                    name="target"
                    type="number"
                    min="1"
                    step="1"
                    value={target}
                    onChange={(event) => setTarget(event.target.value)}
                    placeholder="Contoh: 5000000"
                    aria-describedby={error ? "form-error" : undefined}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </FormField>

                <FormField label="Deskripsi" htmlFor="description">
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Jelaskan tujuan penggunaan dana"
                    rows={3}
                    maxLength={250}
                    className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </FormField>

                <FormField label="Tenggat Waktu" htmlFor="deadline">
                  <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                    aria-describedby={error ? "form-error" : undefined}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </FormField>
              </div>

              {error && (
                <p
                  id="form-error"
                  role="alert"
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {success && (
                <p
                  role="status"
                  className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                >
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                + Tambah Tujuan
              </button>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Data saat ini disimpan sementara di browser dan akan kembali
                ke data awal ketika halaman dimuat ulang.
              </p>
            </form>
          </section>

          <section className="lg:col-span-2">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Daftar Tujuan
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Pantau progres setiap target keuangan.
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                {tujuan.length} tujuan
              </span>
            </div>

            {tujuan.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {tujuan.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                <p className="text-3xl" aria-hidden="true">
                  🎯
                </p>
                <h3 className="mt-3 font-semibold text-slate-800">
                  Belum ada tujuan keuangan
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Tambahkan tujuan pertama melalui formulir di samping.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
