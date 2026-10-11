# KasVault — Kas Terjaga, Organisasi Terpercaya

KasVault adalah aplikasi web untuk membantu organisasi mahasiswa mengelola keuangan secara lebih teratur dan transparan. Aplikasi ini memungkinkan pengurus memantau pemasukan, pengeluaran, serta perkembangan target dana untuk kegiatan organisasi, seperti liburan bersama dan malam keakraban (makrab).

## Fitur Utama

1. **Dashboard Keuangan**  
   Menampilkan ringkasan saldo kas, total pemasukan, total pengeluaran, jumlah anggota, dan perkembangan tujuan keuangan.

2. **Pencatatan Transaksi**  
   Menampilkan daftar transaksi pemasukan dan pengeluaran serta menyediakan formulir untuk menambahkan transaksi dengan validasi input.

3. **Tujuan Keuangan**  
   Memungkinkan pengguna membuat tujuan pengumpulan dana dengan nama kegiatan, deskripsi, target anggaran, dan tenggat waktu. Aplikasi menampilkan dana terkumpul, persentase pencapaian, dan sisa kebutuhan dana.

4. **Navigasi Ant Halaman**  
   Menyediakan navigasi untuk berpindah antara Dashboard, Transaksi, dan Tujuan Keuangan.

5. **Tampilan Responsif dan Aksesibel**  
   Menggunakan tata letak responsif untuk mendukung tampilan mobile, tablet, dan desktop serta memperhatikan label formulir, struktur HTML semantik, dan kontras warna.

## Teknologi yang Digunakan

- Next.js
- React
- TypeScript
- Tailwind CSS
- Node.js `node:crypto` untuk komponen kriptografi
- Node.js Test Runner untuk pengujian otomatis

## Struktur Proyek

```text
KasVault/
├── public/
├── security/
│   ├── crypto/
│   │   ├── crypto.mjs
│   │   └── crypto.test.mjs
│   ├── assets.md
│   ├── controls.md
│   ├── dfd-awal.svg
│   ├── dfd-threat-model.svg
│   ├── risk-assessment.md
│   └── stride.md
├── src/
│   └── app/
│       ├── components/
│       ├── transaksi/
│       ├── tujuan/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── AI_LOG.md
├── README.md
├── package.json
└── tsconfig.json
```

Folder `security/` berisi dokumentasi perencanaan keamanan dan komponen kriptografi yang dikembangkan dalam tahapan tugas Keamanan Komputasi dan Siber serta Kriptografi.

## Fondasi Kriptografi

Komponen kriptografi dasar KasVault berada di `security/crypto/`. Komponen ini menggunakan algoritma AES-256-GCM melalui modul bawaan Node.js `node:crypto`.

AES-256-GCM dipilih karena menyediakan kerahasiaan data melalui enkripsi dan pemeriksaan integritas serta autentikasi data melalui authentication tag.

### Data yang Perlu Dilindungi

| Data | Tujuan Keamanan | Prioritas |
|---|---|---|
| Nominal dan keterangan transaksi | Menjaga kerahasiaan serta mendeteksi perubahan data | Tinggi |
| Informasi pemasukan dan pengeluaran | Menjaga kerahasiaan dan integritas catatan keuangan | Tinggi |
| Target dan perkembangan dana kegiatan | Menjaga integritas informasi keuangan | Tinggi |

Prioritas tersebut merupakan penilaian awal berdasarkan dampak jika informasi keuangan organisasi diakses atau diubah tanpa izin.

### Desain Komponen Kriptografi

**Input**

- Teks yang akan dienkripsi, seperti data transaksi simulasi.
- Kunci enkripsi berupa `Buffer` sepanjang 32 byte untuk AES-256.
- Objek data terenkripsi untuk proses dekripsi.

**Proses**

1. Membuat kunci acak sepanjang 32 byte menggunakan `crypto.randomBytes()`.
2. Membuat initialization vector (IV) acak sepanjang 12 byte untuk setiap proses enkripsi.
3. Mengenkripsi teks menggunakan AES-256-GCM.
4. Mengambil authentication tag sepanjang 16 byte.
5. Memeriksa format data, IV, dan authentication tag saat dekripsi.
6. Memverifikasi authentication tag ketika dekripsi diselesaikan. Jika data atau kunci tidak sesuai, proses dekripsi akan gagal.

