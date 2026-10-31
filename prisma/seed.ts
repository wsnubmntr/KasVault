import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const kas = await prisma.kas.upsert({
    where: {
      nama: "Kas Kelas Ilmu Komputer",
    },
    update: {},
    create: {
      nama: "Kas Kelas Ilmu Komputer",
      periode: "2026/2027",
      saldoAwal: 500000,
    },
  });

  await prisma.transaksi.upsert({
    where: {
      kasId_nomorBukti: {
        kasId: kas.id,
        nomorBukti: "TRX-001",
      },
    },
    update: {},
    create: {
      tanggal: new Date(),
      jenis: "PEMASUKAN",
      deskripsi: "Saldo awal kas kelas",
      jumlah: 500000,
      nomorBukti: "TRX-001",
      kasId: kas.id,
    },
  });

  console.log("Seed KasVault berhasil dijalankan!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });