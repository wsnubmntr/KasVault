# Dokumentasi Pengujian KasVault - Milestone 2

## 1. Tujuan Pengujian

Pengujian dilakukan untuk memastikan fitur pengelolaan data Kas dan Transaksi berjalan sesuai kebutuhan, data tersimpan secara persisten pada PostgreSQL, relasi antardata berjalan dengan benar, serta input tidak valid ditolak oleh validasi server.

## 2. Lingkungan Pengujian

| Komponen | Teknologi |
|---|---|
| Framework | Next.js 16 |
| Bahasa | TypeScript |
| ORM | Prisma ORM 7 |
| Database | PostgreSQL 18 |
| Validasi | Zod 4 |
| Browser | Google Chrome |
| Metode | Pengujian fungsional melalui antarmuka aplikasi |

Data yang digunakan merupakan data sintetis untuk keperluan pengujian.

## 3. Skenario Pengujian Fungsional

Pengujian terdiri dari minimal 10 skenario, yaitu 8 skenario CRUD dan 2 skenario relasi data.

### 3.1 Pengujian CRUD Kas

| ID | Skenario | Langkah Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|
| WEB-01 | Create Kas | Mengisi formulir Kas dengan data valid dan menyimpan data. | Data Kas berhasil disimpan ke PostgreSQL dan tampil pada daftar Kas. | Data Kas berhasil ditambahkan dan tampil pada halaman Kas. | PASS |
| WEB-02 | Read Kas | Membuka halaman Kas. | Daftar Kas ditampilkan beserta informasi saldo dan jumlah transaksi. | Data Kas tampil pada halaman Kas. | PASS |
| WEB-03 | Update Kas | Mengubah informasi Kas melalui fitur edit. | Perubahan data tersimpan dan ditampilkan kembali. | Perubahan saldo Kas berhasil ditampilkan. | PASS |
| WEB-04 | Delete Kas | Menghapus Kas yang tidak memiliki transaksi. | Data Kas berhasil dihapus dari database. | Kas Organisasi November berhasil dihapus dan tidak tampil lagi pada daftar. | PASS |

### 3.2 Pengujian CRUD Transaksi

| ID | Skenario | Langkah Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|
| WEB-05 | Create Transaksi | Mengisi formulir transaksi dengan data valid. | Transaksi berhasil disimpan dan tampil pada daftar transaksi. | Transaksi pengujian berhasil ditambahkan. | PASS |
| WEB-06 | Read Transaksi | Membuka halaman transaksi. | Daftar transaksi ditampilkan dengan informasi yang sesuai. | Data transaksi berhasil ditampilkan. | PASS |
| WEB-07 | Update Transaksi | Mengubah deskripsi, jumlah, jenis, dan kategori transaksi. | Perubahan transaksi tersimpan dan tampil pada daftar. | Data transaksi berhasil diperbarui. | PASS |
| WEB-08 | Delete Transaksi | Menghapus transaksi pengujian. | Transaksi terhapus dari database dan daftar diperbarui. | Transaksi pengujian berhasil dihapus. | PASS |

### 3.3 Pengujian Relasi Data

| ID | Skenario | Langkah Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|
| WEB-09 | Relasi Transaksi dengan Kas | Membuka halaman detail transaksi. | Detail transaksi menampilkan Kas yang berhubungan melalui foreign key `kasId`. | Halaman detail menampilkan informasi Kas terkait transaksi. | PASS |
| WEB-10 | Jumlah Transaksi pada Kas | Membuka halaman daftar Kas dan memeriksa jumlah transaksi masing-masing Kas. | Sistem menampilkan jumlah transaksi yang terhubung dengan setiap Kas. | Jumlah transaksi ditampilkan melalui relasi `_count.transaksi`. | PASS |

## 4. Pengujian Validasi Input Tidak Valid

Pengujian ini dilakukan untuk memastikan Server Action menolak input yang tidak sesuai dengan aturan Zod.

