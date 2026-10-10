# Risk Assessment — KasVault

## 1. Tujuan

Dokumen ini menilai risiko dari 12 ancaman yang telah diidentifikasi dalam `stride.md`. Penilaian digunakan untuk menentukan ancaman yang perlu ditangani terlebih dahulu berdasarkan kemungkinan terjadinya dan dampaknya terhadap KasVault.

Penilaian ini masih bersifat awal karena beberapa komponen, seperti autentikasi, backend, dan database, mungkin belum diimplementasikan.

## 2. Metode Penilaian Risiko

Penilaian menggunakan dua parameter, yaitu kemungkinan (Likelihood) dan dampak (Impact), masing-masing dengan skala 1–5.

### 2.1 Skala Kemungkinan

| Skor | Tingkat | Keterangan |
|---|---|---|
| 1 | Sangat rendah | Membutuhkan kondisi yang sangat khusus untuk terjadi. |
| 2 | Rendah | Kemungkinan terjadi relatif kecil. |
| 3 | Sedang | Dapat terjadi jika terdapat kelemahan pada sistem. |
| 4 | Tinggi | Cukup mungkin terjadi dalam kondisi yang relevan. |
| 5 | Sangat tinggi | Sangat mungkin terjadi atau mudah dicoba oleh pihak yang memiliki akses ke sistem. |

### 2.2 Skala Dampak

| Skor | Tingkat | Keterangan |
|---|---|---|
| 1 | Sangat rendah | Dampak terbatas dan mudah dipulihkan. |
| 2 | Rendah | Gangguan kecil pada pengguna atau proses. |
| 3 | Sedang | Mengganggu sebagian fungsi atau menimbulkan kesalahan yang dapat diperbaiki. |
| 4 | Tinggi | Mengganggu keuangan, kerahasiaan data, atau operasi organisasi secara signifikan. |
| 5 | Sangat tinggi | Dapat menyebabkan pengambilalihan akun penting, manipulasi keuangan besar, atau kebocoran data yang serius. |

### 2.3 Rumus dan Kategori Risiko

Skor risiko dihitung dengan rumus:

**Risiko = Kemungkinan × Dampak**

| Rentang skor | Kategori |
|---|---|
| 1–4 | Rendah |
| 5–9 | Sedang |
| 10–16 | Tinggi |
| 17–25 | Ekstrem |

Skor ini digunakan sebagai alat bantu untuk membandingkan risiko, bukan sebagai kepastian bahwa suatu serangan akan terjadi.

## 3. Matriks Penilaian Risiko

| ID | Ancaman | Kemungkinan | Dampak | Skor | Kategori |
|---|---|---:|---:|---:|---|
| S-01 | Pengambilalihan akun bendahara | 4 | 5 | 20 | Ekstrem |
| S-02 | Pemalsuan identitas anggota | 3 | 3 | 9 | Sedang |
| T-01 | Perubahan nominal transaksi tanpa izin | 4 | 5 | 20 | Ekstrem |
| T-02 | Perubahan status pembayaran iuran | 3 | 4 | 12 | Tinggi |
| R-01 | Penyangkalan terhadap transaksi | 3 | 4 | 12 | Tinggi |
| R-02 | Penyangkalan perubahan laporan | 3 | 3 | 9 | Sedang |
| I-01 | Kebocoran data keuangan | 3 | 4 | 12 | Tinggi |
| I-02 | Kebocoran kata sandi atau secrets | 3 | 5 | 15 | Tinggi |
| D-01 | Permintaan berlebihan terhadap aplikasi | 3 | 3 | 9 | Sedang |
| D-02 | Penyalahgunaan proses pencatatan transaksi | 3 | 3 | 9 | Sedang |
| E-01 | Anggota memperoleh hak bendahara | 4 | 5 | 20 | Ekstrem |
| E-02 | Akses langsung ke fungsi administratif | 3 | 5 | 15 | Tinggi |

## 4. Lima Risiko Prioritas

