# Dokumen Teknis Modul 4: Next.js App Router

**Nama:** Wisnu Bimantoro
**NIM:** 105224045
**Program Studi:** Ilmu Komputer
**Repository:** [KasVault](https://github.com/wsnubmntr/KasVault)
**Branch Praktikum:** `praktikum/modul-04`
**Versi Next.js:** 16.4.0

## 1. Peta Rute

### 1.1 Daftar Rute

Pada Modul 4, aplikasi KasVault dikembangkan menggunakan Next.js App Router. Sistem routing ini menggunakan struktur folder dan file di dalam direktori `src/app` untuk menentukan URL dan halaman yang ditampilkan.

Berikut adalah daftar rute yang digunakan pada aplikasi KasVault.

| URL | File | Jenis Rute | Fungsi |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Statis | Menampilkan dashboard KasVault. |
| `/transaksi` | `src/app/transaksi/page.tsx` | Statis | Menampilkan daftar dan formulir pencatatan transaksi. |
| `/transaksi/[id]` | `src/app/transaksi/[id]/page.tsx` | Dinamis | Menampilkan detail transaksi berdasarkan ID. |
| `/tujuan` | `src/app/tujuan/page.tsx` | Statis | Menampilkan halaman tujuan keuangan. |
| `/tentang` | `src/app/tentang/page.tsx` | Statis | Menampilkan informasi mengenai aplikasi KasVault. |

Selain halaman tersebut, aplikasi juga memiliki halaman khusus untuk menangani URL yang tidak ditemukan melalui `src/app/not-found.tsx`.

### 1.2 Struktur Folder

Struktur folder yang berkaitan dengan implementasi Modul 4 adalah sebagai berikut.

```text
KasVault/
â”œâ”€â”€ lib/
â”‚   â””â”€â”€ data.ts
â”œâ”€â”€ src/
â”‚   â””â”€â”€ app/
â”‚       â”œâ”€â”€ components/
â”‚       â”‚   â””â”€â”€ AppNavigation.tsx
â”‚       â”œâ”€â”€ transaksi/
â”‚       â”‚   â”œâ”€â”€ [id]/
â”‚       â”‚   â”‚   â””â”€â”€ page.tsx
â”‚       â”‚   â”œâ”€â”€ error.tsx
â”‚       â”‚   â”œâ”€â”€ layout.tsx
â”‚       â”‚   â”œâ”€â”€ loading.tsx
â”‚       â”‚   â”œâ”€â”€ page.tsx
â”‚       â”‚   â””â”€â”€ template.tsx
â”‚       â”œâ”€â”€ tentang/
â”‚       â”‚   â””â”€â”€ page.tsx
â”‚       â”œâ”€â”€ tujuan/
â”‚       â”‚   â””â”€â”€ page.tsx
â”‚       â”œâ”€â”€ favicon.ico
â”‚       â”œâ”€â”€ globals.css
â”‚       â”œâ”€â”€ layout.tsx
â”‚       â”œâ”€â”€ not-found.tsx
â”‚       â””â”€â”€ page.tsx
â”œâ”€â”€ docs/
â”‚   â””â”€â”€ praktikum/
â”‚       â””â”€â”€ modul-04.md
â”œâ”€â”€ package.json
â”œâ”€â”€ package-lock.json
â”œâ”€â”€ next.config.ts
â””â”€â”€ tsconfig.json
```

Struktur tersebut menggambarkan file-file yang berkaitan dengan implementasi Modul 4. File konfigurasi lain yang tidak ditampilkan tetap berada di dalam repository.

### 1.3 Hasil Production Build

Pengujian production build dilakukan menggunakan perintah berikut.

```bash
npm run build
```

Berdasarkan hasil pengujian, proses kompilasi berhasil, pemeriksaan TypeScript selesai, dan halaman berhasil dibuat. Next.js juga menampilkan daftar route yang dikenali dalam aplikasi.

Ringkasan hasil build adalah sebagai berikut.

```text
Route (app)
â”Œ â—‹ /
â”œ â—‹ /_not-found
â”œ â—‹ /tentang
â”œ â—‹ /transaksi
â”œ   /transaksi/[id]
â”‚ â”” â— /transaksi/[id]
â”” â—‹ /tujuan
```

Keterangan simbol pada hasil build:

- `â—‹ (Static)` menunjukkan halaman yang dipratampilkan sebagai konten statis.
- `â— (Partial Prerender)` menunjukkan halaman yang menggunakan HTML statis dengan bagian konten dinamis yang dikirim melalui streaming.

Pada proyek ini, Cache Components dan Partial Prefetching tetap diaktifkan sesuai konfigurasi `next.config.ts`.

## 2. Layout, Template, dan Berkas Khusus

### 2.1 Penggunaan `layout.tsx`

File `src/app/layout.tsx` berfungsi sebagai root layout yang membungkus halaman-halaman aplikasi. File ini menjadi tempat pengaturan struktur utama aplikasi dan metadata.

Pada folder transaksi terdapat `src/app/transaksi/layout.tsx`, yang digunakan untuk membungkus halaman di dalam segmen transaksi.

Contoh implementasi layout transaksi:

```tsx
import type { ReactNode } from "react";

export default function TransaksiLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="min-h-screen">
      {children}
    </section>
  );
}
```

Properti `children` berisi halaman atau konten yang ditampilkan di dalam layout. Penggunaan layout membantu menjaga struktur pembungkus halaman agar tetap konsisten.

Secara konsep, layout dipertahankan ketika navigasi berlangsung di dalam segmen yang sama. Pengujian langsung untuk membuktikan persistensi state layout perlu dicatat setelah demonstrasi dilakukan.

### 2.2 Penggunaan `template.tsx`

File `src/app/transaksi/template.tsx` digunakan sebagai pembungkus halaman transaksi yang memiliki perilaku berbeda dari layout.

Implementasinya adalah sebagai berikut.

```tsx
import type { ReactNode } from "react";

export default function TransaksiTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="block">{children}</div>;
}
```

Secara konsep, template membuat instance baru ketika navigasi yang sesuai menyebabkan template dipasang ulang. Perilaku ini dapat digunakan ketika komponen perlu mengulang state atau menjalankan kembali efek tertentu.

Implementasi Layout dan Template telah diuji menggunakan counter sementara. Hasil pengujian menunjukkan bahwa state pada Layout tetap dipertahankan ketika berpindah dari Dashboard ke Transaksi, sedangkan state pada Template diinisialisasi ulang ketika kembali ke halaman Transaksi. Komponen counter yang digunakan untuk pengujian telah dihapus setelah pengujian selesai.

### 2.3 Penggunaan `loading.tsx`

File `src/app/transaksi/loading.tsx` digunakan untuk menyediakan tampilan sementara saat konten halaman transaksi sedang dimuat.

Tampilannya menggunakan elemen skeleton dengan animasi `animate-pulse`, sehingga pengguna memperoleh indikator bahwa halaman sedang diproses.

File ini juga menggunakan atribut `role="status"` dan `aria-label` untuk membantu menjelaskan status pemuatan kepada teknologi bantu.

Pengujian awal menunjukkan bahwa fallback `Suspense` pada halaman uji sementara dapat muncul ketika konten menunggu selama lima detik. Namun, pengujian tersebut bukan bukti bahwa `loading.tsx` pada segmen transaksi selalu tampil dalam semua kondisi.

Tampilan `loading.tsx` perlu diperiksa secara langsung pada kondisi navigasi yang sesuai, termasuk memperhatikan perilaku prefetching dan Cache Components.

### 2.4 Penggunaan `error.tsx`

File `src/app/transaksi/error.tsx` digunakan untuk menangani error yang terjadi pada segmen transaksi dan komponen turunannya yang berada dalam cakupan error boundary tersebut.

Karena menggunakan hook React, file ini diawali dengan direktif `"use client"`.

Komponen menerima dua properti utama:

- `error`: berisi informasi error yang terjadi.
- `reset`: fungsi untuk mencoba merender kembali bagian halaman yang mengalami error.

Ketika terjadi error, halaman menampilkan pesan **Terjadi Kesalahan**, penjelasan singkat, dan tombol **Coba Lagi**. Informasi error juga dicatat melalui `console.error` menggunakan `useEffect`.

Pengujian dilakukan dengan membuat halaman uji sementara pada `/transaksi/uji-error` dan memicu error secara sengaja. Hasilnya, halaman error boundary KasVault tampil di browser dengan pesan dan tombol pemulihan.

Perlu diperhatikan bahwa error boundary pada suatu segmen tidak menangkap error dari layout segmen yang sama. Error pada layout tersebut perlu ditangani oleh error boundary di segmen induknya.

### 2.5 Penggunaan `not-found.tsx`

File `src/app/not-found.tsx` digunakan untuk menampilkan halaman khusus ketika URL tidak ditemukan atau fungsi `notFound()` dipanggil.

Pada aplikasi KasVault, halaman ini menampilkan pesan **Halaman Tidak Ditemukan** dan tautan **Kembali ke Dashboard**.

Implementasi ini digunakan untuk memberikan informasi yang lebih jelas ketika pengguna membuka halaman yang tidak tersedia.

Pengujian yang telah dilakukan menunjukkan bahwa halaman khusus 404 tampil untuk URL yang tidak dikenal, seperti `/halaman-tidak-ada`, serta ID transaksi yang tidak valid atau tidak ditemukan, seperti `/transaksi/ABC001` dan `/transaksi/TRX999`.

## 3. Dynamic Route dan Validasi Parameter

### 3.1 Implementasi Dynamic Route

Dynamic route digunakan ketika halaman membutuhkan parameter yang nilainya berbeda untuk setiap data.

Pada KasVault, dynamic route dibuat melalui file:

```text
src/app/transaksi/[id]/page.tsx
```

Folder `[id]` menunjukkan bahwa bagian URL tersebut merupakan parameter dinamis. Contohnya, `/transaksi/TRX001` dan `/transaksi/TRX002` menggunakan halaman yang sama, tetapi menampilkan data transaksi yang berbeda.

Halaman detail transaksi menggunakan data dari `lib/data.ts` dan fungsi `getTransactionById()` untuk mencari transaksi berdasarkan ID.

### 3.2 Validasi `params`

Pada Next.js 16, parameter rute diterima sebagai Promise dan perlu ditunggu menggunakan `await`.

Secara garis besar, implementasi halaman detail menggunakan pola berikut.

```tsx
const { id } = await params;
```

Parameter ID kemudian diperiksa menggunakan pola:

```tsx
/^TRX\d{3}$/
```

Pola tersebut menerima ID dengan format `TRX` diikuti tiga angka, misalnya `TRX001`.

Jika format ID tidak sesuai atau data transaksi tidak ditemukan, halaman memanggil `notFound()` agar pengguna diarahkan ke halaman tidak ditemukan.

Validasi ini membantu memastikan bahwa halaman detail hanya menampilkan transaksi yang tersedia dalam sumber data aplikasi.

### 3.3 Tabel Hasil Pengujian URL

Berikut adalah ringkasan pengujian melalui browser.

| URL | Hasil yang Diharapkan | Hasil Pengamatan |
|---|---|---|
| `/transaksi/TRX001` | Detail transaksi tampil | Detail Iuran anggota Oktober tampil. |
| `/transaksi/TRX002` | Detail transaksi tampil | Detail Dana sponsor kegiatan tampil. |
| `/transaksi/ABC001` | Halaman tidak ditemukan | Halaman khusus 404 tampil. |
| `/transaksi/TRX999` | Halaman tidak ditemukan | Halaman khusus 404 tampil. |
| `/halaman-tidak-ada` | Halaman tidak ditemukan | Halaman khusus 404 tampil. |

Pengujian tersebut memeriksa perilaku halaman melalui browser. Pada aplikasi dengan streaming, kode status HTTP yang terlihat dari `curl` dapat berbeda dari tampilan akhir yang diterima pengguna. Karena itu, kode status HTTP perlu dicatat dari hasil pengujian tersendiri dan tidak disimpulkan hanya dari tampilan browser.

## 4. Server Components dan Client Components

### 4.1 Pembagian Komponen

Next.js App Router menggunakan Server Components sebagai pendekatan default untuk komponen yang tidak memerlukan fitur khusus di sisi browser. Client Components digunakan ketika komponen membutuhkan interaktivitas atau hook React tertentu.

Pembagian komponen yang diterapkan pada KasVault adalah sebagai berikut.

| File | Jenis Komponen | Alasan |
|---|---|---|
| `src/app/page.tsx` | Server Component | Halaman dashboard tidak memerlukan hook interaktif pada level komponen halaman. |
| `src/app/transaksi/page.tsx` | Client Component | Menggunakan `useState` untuk mengelola formulir dan daftar transaksi. |
| `src/app/transaksi/[id]/page.tsx` | Server Component | Mengambil parameter rute dan mencari data transaksi pada sisi server. |
| `src/app/components/AppNavigation.tsx` | Client Component | Menggunakan `usePathname` untuk menentukan navigasi yang sedang aktif. |
| `src/app/tentang/page.tsx` | Server Component | Menampilkan informasi statis mengenai aplikasi. |
| `src/app/transaksi/error.tsx` | Client Component | Menggunakan `useEffect` serta fungsi `reset` untuk pemulihan error. |

Penggunaan Client Components dibatasi pada bagian yang membutuhkan interaktivitas. Pendekatan ini membantu memisahkan komponen interaktif dengan komponen yang dapat dirender di sisi server.

### 4.2 Penggunaan `server-only`

File `lib/data.ts` menyimpan tipe data transaksi, daftar transaksi awal, dan fungsi pencarian transaksi berdasarkan ID.

Di bagian awal file terdapat:

```tsx
import "server-only";
```

Paket `server-only` digunakan untuk membantu mencegah modul tersebut diimpor secara tidak sengaja ke dalam Client Components.

Pada KasVault, pendekatan ini diterapkan karena data transaksi digunakan oleh halaman detail yang berupa Server Component.

### 4.3 Hasil Pengujian `server-only`

Implementasi `server-only` sudah ditambahkan pada `lib/data.ts`. Namun, pengujian khusus berupa impor modul tersebut dari Client Component untuk memastikan munculnya error build belum dicatat sebagai pengujian yang selesai.

Pengujian tersebut perlu dilakukan secara terkontrol apabila dibutuhkan oleh instruksi modul. Hasilnya harus dicatat berdasarkan pesan error yang benar-benar muncul, lalu kode uji sementara dihapus agar tidak merusak aplikasi.

## 5. Verifikasi Aplikasi

### 5.1 Pemeriksaan TypeScript

Perintah yang digunakan:

```bash
npx tsc --noEmit
```

Hasil pengujian: **berhasil tanpa error** pada pemeriksaan terakhir.

Perintah ini memeriksa kesesuaian tipe TypeScript tanpa menghasilkan file JavaScript baru.

### 5.2 Pemeriksaan ESLint

Perintah yang digunakan:

```bash
npm run lint
```

Hasil pengujian: **berhasil**.

Pemeriksaan ini digunakan untuk membantu menemukan masalah pada kode berdasarkan aturan lint yang dikonfigurasi dalam proyek.

### 5.3 Production Build

Perintah yang digunakan:

```bash
npm run build
```

Hasil pengujian: **berhasil**.

Proses kompilasi, pemeriksaan TypeScript, pengumpulan data halaman, dan pembuatan halaman selesai tanpa error. Daftar route yang dihasilkan juga mencakup dashboard, transaksi, detail transaksi dinamis, tujuan keuangan, tentang, dan halaman not-found.

### 5.4 Ringkasan Verifikasi

Berdasarkan pengujian yang telah dilakukan, fitur-fitur pada Modul 4 telah diperiksa melalui terminal dan browser. Hasil verifikasi dirangkum dalam tabel berikut.

| No. | Aspek yang Diuji | Hasil | Keterangan |
|---|---|---|---|
| 1 | TypeScript | Berhasil | Pemeriksaan menggunakan `npx tsc --noEmit` berjalan tanpa error. |
| 2 | ESLint | Berhasil | Pemeriksaan menggunakan `npm run lint` berjalan tanpa error. |
| 3 | Production Build | Berhasil | Proses `npm run build` selesai tanpa error. |
| 4 | Dynamic Route | Berhasil | Halaman detail transaksi dapat diakses menggunakan ID transaksi, seperti `/transaksi/TRX001` dan `/transaksi/TRX002`. |
| 5 | Not Found | Berhasil | ID transaksi yang tidak ditemukan, format ID yang tidak valid, dan URL yang tidak tersedia menampilkan halaman 404 khusus. |
| 6 | Error Boundary | Berhasil | Komponen `error.tsx` berhasil menampilkan halaman penanganan kesalahan saat diuji menggunakan halaman yang sengaja menghasilkan error. |
| 7 | Loading dan Suspense | Berhasil sebagian | Fallback pada Suspense berhasil ditampilkan saat pengujian dengan proses yang diberi jeda. Namun, perilaku `loading.tsx` pada navigasi normal masih perlu diperiksa lebih lanjut. |
| 8 | Layout dan Template | Berhasil | Pengujian menggunakan counter menunjukkan bahwa state pada Layout tetap dipertahankan saat berpindah dari Dashboard ke Transaksi, sedangkan state pada Template diinisialisasi ulang. |

Secara keseluruhan, implementasi Modul 4 telah melewati pemeriksaan TypeScript, ESLint, dan production build. Fitur routing, dynamic route, halaman Not Found, error boundary, serta perbedaan perilaku Layout dan Template juga telah diuji. Pengujian lebih lanjut masih diperlukan untuk memastikan perilaku `loading.tsx` pada navigasi normal.


## 6. Catatan Pemanfaatan AI

Dalam pengerjaan Praktikum Modul 4, saya menggunakan ChatGPT sebagai alat bantu untuk mencari referensi dan memahami materi Next.js App Router yang terdapat pada modul praktikum. AI membantu saya memahami fungsi beberapa fitur, seperti routing, dynamic route, `layout.tsx`, `template.tsx`, `loading.tsx`, `error.tsx`, dan `not-found.tsx`, serta kapan fitur-fitur tersebut digunakan.

Saya juga menggunakan AI untuk membantu memahami fungsi tools dan perintah yang digunakan selama praktikum, seperti `npx tsc --noEmit` untuk memeriksa kesalahan TypeScript, `npm run lint` untuk memeriksa kualitas kode, dan `npm run build` untuk memastikan aplikasi dapat dibangun untuk produksi. Selain itu, AI membantu menjelaskan alur penggunaan Git dan GitHub, seperti commit, push, dan Pull Request.

Ketika menemukan error atau hasil pengujian yang belum sesuai harapan, saya menggunakan AI untuk membantu mencari penyebab dan alternatif solusinya. Saya kemudian mencoba solusi tersebut pada proyek KasVault dan memeriksa hasilnya melalui terminal maupun browser. AI juga membantu saya menyusun dokumentasi agar penjelasan implementasi dan hasil pengujian lebih mudah dipahami.

Penggunaan AI dalam praktikum ini bertujuan untuk membantu proses belajar, mencari referensi, dan memahami fungsi fitur maupun tools yang digunakan. Kode dan solusi yang disarankan AI tetap saya periksa dan uji kembali agar sesuai dengan kondisi proyek serta instruksi pada modul praktikum.
