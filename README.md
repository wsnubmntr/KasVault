# KasVault - Kas Terjaga, Organisasi Terpercaya

KasVault adalah aplikasi web untuk membantu organisasi mahasiswa mengelola keuangan secara lebih teratur dan transparan. Aplikasi ini menyediakan pengelolaan data kas, pencatatan pemasukan dan pengeluaran, serta pemantauan keuangan organisasi.

## Perkembangan Produk

### Versi 0.1
Versi awal berfokus pada pengembangan antarmuka aplikasi, navigasi, dashboard, transaksi, dan tujuan keuangan menggunakan Next.js, React, TypeScript, dan Tailwind CSS.

### Versi 0.2
Pada Milestone 2, KasVault dikembangkan dengan integrasi logika server dan database agar pengelolaan data dapat dilakukan secara persisten.

Pengembangan versi ini mencakup:
- Integrasi PostgreSQL menggunakan Prisma ORM 7.
- CRUD data Kas.
- CRUD data Transaksi.
- Relasi antara Kas dan Transaksi.
- Server Actions untuk proses pengelolaan data.
- Validasi input sisi server menggunakan Zod.
- Autentikasi menggunakan akun demo dan cookie sesi.
- Halaman detail transaksi.
- Seed data sintetis untuk pengujian database.

## Fitur Utama

1. **Dashboard Keuangan**  
   Menampilkan ringkasan saldo kas, pemasukan, pengeluaran, dan informasi tujuan keuangan.

2. **Pengelolaan Kas**  
   Menyediakan fitur tambah, tampil, edit, dan hapus data kas. Kas yang masih memiliki transaksi tidak dapat dihapus.

3. **Pengelolaan Transaksi**  
   Menyediakan fitur tambah, tampil, edit, dan hapus transaksi pemasukan maupun pengeluaran.

4. **Detail Transaksi**  
   Menampilkan informasi transaksi, termasuk kategori, nominal, tanggal, nomor bukti, dan kas terkait.

5. **Relasi Data**  
   Setiap transaksi terhubung dengan satu data Kas melalui relasi foreign key.

6. **Validasi Input**  
   Menggunakan Zod untuk memvalidasi masukan sebelum diproses dan disimpan ke database.

7. **Autentikasi**  
   Menyediakan halaman login dan logout dengan cookie sesi HTTP-only.

8. **Tampilan Responsif**  
   Menggunakan Tailwind CSS dengan pendekatan responsif untuk berbagai ukuran layar.

## Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| Next.js 16 | Framework aplikasi web dan server |
| React 19 | Pembangunan antarmuka |
| TypeScript | Sistem tipe pada kode |
| Tailwind CSS 4 | Styling antarmuka |
| PostgreSQL 18 | Database relasional |
| Prisma ORM 7 | Pengelolaan database |
| Zod 4 | Validasi input |
| Node.js | Runtime JavaScript |
| bcryptjs | Verifikasi hash password |
| Docker | Menjalankan PostgreSQL dalam container |

## Struktur Database

KasVault menggunakan dua entitas utama yang saling berelasi.

### 1. Kas

Menyimpan informasi kas organisasi.

| Atribut | Keterangan |
|---|---|
| id | Primary key |
| nama | Nama kas dan bersifat unik |
| periode | Periode pengelolaan kas |
| saldoAwal | Saldo awal kas |
| dibuatPada | Waktu pembuatan data |

### 2. Transaksi

Menyimpan informasi pemasukan dan pengeluaran.

| Atribut | Keterangan |
|---|---|
| id | Primary key |
| tanggal | Tanggal transaksi |
| jenis | PEMASUKAN atau PENGELUARAN |
| deskripsi | Keterangan transaksi |
| kategori | Kategori transaksi |
| jumlah | Nominal transaksi |
| nomorBukti | Nomor bukti transaksi |
| kasId | Foreign key yang menghubungkan transaksi dengan Kas |

### Relasi

- Satu Kas dapat memiliki banyak Transaksi.
- Setiap Transaksi terhubung dengan satu Kas.
- Relasi menggunakan `kasId` sebagai foreign key.
- Penghapusan Kas yang masih memiliki transaksi dibatasi menggunakan `onDelete: Restrict`.

## Persyaratan Sistem

Pastikan perangkat telah memiliki:

