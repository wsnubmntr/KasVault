# Latihan 1 — Inventaris Aset KasVault

## 1. Deskripsi Produk

KasVault adalah aplikasi web pengelolaan keuangan untuk kelas dan organisasi mahasiswa. Aplikasi ini dirancang untuk membantu bendahara mencatat pemasukan dan pengeluaran, memantau pembayaran iuran anggota, serta menyediakan ringkasan keuangan yang dapat diakses sesuai hak pengguna.

Pada tahap rancangan ini, KasVault menggunakan data contoh atau mock data. Backend, database, dan autentikasi belum dianggap tersedia sebelum benar-benar diimplementasikan.

## 2. Inventaris Aset

Klasifikasi menggunakan tiga aspek:

- **Kerahasiaan (C):** seberapa penting data agar tidak dibaca pihak yang tidak berwenang.
- **Integritas (I):** seberapa penting data agar tidak diubah tanpa izin.
- **Ketersediaan (A):** seberapa penting aset agar tetap dapat digunakan ketika dibutuhkan.

Skala: Tinggi, Sedang, dan Rendah.

| No. | Aset | Klasifikasi C/I/A | Alasan |
|---|---|---|---|
| 1 | Data transaksi pemasukan dan pengeluaran | Sedang/Tinggi/Tinggi | Data keuangan tidak boleh dibaca pihak yang tidak berhak, diubah sembarangan, atau hilang. |
| 2 | Data pembayaran iuran anggota | Sedang/Tinggi/Tinggi | Status pembayaran perlu dijaga agar tetap akurat dan dapat digunakan untuk memantau iuran. |
| 3 | Data akun pengguna | Tinggi/Tinggi/Tinggi | Data akun perlu dilindungi agar identitas dan akses pengguna tidak disalahgunakan. |
| 4 | Kata sandi pengguna | Tinggi/Tinggi/Tinggi | Kata sandi merupakan informasi autentikasi dan tidak boleh disimpan sebagai teks biasa. |
| 5 | Data saldo dan laporan keuangan | Sedang/Tinggi/Tinggi | Kesalahan atau perubahan tanpa izin dapat membuat laporan dan saldo tidak akurat. |
| 6 | Layanan aplikasi web | Sedang/Tinggi/Tinggi | Layanan harus berjalan dengan benar dan dapat digunakan oleh pengguna yang berhak. |
| 7 | Database aplikasi (rencana) | Tinggi/Tinggi/Tinggi | Database nantinya menyimpan data utama dan perlu dilindungi dari akses, perubahan, serta kehilangan. |
| 8 | Kunci kriptografi (jika enkripsi diterapkan) | Tinggi/Tinggi/Tinggi | Kunci yang bocor dapat membuat perlindungan data yang bergantung padanya tidak efektif. |
| 9 | Konfigurasi dan secrets server (jika backend diterapkan) | Tinggi/Tinggi/Tinggi | Informasi konfigurasi sensitif dapat membuka akses ke layanan atau database. |
| 10 | Backup database (jika sudah tersedia) | Tinggi/Tinggi/Tinggi | Backup dapat berisi salinan data keuangan dan dibutuhkan untuk pemulihan ketika terjadi kehilangan data. |
| 11 | Log aktivitas aplikasi (jika diterapkan) | Sedang/Tinggi/Sedang | Log membantu penelusuran aktivitas, tetapi harus dijaga dari perubahan dan tidak boleh menyimpan rahasia secara tidak perlu. |
| 12 | Akun bendahara | Tinggi/Tinggi/Tinggi | Akun ini memiliki hak untuk mengelola transaksi sehingga pengambilalihan akun dapat berdampak besar. |
| 13 | Akun anggota | Tinggi/Sedang/Sedang | Akun harus dilindungi agar informasi pengguna tidak disalahgunakan. |
| 14 | Source code dan konfigurasi proyek | Sedang/Tinggi/Tinggi | Source code perlu dijaga agar perubahan berbahaya dapat dicegah dan pengembangan dapat dilanjutkan. |

## 3. Catatan Kondisi Aset

Inventaris ini merupakan rancangan awal berdasarkan konsep KasVault, bukan hasil pemeriksaan sistem yang sudah beroperasi.

Aset yang ditandai “rencana” atau “jika diterapkan” belum tentu tersedia pada versi awal. Pada tahap antarmuka, data transaksi dapat berupa mock data. Database, backup, log server, kunci enkripsi, dan autentikasi harus diperbarui statusnya setelah implementasi dilakukan.

## 4. Rencana Perlindungan Kriptografi

1. Kata sandi direncanakan disimpan menggunakan algoritma password hashing yang sesuai, bukan sebagai teks biasa.
2. HTTPS digunakan untuk melindungi komunikasi antara pengguna dan server ketika aplikasi sudah di-deploy.
3. Enkripsi data tertentu dipertimbangkan apabila terdapat kebutuhan kerahasiaan yang jelas.
4. Kunci enkripsi dan secrets tidak boleh ditulis langsung ke source code atau diunggah ke repository.
5. Backup dan log perlu dilindungi sesuai tingkat sensitivitas data yang dikandungnya.

## 5. Kesimpulan

Aset penting KasVault mencakup data transaksi, pembayaran iuran, akun pengguna, kata sandi, laporan keuangan, layanan aplikasi, serta aset pendukung yang akan muncul ketika backend dikembangkan. Klasifikasi awal ini digunakan sebagai dasar untuk membuat diagram aliran data dan mengidentifikasi ancaman pada Tugas 1 Keamanan Komputasi dan Siber.