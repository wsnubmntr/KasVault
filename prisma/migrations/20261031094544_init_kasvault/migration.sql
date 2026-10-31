-- CreateEnum
CREATE TYPE "JenisTransaksi" AS ENUM ('PEMASUKAN', 'PENGELUARAN');

-- CreateTable
CREATE TABLE "Kas" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "periode" TEXT NOT NULL,
    "saldoAwal" DECIMAL(12,2) NOT NULL,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" SERIAL NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jenis" "JenisTransaksi" NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "jumlah" DECIMAL(12,2) NOT NULL,
    "nomorBukti" TEXT NOT NULL,
    "kasId" INTEGER NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kas_nama_key" ON "Kas"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Transaksi_kasId_nomorBukti_key" ON "Transaksi"("kasId", "nomorBukti");

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_kasId_fkey" FOREIGN KEY ("kasId") REFERENCES "Kas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
