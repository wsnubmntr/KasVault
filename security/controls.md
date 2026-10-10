# Security Controls Plan — KasVault

## 1. Tujuan

Dokumen ini menjelaskan rencana kontrol keamanan untuk menangani lima risiko prioritas yang telah diidentifikasi dalam `risk-assessment.md`. Kontrol dirancang untuk mengurangi kemungkinan terjadinya serangan, mendeteksi aktivitas mencurigakan, dan membantu pemulihan apabila terjadi insiden keamanan.

KasVault merupakan aplikasi web untuk mengelola pemasukan, pengeluaran, pembayaran iuran, dan laporan keuangan kelas atau organisasi mahasiswa. Oleh karena itu, kontrol keamanan difokuskan pada perlindungan akun, integritas transaksi, pembatasan hak akses, kerahasiaan data, dan keamanan komponen aplikasi.

Kontrol dalam dokumen ini merupakan rencana mitigasi. Status implementasi harus diperbarui berdasarkan kode, konfigurasi, dan hasil pengujian yang benar-benar tersedia. Kontrol yang belum memiliki bukti implementasi tidak boleh dinyatakan sudah efektif.

## 2. Rencana Kontrol Berdasarkan Risiko Prioritas

### 2.1 S-01 — Pengambilalihan Akun Bendahara

**Risiko:** pihak yang tidak berwenang mengambil alih akun bendahara dan melakukan tindakan terhadap data keuangan KasVault.

**Pencegahan:**
- Gunakan algoritma password hashing yang sesuai untuk menyimpan kata sandi, bukan teks biasa.
- Lakukan validasi kredensial melalui mekanisme autentikasi di sisi server.
- Terapkan pembatasan percobaan login untuk mengurangi risiko percobaan kata sandi berulang.
- Gunakan pengelolaan sesi yang aman, termasuk pengaturan cookie yang sesuai apabila menggunakan cookie untuk sesi.
- Sediakan mekanisme penggantian kata sandi yang aman.

**Deteksi:**
- Catat kegagalan login dan percobaan login berulang.
- Pantau pola autentikasi yang tidak wajar apabila fasilitas pemantauan tersedia.
- Jangan mencatat kata sandi, token sesi, atau secrets ke dalam log.

**Pemulihan:**
- Cabut sesi aktif yang diduga telah disalahgunakan.
- Lakukan penggantian kata sandi akun yang terdampak.
- Periksa riwayat aktivitas dan transaksi akun untuk mengidentifikasi perubahan yang tidak sah.
- Pulihkan atau koreksi data berdasarkan bukti yang tersedia.

**Indikator pengujian:**
- Login menggunakan kredensial tidak valid harus ditolak.
- Percobaan login berulang harus dibatasi sesuai kebijakan yang ditetapkan.
- Sesi yang telah dicabut tidak boleh digunakan kembali.

**Prioritas:** Sangat tinggi.

### 2.2 T-01 — Perubahan Nominal Transaksi Tanpa Izin

**Risiko:** nominal pemasukan atau pengeluaran diubah tanpa hak sehingga saldo dan laporan keuangan menjadi tidak akurat.

**Pencegahan:**
- Validasi tipe, format, dan rentang nominal transaksi di sisi server.
- Periksa hak akses pengguna sebelum transaksi ditambahkan atau diubah.
- Gunakan operasi database yang aman apabila database telah diimplementasikan.
- Batasi perubahan transaksi hanya untuk pengguna yang memiliki kewenangan.
- Simpan riwayat perubahan transaksi jika fitur audit telah tersedia.

**Deteksi:**
- Catat perubahan nominal, identitas akun, waktu, dan identitas transaksi.
- Periksa perubahan yang tidak wajar atau tidak sesuai dengan kewenangan pengguna.
- Pastikan log tidak menyimpan kata sandi, token, atau secrets.

**Pemulihan:**
- Tinjau riwayat perubahan dan bukti transaksi yang tersedia.
- Pulihkan nominal yang benar berdasarkan catatan yang dapat dipercaya.
- Periksa kembali saldo dan laporan yang terdampak.
- Dokumentasikan perubahan korektif agar dapat ditelusuri.

**Indikator pengujian:**
- Pengguna tanpa hak yang sesuai tidak dapat mengubah nominal transaksi.
- Nominal dengan format atau nilai yang tidak valid harus ditolak.
- Perubahan transaksi yang sah dapat ditelusuri melalui catatan aktivitas apabila audit log sudah diterapkan.

**Prioritas:** Sangat tinggi.

### 2.3 E-01 — Anggota Memperoleh Hak Bendahara

**Risiko:** anggota menjalankan fungsi yang seharusnya hanya dapat digunakan oleh bendahara.

**Pencegahan:**
- Terapkan *Role-Based Access Control* (RBAC) untuk membedakan hak akses bendahara dan anggota.
- Periksa peran serta izin pengguna di sisi server untuk setiap operasi sensitif.
- Terapkan prinsip hak akses minimum, yaitu setiap pengguna hanya memperoleh izin yang dibutuhkan.
- Jangan hanya mengandalkan penyembunyian tombol atau menu pada antarmuka untuk membatasi akses.
- Pastikan perubahan peran hanya dapat dilakukan oleh pihak yang berwenang.

