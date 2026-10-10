# Threat Modeling KasVault — Analisis STRIDE

## 1. Tujuan

Dokumen ini mengidentifikasi ancaman keamanan pada KasVault menggunakan metode STRIDE. Identifikasi dilakukan berdasarkan rancangan awal aplikasi, aliran data, dan aset yang telah dicatat pada `assets.md` serta `dfd-threat-model.svg`.

KasVault dirancang sebagai aplikasi web untuk mengelola pemasukan, pengeluaran, iuran, dan laporan keuangan kelas atau organisasi mahasiswa.

**Catatan kondisi:** Pada tahap ini, autentikasi, backend, database, backup, dan log server masih berupa komponen yang direncanakan apabila belum diimplementasikan. Ancaman di bawah merupakan analisis terhadap rancangan produk, bukan klaim bahwa kerentanan tersebut sudah ditemukan pada aplikasi berjalan.

## 2. Metode STRIDE

STRIDE terdiri dari enam kategori ancaman:

- **S — Spoofing:** pihak tidak sah menyamar sebagai pengguna yang sah.
- **T — Tampering:** data atau sistem diubah tanpa izin.
- **R — Repudiation:** pengguna menyangkal aktivitas yang pernah dilakukan karena bukti aktivitas tidak memadai.
- **I — Information Disclosure:** informasi sensitif diketahui pihak yang tidak berhak.
- **D — Denial of Service:** layanan terganggu sehingga tidak dapat digunakan secara normal.
- **E — Elevation of Privilege:** pengguna memperoleh hak akses lebih tinggi daripada yang seharusnya.

## 3. Daftar Ancaman

### S — Spoofing

**S-01: Pengambilalihan akun bendahara**

- Elemen terkait: akun bendahara dan proses autentikasi.
- Skenario ancaman: pihak tidak berwenang menggunakan kredensial bendahara yang bocor atau dicuri untuk masuk ke akun tersebut.
- Dampak: transaksi dapat ditambahkan atau diubah secara tidak sah.
- Kontrol yang direncanakan: password hashing yang aman, autentikasi yang tepat, pembatasan percobaan login, dan pengamanan sesi.

**S-02: Pemalsuan identitas anggota**

- Elemen terkait: akun anggota dan proses login.
- Skenario ancaman: pihak lain menggunakan identitas atau kredensial anggota untuk melihat informasi yang seharusnya hanya tersedia bagi pengguna terdaftar.
- Dampak: informasi akun atau pembayaran dapat diakses tanpa izin.
- Kontrol yang direncanakan: verifikasi identitas, pengelolaan sesi yang aman, serta pemeriksaan hak akses pada server.

### T — Tampering

**T-01: Perubahan nominal transaksi tanpa izin**

- Elemen terkait: formulir transaksi, proses aplikasi, dan penyimpanan transaksi.
- Skenario ancaman: pengguna memodifikasi nominal pemasukan atau pengeluaran melalui permintaan yang dikirim ke server.
- Dampak: saldo dan laporan keuangan menjadi tidak akurat.
- Kontrol yang direncanakan: validasi input di server, otorisasi setiap perubahan, dan pencatatan aktivitas.

**T-02: Perubahan status pembayaran iuran**

- Elemen terkait: data pembayaran iuran.
- Skenario ancaman: pengguna yang tidak berhak mengubah status anggota dari belum membayar menjadi sudah membayar.
- Dampak: laporan pembayaran menjadi keliru dan dapat memicu konflik dalam organisasi.
- Kontrol yang direncanakan: pembatasan hak akses, validasi perubahan status di server, dan audit log.

### R — Repudiation

**R-01: Penyangkalan terhadap transaksi**

- Elemen terkait: data transaksi dan log aktivitas.
- Skenario ancaman: pengguna menyangkal telah menambahkan atau mengubah transaksi karena sistem tidak memiliki catatan aktivitas yang memadai.
- Dampak: penelusuran kesalahan dan penyelesaian perselisihan menjadi sulit.
- Kontrol yang direncanakan: log aktivitas yang mencatat identitas akun, waktu, jenis tindakan, dan identitas transaksi tanpa menyimpan kata sandi atau secrets.

**R-02: Penyangkalan perubahan laporan**