| ID | Skenario | Input | Hasil yang Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|
| VAL-01 | Nama Kas kosong | Nama tidak diisi. | Data ditolak dengan pesan nama Kas minimal 3 karakter. | Pesan validasi nama Kas minimal 3 karakter ditampilkan. | PASS |
| VAL-02 | Saldo awal negatif | -1000 | Data ditolak karena saldo awal tidak boleh negatif. | Pesan saldo awal tidak boleh negatif ditampilkan. | PASS |
| VAL-03 | Jumlah transaksi nol | 0 | Data ditolak karena jumlah harus lebih dari Rp0. | Pesan jumlah harus lebih dari Rp0 ditampilkan. | PASS |
| VAL-04 | Jumlah transaksi melebihi batas | 100000001 | Data ditolak karena melebihi batas Rp100.000.000. | Pesan jumlah maksimal Rp100.000.000 ditampilkan. | PASS |
| VAL-05 | Nama transaksi terlalu pendek | A | Data ditolak karena nama transaksi minimal 3 karakter. | Pesan nama transaksi minimal 3 karakter ditampilkan. | PASS |
| VAL-06 | Update transaksi dengan jumlah nol | 0 | Perubahan ditolak dan data sebelumnya tetap tersimpan. | Pesan validasi jumlah ditampilkan dan data sebelumnya tidak berubah. | PASS |
| VAL-07 | Update Kas dengan saldo negatif | -1000 | Perubahan ditolak dan saldo sebelumnya tetap tersimpan. | Pesan saldo awal tidak boleh negatif ditampilkan. | PASS |

## 5. Pengujian Batasan Relasi

| ID | Skenario | Hasil yang Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|
| REL-01 | Menghapus Kas yang masih memiliki transaksi | Sistem menolak penghapusan Kas dan mempertahankan transaksi terkait. | Pesan Kas tidak dapat dihapus karena masih memiliki transaksi ditampilkan. Data tetap tersimpan. | PASS |

## 6. Ringkasan Hasil Pengujian

| Kelompok | Jumlah Skenario | Hasil |
|---|---:|---|
| CRUD Kas dan Transaksi | 8 | 8 PASS |
| Relasi Data | 2 | 2 PASS |
| Validasi Input | 7 | 7 PASS |
| Batasan Relasi | 1 | 1 PASS |
| Total | 18 | 18 PASS |

Persentase keberhasilan berdasarkan skenario yang tercatat adalah 100%.

Catatan: hasil di atas berdasarkan pengujian yang telah dilakukan dan dicatat selama pengembangan. Bukti screenshot harus disimpan pada folder evidence sebelum dokumen dikumpulkan.

## 7. Bukti Pengujian

Bukti pengujian yang perlu dilampirkan:

| ID Bukti | Keterangan |
|---|---|
| WEB-01 | Create Kas berhasil |
| WEB-02 | Daftar Kas |
| WEB-03 | Update Kas berhasil |
| WEB-04 | Delete Kas berhasil |
| WEB-05 | Create Transaksi berhasil |
| WEB-06 | Daftar Transaksi |
| WEB-07 | Update Transaksi berhasil |
| WEB-08 | Delete Transaksi berhasil |
| WEB-09 | Detail transaksi beserta Kas terkait |
| WEB-10 | Jumlah transaksi pada masing-masing Kas |
| VAL-01 | Nama Kas kosong ditolak |
| VAL-02 | Saldo awal negatif ditolak |
| VAL-03 | Jumlah transaksi nol ditolak |
| REL-01 | Penghapusan Kas dengan transaksi ditolak |
| DB-01 | Bukti data pada PostgreSQL |

## 8. Kesimpulan

Berdasarkan skenario pengujian yang telah dilakukan, fitur CRUD Kas dan Transaksi dapat digunakan untuk mengelola data pada database PostgreSQL. Relasi antara Kas dan Transaksi juga dapat ditampilkan melalui halaman aplikasi.

Validasi menggunakan Zod pada sisi server dapat menolak beberapa masukan yang tidak sesuai dengan aturan aplikasi. Penghapusan Kas yang masih memiliki transaksi juga ditolak untuk menjaga konsistensi relasi data.

Pengujian ini menjadi dasar evaluasi fungsional KasVault pada Milestone 2.