Lima risiko berikut diprioritaskan berdasarkan skor dan konsekuensi terhadap keamanan data serta integritas keuangan KasVault.

### Prioritas 1 — S-01: Pengambilalihan Akun Bendahara

- Skor: 20 (Ekstrem).
- Alasan: bendahara memiliki kewenangan mengelola transaksi. Jika akun diambil alih, pihak tidak berwenang dapat melakukan tindakan yang merugikan organisasi.
- Rencana penanganan: gunakan password hashing yang aman, autentikasi yang tepat, pembatasan percobaan login, dan pengamanan sesi.
- Indikator pengujian: login dengan kredensial tidak valid ditolak dan percobaan login berulang dibatasi.

### Prioritas 2 — T-01: Perubahan Nominal Transaksi Tanpa Izin

- Skor: 20 (Ekstrem).
- Alasan: perubahan nominal dapat menyebabkan saldo dan laporan tidak sesuai dengan kondisi keuangan sebenarnya.
- Rencana penanganan: validasi nominal pada server, pemeriksaan izin sebelum transaksi diubah, dan pencatatan aktivitas perubahan.
- Indikator pengujian: pengguna yang tidak memiliki izin tidak dapat mengubah nominal transaksi.

### Prioritas 3 — E-01: Anggota Memperoleh Hak Bendahara

- Skor: 20 (Ekstrem).
- Alasan: kelemahan pemeriksaan hak akses dapat memungkinkan anggota melakukan fungsi pengelolaan keuangan.
- Rencana penanganan: terapkan role-based access control dan pemeriksaan otorisasi di server untuk setiap operasi sensitif.
- Indikator pengujian: akun anggota ditolak ketika mencoba menambahkan, mengubah, atau menghapus transaksi.

### Prioritas 4 — I-02: Kebocoran Kata Sandi atau Secrets

- Skor: 15 (Tinggi).
- Alasan: kredensial atau secrets yang bocor dapat dimanfaatkan untuk mengakses akun atau layanan yang dilindungi.
- Rencana penanganan: gunakan password hashing yang sesuai, simpan secrets di luar source code, dan periksa file sebelum commit.
- Indikator pengujian: kata sandi tidak tersimpan sebagai teks biasa dan repository tidak berisi secrets aktif.

### Prioritas 5 — E-02: Akses Langsung ke Fungsi Administratif

- Skor: 15 (Tinggi).
- Alasan: menyembunyikan tombol di antarmuka saja tidak cukup. Pengguna dapat mencoba mengakses endpoint secara langsung jika server tidak memeriksa izin.
- Rencana penanganan: lakukan pemeriksaan otorisasi pada setiap endpoint sensitif dan uji akses menggunakan akun dengan peran berbeda.
- Indikator pengujian: permintaan tanpa izin ditolak meskipun dikirim langsung ke endpoint.

## 5. Catatan Penilaian

Skor pada dokumen ini merupakan estimasi awal berdasarkan rancangan KasVault, bukan hasil pengukuran statistik atau pengujian penetrasi. Nilai kemungkinan dan dampak perlu ditinjau ulang setelah arsitektur, backend, autentikasi, dan database benar-benar tersedia.

Ancaman yang memiliki skor sama dapat memiliki urutan prioritas berbeda berdasarkan konsekuensi bisnis, kemudahan eksploitasi, dan efektivitas kontrol yang sudah diterapkan.

## 6. Kesimpulan

Risiko yang perlu mendapat perhatian utama adalah pengambilalihan akun bendahara, perubahan transaksi tanpa izin, dan peningkatan hak akses anggota. Kebocoran secrets serta akses langsung ke fungsi administratif juga menjadi prioritas karena dapat memengaruhi keamanan data dan integritas keuangan KasVault.

Penanganan risiko akan dijabarkan lebih lanjut dalam `controls.md`, termasuk kontrol pencegahan, deteksi, dan pemulihan yang sesuai.