- Elemen terkait: laporan keuangan dan riwayat perubahan.
- Skenario ancaman: pengguna menyangkal perubahan terhadap laporan karena versi sebelumnya atau riwayat perubahan tidak tersedia.
- Dampak: proses audit dan pemeriksaan keuangan menjadi lebih sulit.
- Kontrol yang direncanakan: riwayat perubahan yang terlindungi, pencatatan waktu, dan pembatasan penghapusan log.

### I — Information Disclosure

**I-01: Kebocoran data keuangan**

- Elemen terkait: transaksi, iuran, laporan, dan database.
- Skenario ancaman: pengguna tanpa izin memperoleh akses ke data keuangan melalui pemeriksaan hak akses yang lemah.
- Dampak: kerahasiaan informasi organisasi terganggu.
- Kontrol yang direncanakan: pemeriksaan otorisasi pada server, prinsip hak akses minimum, dan pengamanan penyimpanan data.

**I-02: Kebocoran kata sandi atau secrets**

- Elemen terkait: kredensial akun, konfigurasi, dan secrets server.
- Skenario ancaman: kata sandi disimpan sebagai teks biasa atau token dan kunci rahasia tidak sengaja dimasukkan ke repository.
- Dampak: akun atau layanan dapat disalahgunakan.
- Kontrol yang direncanakan: password hashing yang sesuai, penyimpanan secrets di luar source code, pengaturan `.gitignore`, dan pemeriksaan isi commit.

### D — Denial of Service

**D-01: Permintaan berlebihan terhadap aplikasi**

- Elemen terkait: layanan aplikasi dan endpoint backend.
- Skenario ancaman: pihak tertentu mengirim permintaan dalam jumlah besar sehingga sumber daya server habis atau layanan melambat.
- Dampak: bendahara dan anggota kesulitan mengakses informasi keuangan.
- Kontrol yang direncanakan: pembatasan laju permintaan, validasi input, pemantauan penggunaan sumber daya, dan penanganan error yang baik.

**D-02: Penyalahgunaan proses pencatatan transaksi**

- Elemen terkait: formulir transaksi dan proses penyimpanan.
- Skenario ancaman: pengguna mengirim permintaan berulang atau data yang tidak valid untuk membebani proses aplikasi.
- Dampak: kinerja aplikasi menurun dan transaksi yang sah dapat terhambat.
- Kontrol yang direncanakan: pembatasan permintaan, batas ukuran input, validasi server, dan penanganan transaksi secara efisien.

### E — Elevation of Privilege

**E-01: Anggota memperoleh hak bendahara**

- Elemen terkait: sistem peran dan pemeriksaan otorisasi.
- Skenario ancaman: anggota memodifikasi permintaan untuk menjalankan fungsi yang hanya boleh digunakan bendahara.
- Dampak: anggota dapat mengubah atau menambahkan transaksi tanpa izin.
- Kontrol yang direncanakan: pemeriksaan peran di server untuk setiap operasi sensitif dan penolakan akses secara default.

**E-02: Akses langsung ke fungsi administratif**

- Elemen terkait: endpoint pengelolaan transaksi dan fungsi administratif.
- Skenario ancaman: pengguna mengakses endpoint sensitif secara langsung tanpa melewati pemeriksaan izin yang seharusnya.
- Dampak: data dapat dibaca atau diubah tanpa otorisasi.
- Kontrol yang direncanakan: pemeriksaan otorisasi pada setiap endpoint, pengujian akses antarperan, dan pemisahan fungsi pengguna.

## 4. Ringkasan Ancaman

| Kategori | ID ancaman | Jumlah |
|---|---|---:|
| Spoofing | S-01, S-02 | 2 |
| Tampering | T-01, T-02 | 2 |
| Repudiation | R-01, R-02 | 2 |
| Information Disclosure | I-01, I-02 | 2 |
| Denial of Service | D-01, D-02 | 2 |
| Elevation of Privilege | E-01, E-02 | 2 |
| **Total** | **S-01 sampai E-02** | **12** |

## 5. Catatan dan Batasan Analisis

Ancaman di atas merupakan skenario potensial yang diturunkan dari rancangan awal KasVault. Daftar ini perlu diperbarui ketika backend, database, autentikasi, dan fitur pengelolaan transaksi sudah diimplementasikan.

Kontrol yang disebutkan merupakan rencana mitigasi, bukan bukti bahwa kontrol tersebut sudah tersedia. Penilaian kemungkinan dan dampak setiap ancaman akan dibahas secara terpisah dalam `risk-assessment.md`.