**Deteksi:**
- Catat upaya akses yang ditolak terhadap fungsi pengelolaan transaksi.
- Periksa pola percobaan akses yang tidak sesuai dengan peran pengguna.
- Tinjau perubahan peran akun apabila ditemukan aktivitas mencurigakan.

**Pemulihan:**
- Cabut sesi yang disalahgunakan jika diperlukan.
- Koreksi hak akses akun yang tidak sesuai.
- Periksa perubahan transaksi yang dilakukan selama penyalahgunaan.
- Pulihkan data yang berubah tanpa izin berdasarkan bukti yang tersedia.

**Indikator pengujian:**
- Akun anggota harus ditolak ketika mencoba menambahkan, mengubah, atau menghapus transaksi jika fungsi tersebut khusus untuk bendahara.
- Akun anggota tidak dapat menaikkan hak aksesnya sendiri.
- Pemeriksaan izin tetap berlaku meskipun permintaan dikirim langsung ke endpoint.

**Prioritas:** Sangat tinggi.

### 2.4 I-02 — Kebocoran Kata Sandi atau Secrets

**Risiko:** kata sandi, token, kunci, atau konfigurasi rahasia terekspos sehingga akun atau layanan dapat disalahgunakan.

**Pencegahan:**
- Jangan menyimpan kata sandi sebagai teks biasa.
- Gunakan password hashing yang sesuai untuk penyimpanan kredensial.
- Simpan secrets di luar source code dan jangan memasukkannya ke repository.
- Gunakan `.gitignore` untuk mengecualikan file environment lokal yang berisi konfigurasi rahasia.
- Periksa file yang akan di-commit sebelum melakukan push.
- Batasi akses ke secrets hanya bagi komponen dan pihak yang membutuhkannya.

**Deteksi:**
- Periksa perubahan yang akan dimasukkan ke repository.
- Gunakan alat pemeriksaan secrets apabila tersedia.
- Tinjau repository untuk memastikan tidak ada kredensial atau secrets aktif yang terunggah.
- Jangan menyalin nilai secrets ke log pemeriksaan atau laporan.

**Pemulihan:**
- Cabut atau rotasi secrets yang terpapar.
- Ganti kredensial yang terdampak apabila diperlukan.
- Periksa riwayat repository untuk menentukan cakupan paparan.
- Jika secrets aktif pernah terunggah, jangan hanya menghapusnya dari file terbaru; lakukan rotasi dan evaluasi penanganan riwayat Git.

**Indikator pengujian:**
- Kata sandi tidak tersimpan sebagai teks biasa pada penyimpanan kredensial.
- Repository tidak berisi secrets aktif atau kredensial asli.
- Secrets yang diketahui terpapar dapat dicabut atau dirotasi sesuai prosedur.
- Hasil pemeriksaan repository tidak menampilkan rahasia yang tidak seharusnya dipublikasikan.

**Prioritas:** Tinggi.

### 2.5 E-02 — Akses Langsung ke Fungsi Administratif

**Risiko:** pengguna memanggil endpoint sensitif secara langsung tanpa memiliki hak akses yang diperlukan.

**Pencegahan:**
- Periksa autentikasi dan otorisasi di sisi server pada setiap endpoint sensitif.
- Pastikan setiap operasi memeriksa apakah pengguna memiliki izin terhadap fungsi dan data yang diminta.
- Jangan menjadikan penyembunyian tombol atau menu sebagai satu-satunya mekanisme keamanan.
- Tolak permintaan dari pengguna yang tidak memiliki hak akses.
- Terapkan prinsip penolakan akses secara default untuk operasi yang tidak diizinkan.

**Deteksi:**
- Catat permintaan yang ditolak terhadap endpoint sensitif.
- Pantau pola akses yang tidak wajar apabila fasilitas pemantauan tersedia.
- Hindari mencatat token sesi atau informasi rahasia pada log.

**Pemulihan:**
- Perbaiki aturan autentikasi dan otorisasi yang tidak sesuai.
- Tinjau aktivitas yang dilakukan melalui endpoint terdampak.
- Koreksi perubahan data yang tidak sah berdasarkan bukti yang tersedia.
- Uji kembali endpoint yang telah diperbaiki.

**Indikator pengujian:**
- Permintaan langsung dari akun tanpa izin harus ditolak.
- Pengguna tidak memperoleh akses administratif hanya dengan mengetahui URL endpoint.
- Endpoint tetap melakukan pemeriksaan hak akses meskipun fungsi terkait tidak ditampilkan pada antarmuka.

**Prioritas:** Tinggi.

## 3. Pemetaan Kontrol Umum

