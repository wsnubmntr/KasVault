
"use client";

import { useState } from "react";
import AppNavigation from "../components/AppNavigation";

type Goal = {
  id: number;
  name: string;
  description: string;
  target: number;
  collected: number;
  deadline: string;
};

const initialGoals: Goal[] = [
  {
    id: 1,
    name: "Liburan Akhir Semester",
    description: "Liburan bersama seluruh anggota organisasi",
    target: 5000000,
    collected: 3250000,
    deadline: "2026-12-20",
  },
  {
    id: 2,
    name: "Makrab Organisasi",
    description: "Kegiatan malam keakraban anggota",
    target: 3000000,
    collected: 1200000,
    deadline: "2027-01-15",
  },
];

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatTanggal(date: string) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function GoalCard({ goal }: { goal: Goal }) {
  const percentage =
    goal.target > 0
      ? Math.min(Math.round((goal.collected / goal.target) * 100), 100)
      : 0;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{goal.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{goal.description}</p>
        </div>

        <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
          {percentage}% tercapai
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">Dana terkumpul</p>
          <p className="mt-1 text-lg font-bold text-emerald-700">
            {formatRupiah(goal.collected)}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Target dana</p>
          <p className="mt-1 text-lg font-bold text-slate-900">
            {formatRupiah(goal.target)}
          </p>
        </div>
      </div>

      <div
        className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label={`Progres ${goal.name}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap justify-between gap-2 border-t border-slate-100 pt-4 text-sm">
        <span className="text-slate-500">Sisa kebutuhan dana</span>
        <span className="font-semibold text-slate-800">
          {formatRupiah(Math.max(goal.target - goal.collected, 0))}
        </span>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Tenggat waktu: {formatTanggal(goal.deadline)}
      </p>
    </article>
  );
}

export default function TujuanPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const numericTarget = Number(target);

    if (!name.trim()) {
      setError("Nama tujuan keuangan wajib diisi.");
      return;
    }

    if (!description.trim()) {
      setError("Deskripsi tujuan wajib diisi.");
      return;
    }

    if (
      !target.trim() ||
      !Number.isFinite(numericTarget) ||
      numericTarget <= 0 ||
      !Number.isSafeInteger(numericTarget)
    ) {
      setError("Target dana harus berupa bilangan bulat lebih dari Rp0.");
      return;
    }

    if (!deadline) {
      setError("Tenggat waktu wajib ditentukan.");
      return;
    }

    const selectedDate = new Date(`${deadline}T23:59:59`);

    if (Number.isNaN(selectedDate.getTime()) || selectedDate < new Date()) {
      setError("Tenggat waktu tidak boleh di masa lalu.");
      return;
    }

    const newGoal: Goal = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      target: numericTarget,
      collected: 0,
      deadline,
    };

    setGoals((previous) => [newGoal, ...previous]);
    setName("");
    setDescription("");
    setTarget("");
    setDeadline("");
    setSuccess("Tujuan keuangan berhasil ditambahkan ke data simulasi.");
  }

  const totalTarget = goals.reduce((total, goal) => total + goal.target, 0);
  const totalCollected = goals.reduce(
    (total, goal) => total + goal.collected,
    0
  );

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <AppNavigation />

        <header className="mb-8 mt-5">
          <p className="text-sm text-slate-500">KasVault / Perencanaan</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Tujuan Keuangan
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Rencanakan anggaran dan pantau dana untuk kegiatan organisasi.
          </p>
        </header>

        <section
          aria-label="Ringkasan tujuan keuangan"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Jumlah tujuan</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {goals.length}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total target</p>
            <p className="mt-2 text-xl font-bold text-slate-900">
              {formatRupiah(totalTarget)}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total terkumpul</p>
            <p className="mt-2 text-xl font-bold text-emerald-700">
              {formatRupiah(totalCollected)}
            </p>
          </article>
        </section>

        <section
          aria-labelledby="form-title"
          className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 id="form-title" className="text-lg font-bold text-slate-900">
            Buat Tujuan Baru
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Tentukan kegiatan, target anggaran, dan tenggat waktunya.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="goal-name"
                  className="mb-2 block text-sm font-medium"
                >
                  Nama tujuan
                </label>
                <input
                  id="goal-name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Contoh: Liburan bersama"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="goal-target"
                  className="mb-2 block text-sm font-medium"
                >
                  Target anggaran (Rp)
                </label>
                <input
                  id="goal-target"
                  name="target"
                  type="number"
                  min="1"
                  step="1"
                  value={target}
                  onChange={(event) => setTarget(event.target.value)}
                  placeholder="Contoh: 5000000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="goal-description"
                  className="mb-2 block text-sm font-medium"
                >
                  Deskripsi kegiatan
                </label>
                <textarea
                  id="goal-description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Jelaskan tujuan pengumpulan dana ini"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="goal-deadline"
                  className="mb-2 block text-sm font-medium"
                >
                  Tenggat waktu
                </label>
                <input
                  id="goal-deadline"
                  name="deadline"
                  type="date"
                  min="2026-10-10"
                  value={deadline}
                  onChange={(event) => setDeadline(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700"
              >
                {success}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-emerald-700 sm:w-auto"
            >
              + Tambah Tujuan
            </button>
          </form>
        </section>

        <section aria-labelledby="goal-list-title">
          <div className="mb-4">
            <h2
              id="goal-list-title"
              className="text-xl font-bold text-slate-900"
            >
              Daftar Tujuan Organisasi
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Pantau dana terkumpul dan kebutuhan setiap kegiatan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </section>

        <p className="mt-8 text-xs leading-5 text-slate-500">
          Catatan: tujuan keuangan masih menggunakan data simulasi. Data
          tambahan tersimpan sementara selama halaman tidak dimuat ulang.
        </p>
      </div>
    </main>
  );
}