**Output**

Hasil enkripsi berupa objek yang berisi:

- `versi`: versi format data.
- `algoritma`: algoritma yang digunakan.
- `iv`: initialization vector dalam Base64.
- `tag`: authentication tag dalam Base64.
- `ciphertext`: hasil enkripsi dalam Base64.

Base64 digunakan untuk merepresentasikan data biner dalam bentuk teks. Base64 bukan metode enkripsi.

### Sumber Keacakan

Komponen menggunakan `crypto.randomBytes()` dari modul bawaan Node.js untuk menghasilkan kunci dan IV. Fungsi ini menggunakan sumber keacakan kriptografis yang disediakan oleh Node.js.

IV dibuat secara acak untuk setiap enkripsi. Penggunaan IV acak tidak menggantikan kebutuhan untuk mengelola kunci secara aman.

### Batasan Implementasi Kriptografi

Komponen kriptografi ini telah diuji secara terpisah menggunakan data simulasi. Komponen tersebut belum terintegrasi dengan formulir transaksi, backend, atau database aplikasi KasVault.

Kunci yang dibuat dalam pengujian hanya digunakan untuk pengujian tersebut. Pengelolaan dan penyimpanan kunci untuk penggunaan produksi belum diimplementasikan. Karena itu, versi saat ini belum dapat diklaim mengenkripsi seluruh data transaksi aplikasi secara menyeluruh.

## Cara Menjalankan Aplikasi

### Persyaratan

- Node.js
- npm

### Instalasi

1. Buka terminal pada folder proyek KasVault.
2. Pasang dependensi:

```bash
npm install
```

3. Jalankan aplikasi dalam mode pengembangan:

```bash
npm run dev
```

4. Buka alamat berikut di browser:

```text
http://localhost:3000
```

Jika port 3000 sedang digunakan, gunakan alamat yang ditampilkan di terminal.

## Pengujian

### Pengujian Aplikasi Web

Pengujian awal aplikasi meliputi:

- Navigasi antara Dashboard, Transaksi, dan Tujuan Keuangan.
- Validasi formulir ketika nama atau deskripsi kosong dan ketika target atau jumlah dana tidak valid.
- Penambahan transaksi dan tujuan keuangan menggunakan data simulasi.
- Pemeriksaan tampilan pada mobile, tablet, dan desktop.
- Audit Lighthouse Accessibility pada masing-masing halaman.

Skor Lighthouse Accessibility yang diperoleh setelah perbaikan adalah 100/100 pada Dashboard, Transaksi, dan Tujuan Keuangan. Hasil tersebut berlaku untuk lingkungan pengembangan saat audit dilakukan.

### Pengujian Kriptografi

Jalankan perintah berikut dari direktori utama proyek:

```bash
node --test security/crypto/crypto.test.mjs
```

Empat skenario pengujian yang tersedia:

1. Enkripsi dan dekripsi transaksi berhasil.
2. Teks kosong ditolak.
3. Ciphertext yang diubah ditolak.
4. Kunci yang salah ditolak.

Hasil pengujian terakhir: **4 tes lulus dan 0 tes gagal**.

### Pemeriksaan Kualitas Kode

Jalankan ESLint:

```bash
npm run lint
```

Jalankan build produksi:

```bash
npm run build
```

Pada pemeriksaan terakhir, ESLint selesai tanpa laporan error dan build produksi Next.js berhasil.

## Batasan Versi Saat Ini

Versi ini masih menggunakan data simulasi yang disimpan sementara pada state halaman. Data transaksi dan tujuan baru belum disimpan secara permanen, belum menggunakan backend atau database, dan belum memiliki autentikasi pengguna.

Komponen kriptografi telah dibuat dan diuji secara terpisah, tetapi belum digunakan oleh aplikasi web untuk mengenkripsi data transaksi. Penyimpanan kunci yang aman, autentikasi, dan integrasi enkripsi dengan penyimpanan data masih menjadi pekerjaan lanjutan.

## Konsep Pengembangan Selanjutnya

KasVault dirancang untuk dikembangkan menjadi aplikasi pengelolaan keuangan organisasi yang memiliki transparansi berdasarkan peran pengguna dan riwayat transaksi yang integritasnya dapat diperiksa.

**Slogan:** Kas Terjaga, Organisasi Terpercaya.