- Node.js dan npm.
- Docker Desktop.
- PostgreSQL melalui container Docker.
- Git.

## Cara Instalasi

### 1. Clone repository

```bash
git clone https://github.com/wsnubmntr/KasVault.git
cd KasVault
```

### 2. Instal dependensi

```bash
npm install
```

### 3. Konfigurasi environment

Salin file contoh konfigurasi:

PowerShell:

```powershell
Copy-Item .env.example .env
```

Isi variabel berikut sesuai konfigurasi lokal:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
DEMO_EMAIL="admin@example.com"
DEMO_KATA_SANDI_HASH_BASE64=""
```

Keterangan:
- `DATABASE_URL` digunakan untuk koneksi PostgreSQL.
- `DEMO_EMAIL` merupakan email akun demo.
- `DEMO_KATA_SANDI_HASH_BASE64` merupakan hash password bcrypt yang direpresentasikan dalam Base64.

Gunakan nilai konfigurasi lokal yang sesuai. Jangan menyimpan kredensial asli ke repository GitHub.

### 4. Menjalankan database

Pastikan PostgreSQL telah berjalan dan dapat diakses melalui alamat koneksi pada `DATABASE_URL`.

### 5. Menjalankan migration

```bash
npx prisma migrate dev
```

Perintah tersebut menerapkan migration ke database pengembangan.

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Menjalankan seed

```bash
npx prisma db seed
```

Seed menggunakan data sintetis dan operasi upsert agar dapat dijalankan kembali tanpa membuat duplikasi data seed.

## Menjalankan Aplikasi

### Development

```bash
npm run dev
```

Buka:

```text
http://localhost:3000
```

### Production

Buat build produksi:

```bash
npm run build
```

Jalankan production server:

```bash
npm run start
```

Pastikan port yang digunakan tersedia dan database tetap berjalan.

## Pengujian

### 1. Pemeriksaan TypeScript

```bash
npx tsc --noEmit
```

### 2. Pemeriksaan ESLint

```bash
npm run lint
```

### 3. Production Build

```bash
npm run build
```

### 4. Pemeriksaan Migration

```bash
npx prisma migrate status
```

### 5. Skenario Pengujian Fungsional

Pengujian aplikasi mencakup:

- Create, Read, Update, dan Delete pada data Kas.
- Create, Read, Update, dan Delete pada data Transaksi.
- Pemeriksaan relasi antara Kas dan Transaksi.
- Pemeriksaan jumlah transaksi pada data Kas.
- Penolakan nominal transaksi yang tidak valid.
- Penolakan saldo awal Kas negatif.
- Penolakan data dengan nama yang tidak memenuhi ketentuan validasi.

Dokumentasi lengkap hasil pengujian dan bukti screenshot disimpan dalam folder `evidence/` dan `docs/` apabila tersedia pada repository.

## Keamanan dan Batasan Implementasi

KasVault menggunakan validasi sisi server, autentikasi berbasis sesi, cookie HTTP-only, serta bcrypt untuk memverifikasi hash password akun demo.

Penyimpanan sesi saat ini menggunakan Map di memori server sehingga masih memiliki keterbatasan ketika server restart atau aplikasi dijalankan pada beberapa instance.

Komponen kriptografi AES-256-GCM dikembangkan secara terpisah pada folder `security/crypto/`. Komponen tersebut menggunakan authentication tag untuk memeriksa integritas data. Implementasinya belum terintegrasi langsung dengan penyimpanan transaksi PostgreSQL.

Karena itu, KasVault versi ini belum mengklaim seluruh data transaksi telah dienkripsi menggunakan AES-256-GCM.

## Dokumentasi Tambahan

Dokumentasi keamanan dan pengembangan dapat ditemukan pada folder:

- `docs/` - dokumentasi proyek dan pengujian.
- `evidence/` - bukti pengujian dan tangkapan layar.
- `security/` - dokumentasi keamanan dan komponen kriptografi.
- `prisma/` - schema, migration, dan seed database.

## Pengembang

**Wisnu Bimantoro**  
Program Studi Ilmu Komputer  
Universitas Pertamina

---

**KasVault - Kas Terjaga, Organisasi Terpercaya.**
'@ | Set-Content -Path "README.md" -Encoding utf8

