# Security Controls Plan — KasVault

## 1. Tujuan

Dokumen ini menjelaskan rencana kontrol keamanan untuk menangani lima risiko prioritas yang tercantum dalam `risk-assessment.md`. Kontrol disusun untuk mengurangi kemungkinan serangan, mendeteksi aktivitas mencurigakan, dan membantu pemulihan jika terjadi insiden.

Kontrol berikut merupakan rencana. Status implementasi harus diperbarui setelah fitur terkait benar-benar dibuat dan diuji.

## 2. Rencana Kontrol Berdasarkan Risiko Prioritas

### 2.1 S-01 — Pengambilalihan Akun Bendahara

**Risiko:** pihak tidak berwenang mengambil alih akun bendahara dan melakukan tindakan terhadap data keuangan.

- **Pencegahan:** gunakan password hashing yang sesuai, validasi kredensial di server, cookie sesi dengan pengaturan keamanan yang tepat, serta pembatasan percobaan login.
- **Deteksi:** catat kegagalan login dan pantau percobaan login berulang tanpa menyimpan kata sandi atau token.
- **Pemulihan:** sediakan mekanisme penggantian kata sandi, pencabutan sesi aktif, dan peninjauan aktivitas akun.
- **Pengujian:** login dengan kata sandi salah harus ditolak; percobaan berulang harus dibatasi sesuai kebijakan yang ditentukan.
- **Prioritas:** sangat tinggi.

### 2.2 T-01 — Perubahan Nominal Transaksi Tanpa Izin

**Risiko:** nominal transaksi diubah tanpa hak sehingga saldo dan laporan tidak akurat.

- **Pencegahan:** validasi nominal di server, periksa hak pengguna sebelum mengubah transaksi, dan gunakan operasi database yang aman.
- **Deteksi:** catat perubahan nominal, identitas akun pelaku, waktu, dan identitas transaksi.
- **Pemulihan:** tinjau riwayat perubahan dan pulihkan nilai transaksi yang benar berdasarkan bukti yang tersedia.
- **Pengujian:** perubahan oleh pengguna tanpa izin harus ditolak; input nominal yang tidak valid juga harus ditolak.
- **Prioritas:** sangat tinggi.

### 2.3 E-01 — Anggota Memperoleh Hak Bendahara

**Risiko:** anggota menjalankan fungsi yang seharusnya hanya dapat dilakukan bendahara.

- **Pencegahan:** terapkan role-based access control dan lakukan pemeriksaan hak akses di server pada setiap operasi sensitif.
- **Deteksi:** catat upaya akses yang ditolak terhadap fungsi pengelolaan transaksi.
- **Pemulihan:** cabut sesi yang disalahgunakan, periksa perubahan data, dan koreksi hak akses akun jika diperlukan.
- **Pengujian:** akun anggota harus ditolak ketika mencoba menambah, mengubah, atau menghapus transaksi.

### 2.4 I-02 — Kebocoran Kata Sandi atau Secrets

**Risiko:** kredensial atau konfigurasi rahasia terekspos sehingga akun atau layanan dapat disalahgunakan.

- **Pencegahan:** jangan menyimpan kata sandi sebagai teks biasa, gunakan password hashing yang sesuai, simpan secrets di luar source code, dan kecualikan file environment lokal melalui `.gitignore`.
- **Deteksi:** periksa perubahan yang akan di-commit dan gunakan pemeriksaan secrets jika tersedia.
- **Pemulihan:** cabut atau rotasi secrets yang terpapar, ganti kredensial terkait, dan tinjau riwayat repository.
- **Pengujian:** periksa repository untuk memastikan tidak ada secrets aktif atau kata sandi asli yang tersimpan.

### 2.5 E-02 — Akses Langsung ke Fungsi Administratif

**Risiko:** pengguna memanggil endpoint sensitif secara langsung tanpa memiliki hak yang diperlukan.

- **Pencegahan:** periksa autentikasi dan otorisasi di server pada setiap endpoint sensitif. Jangan hanya menyembunyikan tombol di antarmuka.
- **Deteksi:** catat permintaan yang ditolak dan pantau pola akses yang tidak wajar.
- **Pemulihan:** perbaiki aturan akses, tinjau aktivitas terkait, dan koreksi perubahan tidak sah jika ditemukan.
- **Pengujian:** permintaan langsung dari akun tanpa izin harus ditolak, meskipun tombol fungsi tersebut tidak ditampilkan di antarmuka.

## 3. Kontrol Umum

| Area | Kontrol | Tujuan |
|---|---|---|
| Autentikasi | Password hashing dan validasi login di server | Mengurangi risiko pengambilalihan akun |
| Otorisasi | Hak akses berbasis peran dan pemeriksaan server | Mencegah akses tanpa izin |
| Validasi | Pemeriksaan tipe, format, rentang nominal, dan data wajib | Mengurangi input tidak valid |
| Komunikasi | HTTPS ketika aplikasi di-deploy | Melindungi data selama transmisi |
| Penyimpanan | Pembatasan akses database dan backup | Melindungi data keuangan |
| Logging | Pencatatan aktivitas penting tanpa secrets | Mendukung deteksi dan penelusuran |
| Repository | `.gitignore` dan pemeriksaan perubahan sebelum commit | Mengurangi risiko kebocoran secrets |
| Pemulihan | Backup dan prosedur koreksi data | Membantu pemulihan setelah insiden |

## 4. Tahapan Implementasi

### Tahap 1 — Fondasi
- Tentukan peran pengguna dan aturan akses.
- Tentukan data yang perlu dilindungi.
- Tetapkan format validasi transaksi.
- Pastikan secrets tidak ditulis langsung dalam source code.

### Tahap 2 — Implementasi
- Terapkan autentikasi dan otorisasi di server.
- Terapkan password hashing dan HTTPS pada lingkungan yang sesuai.
- Tambahkan validasi input serta logging aktivitas penting.
- Atur backup jika database sudah digunakan.

### Tahap 3 — Pengujian
- Uji login dengan kredensial valid dan tidak valid.
- Uji pembatasan akses antara bendahara dan anggota.
- Uji validasi nominal transaksi.
- Periksa bahwa secrets tidak masuk ke repository.
- Uji pemulihan data sesuai mekanisme backup yang benar-benar tersedia.

## 5. Status Implementasi

| Kontrol | Status awal | Bukti yang dibutuhkan |
|---|---|---|
| Password hashing | Belum diverifikasi | Implementasi dan hasil pengujian |
| Pemeriksaan hak akses server | Belum diverifikasi | Kode dan pengujian antarperan |
| Validasi transaksi di server | Belum diverifikasi | Kode dan hasil pengujian input |
| HTTPS deployment | Belum diverifikasi | URL deployment dan konfigurasi |
| Audit log | Belum diverifikasi | Contoh log tanpa data sensitif |
| Backup | Belum diverifikasi | Prosedur dan bukti uji pemulihan |
| Pemeriksaan secrets | Belum diverifikasi | Hasil pemeriksaan repository |

## 6. Kesimpulan

Kontrol keamanan KasVault difokuskan pada perlindungan akun bendahara, integritas transaksi, pembatasan hak akses, pencegahan kebocoran secrets, dan pengamanan endpoint sensitif. Kontrol harus diterapkan pada komponen sistem yang sesuai dan diuji sebelum dinyatakan berhasil.

Dokumen ini merupakan rencana mitigasi awal. Status setiap kontrol harus diperbarui berdasarkan implementasi dan bukti pengujian yang nyata.