| ID Risiko | Area | Kontrol | Tujuan |
|---|---|---|---|
| S-01 | Autentikasi | Password hashing, validasi login di server, dan pembatasan percobaan login | Mengurangi risiko pengambilalihan akun bendahara |
| T-01 | Integritas transaksi | Validasi nominal di server, pemeriksaan hak akses, dan pencatatan perubahan | Menjaga keakuratan saldo dan laporan |
| E-01, E-02 | Otorisasi | RBAC dan pemeriksaan izin di server untuk operasi sensitif | Mencegah akses fungsi tanpa izin |
| I-02 | Perlindungan kredensial | Penyimpanan secrets di luar source code, `.gitignore`, dan pemeriksaan perubahan sebelum commit | Mengurangi risiko kebocoran kata sandi dan secrets |
| T-02, I-01 | Perlindungan data | Pembatasan akses terhadap data iuran, transaksi, dan laporan | Menjaga kerahasiaan dan integritas informasi keuangan |
| R-01, R-02 | Logging dan audit | Pencatatan akun, waktu, jenis tindakan, dan identitas transaksi tanpa menyimpan secrets | Mendukung penelusuran perubahan dan penyelesaian perselisihan |
| D-01, D-02 | Ketersediaan | Pembatasan laju permintaan, batas ukuran input, dan penanganan error | Mengurangi risiko gangguan layanan |
| Risiko yang relevan | Pemulihan | Backup terlindungi, prosedur pemulihan, dan pemeriksaan data setelah insiden | Membantu pemulihan layanan dan data |

Kontrol umum di atas merupakan rancangan mitigasi. Penerapannya perlu disesuaikan dengan komponen KasVault yang benar-benar tersedia.

## 4. Tahapan Implementasi

### Tahap 1 — Fondasi

- Tentukan peran pengguna dan aturan akses bendahara serta anggota.
- Identifikasi data yang perlu dilindungi.
- Tetapkan aturan validasi transaksi.
- Tentukan data yang boleh dicatat ke dalam log aktivitas.
- Pastikan secrets tidak ditulis langsung dalam source code.
- Tentukan kebutuhan backup dan prosedur pemulihan data.

### Tahap 2 — Implementasi

- Terapkan autentikasi dan otorisasi di sisi server.
- Terapkan password hashing yang sesuai.
- Terapkan validasi input dan transaksi di sisi server.
- Amankan pengelolaan sesi dan komunikasi menggunakan HTTPS pada lingkungan deployment.
- Tambahkan pencatatan aktivitas penting tanpa menyimpan secrets.
- Atur backup apabila database sudah digunakan.
- Batasi akses terhadap konfigurasi rahasia.

### Tahap 3 — Pengujian

- Uji login dengan kredensial valid dan tidak valid.
- Uji pembatasan percobaan login.
- Uji pembatasan akses antara bendahara dan anggota.
- Uji perubahan nominal menggunakan akun dengan hak akses berbeda.
- Uji endpoint sensitif melalui permintaan langsung.
- Periksa bahwa secrets tidak masuk ke repository.
- Uji pemulihan data sesuai mekanisme backup yang benar-benar tersedia.
- Dokumentasikan hasil pengujian dan perbaikan yang dilakukan.

## 5. Status Implementasi

Status berikut menunjukkan bahwa kontrol belum diverifikasi. Status harus diperbarui berdasarkan implementasi dan bukti pengujian yang benar-benar tersedia.

| Kontrol | Status | Bukti yang dibutuhkan |
|---|---|---|
| Password hashing | Belum diverifikasi | Implementasi dan hasil pengujian penyimpanan kredensial |
| Autentikasi dan pengelolaan sesi | Belum diverifikasi | Kode autentikasi serta hasil pengujian sesi |
| Pemeriksaan hak akses server | Belum diverifikasi | Kode otorisasi dan pengujian antarperan |
| Validasi transaksi di server | Belum diverifikasi | Implementasi validasi dan hasil pengujian input |
| HTTPS deployment | Belum diverifikasi | URL deployment dan pemeriksaan konfigurasi |
| Audit log | Belum diverifikasi | Implementasi log dan contoh catatan tanpa data sensitif |
| Backup dan pemulihan | Belum diverifikasi | Prosedur backup dan bukti pengujian pemulihan |
| Pemeriksaan secrets | Belum diverifikasi | Hasil pemeriksaan repository dan konfigurasi penyimpanan secrets |

Status "Belum diverifikasi" berarti belum tersedia bukti yang cukup untuk menyatakan kontrol telah diterapkan dan efektif. Status tersebut perlu diperbarui setelah pemeriksaan kode, konfigurasi, dan pengujian dilakukan.

## 6. Kesimpulan

Kontrol keamanan KasVault difokuskan pada perlindungan akun bendahara, integritas transaksi, pembatasan hak akses, pencegahan kebocoran kata sandi atau secrets, serta pengamanan endpoint sensitif.

Setiap risiko prioritas memiliki rencana pencegahan, deteksi, pemulihan, dan indikator pengujian. Kontrol umum juga mencakup perlindungan data, logging, ketersediaan, dan pemulihan.

Dokumen ini merupakan rencana mitigasi awal. Efektivitas kontrol harus dibuktikan melalui implementasi dan pengujian yang nyata sebelum kontrol dinyatakan berhasil. Hasil implementasi dan pengujian selanjutnya perlu digunakan untuk memperbarui status kontrol serta penilaian risiko KasVault.