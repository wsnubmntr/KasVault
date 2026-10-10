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

## Struktur Proyek

```text
KasVault/
├── public/
├── security/
├── src/
│   └── app/
│       ├── components/
│       │   └── AppNavigation.tsx
│       ├── transaksi/
│       │   └── page.tsx
│       ├── tujuan/
│       │   └── page.tsx
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── AI_LOG.md
├── README.md
├── package.json
└── tsconfig.json
```

Folder `security/` berisi dokumentasi perencanaan keamanan yang dikembangkan pada tahap tugas Keamanan Komputasi dan Siber.

## Cara Menjalankan Aplikasi

### Persyaratan

- Node.js
- npm

### Instalasi

1. Buka terminal pada folder proyek KasVault.
2. Jalankan perintah berikut untuk memasang dependensi:

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

Jika port 3000 sedang digunakan, Next.js dapat menjalankan aplikasi pada port lain. Gunakan alamat yang ditampilkan di terminal.

## Pengujian

Pengujian awal yang dilakukan meliputi:

- Navigasi antara Dashboard, Transaksi, dan Tujuan Keuangan.
- Validasi formulir ketika nama atau deskripsi kosong dan ketika target atau jumlah dana tidak valid.
- Penambahan transaksi dan tujuan keuangan menggunakan data simulasi.
- Pemeriksaan tampilan pada mobile, tablet, dan desktop.
- Audit Lighthouse Accessibility pada masing-masing halaman.

Skor Lighthouse Accessibility yang diperoleh setelah perbaikan adalah **100/100 pada Dashboard, Transaksi, dan Tujuan Keuangan**. Hasil ini merupakan hasil pengujian pada lingkungan pengembangan saat audit dilakukan.

## Batasan Versi Saat Ini

Versi ini masih menggunakan data simulasi yang disimpan sementara pada state halaman. Data transaksi dan tujuan baru belum disimpan secara permanen, belum menggunakan backend atau database, dan belum memiliki autentikasi pengguna.

Fitur keamanan lanjutan, pencatatan aktivitas yang dapat diverifikasi, serta integrasi komponen kriptografi akan dikembangkan pada tahapan proyek berikutnya.

## Konsep Pengembangan Selanjutnya

KasVault dirancang untuk dikembangkan menjadi aplikasi pengelolaan keuangan organisasi yang memiliki transparansi berdasarkan peran pengguna dan riwayat transaksi yang integritasnya dapat diperiksa.

**Slogan:** Kas Terjaga, Organisasi Terpercaya.
