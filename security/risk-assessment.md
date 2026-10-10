# Risk Assessment — KasVault

## 1. Tujuan

Dokumen ini digunakan untuk menilai risiko dari 12 ancaman yang telah diidentifikasi dalam `stride.md`. Penilaian dilakukan untuk menentukan ancaman yang perlu ditangani terlebih dahulu berdasarkan kemungkinan terjadinya dan dampaknya terhadap KasVault.

KasVault merupakan aplikasi web untuk mengelola pemasukan, pengeluaran, pembayaran iuran, dan laporan keuangan kelas atau organisasi mahasiswa.

Penilaian ini masih bersifat awal karena beberapa komponen, seperti autentikasi, backend, database, backup, dan log aktivitas, mungkin belum diimplementasikan. Oleh karena itu, skor yang diberikan merupakan estimasi berdasarkan rancangan produk, bukan hasil pengujian penetrasi atau bukti bahwa suatu kerentanan sudah ditemukan.

## 2. Metode Penilaian Risiko

Penilaian risiko menggunakan dua parameter, yaitu kemungkinan terjadinya ancaman (*Likelihood*) dan dampak yang ditimbulkan (*Impact*). Masing-masing parameter menggunakan skala 1–5.

### 2.1 Skala Kemungkinan (Likelihood)

| Skor | Tingkat | Keterangan |
|---|---|---|
| 1 | Sangat rendah | Ancaman membutuhkan kondisi yang sangat khusus untuk terjadi. |
| 2 | Rendah | Ancaman memiliki kemungkinan terjadi yang relatif kecil. |
| 3 | Sedang | Ancaman dapat terjadi apabila terdapat kelemahan pada sistem atau proses. |
| 4 | Tinggi | Ancaman cukup mungkin terjadi apabila perlindungan pada komponen penting tidak memadai. |
| 5 | Sangat tinggi | Ancaman sangat mudah dicoba atau sangat mungkin terjadi dalam kondisi sistem yang relevan. |

### 2.2 Skala Dampak (Impact)

| Skor | Tingkat | Keterangan |
|---|---|---|
| 1 | Sangat rendah | Dampak sangat terbatas dan mudah dipulihkan. |
| 2 | Rendah | Menyebabkan gangguan kecil pada pengguna atau proses aplikasi. |
| 3 | Sedang | Mengganggu sebagian fungsi atau menyebabkan kesalahan yang masih dapat diperbaiki. |
| 4 | Tinggi | Mengganggu keakuratan transaksi, kerahasiaan informasi, atau kegiatan organisasi secara signifikan. |
| 5 | Sangat tinggi | Berpotensi menyebabkan pengambilalihan akun penting, manipulasi transaksi, atau kebocoran data yang serius. |

### 2.3 Rumus dan Kategori Risiko

Skor risiko dihitung menggunakan rumus:

**Skor Risiko = Likelihood × Impact**

| Rentang Skor | Kategori Risiko |
|---|---|
| 1–4 | Rendah |
| 5–9 | Sedang |
| 10–16 | Tinggi |
| 17–25 | Ekstrem |

Skor yang lebih tinggi menunjukkan bahwa ancaman tersebut perlu mendapatkan perhatian lebih besar. Penentuan prioritas juga mempertimbangkan dampak terhadap keamanan data, integritas transaksi, dan kelangsungan penggunaan KasVault.

## 3. Matriks Penilaian Risiko

| ID | Ancaman | Likelihood | Impact | Skor | Kategori |
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

### 3.1 Dasar Penentuan Skor

Skor kemungkinan dan dampak ditentukan berdasarkan skenario ancaman, aset yang terdampak, serta konsekuensinya terhadap KasVault.

- **Likelihood 3 (Sedang):** ancaman dapat terjadi apabila terdapat kelemahan pada validasi, pengelolaan akun, pencatatan aktivitas, atau proses aplikasi.
- **Likelihood 4 (Tinggi):** ancaman berpotensi terjadi apabila komponen penting, seperti akun bendahara atau pemeriksaan hak akses, tidak memiliki perlindungan yang memadai.
- **Impact 3 (Sedang):** ancaman dapat mengganggu sebagian fungsi atau menyebabkan kesalahan yang masih dapat diperbaiki.
- **Impact 4 (Tinggi):** ancaman dapat memengaruhi keakuratan pembayaran, laporan, atau kerahasiaan informasi organisasi.
- **Impact 5 (Sangat tinggi):** ancaman berpotensi memungkinkan pengambilalihan akun penting, perubahan transaksi tanpa izin, atau akses ke fungsi administratif yang sensitif.

Nilai di atas merupakan estimasi awal berdasarkan rancangan KasVault. Nilai tersebut perlu ditinjau kembali setelah aplikasi memiliki backend, autentikasi, database, dan kontrol keamanan yang dapat diuji.

## 4. Lima Risiko Prioritas

Lima risiko berikut diprioritaskan berdasarkan skor dan konsekuensinya terhadap keamanan data serta integritas keuangan KasVault.

### Prioritas 1 — S-01: Pengambilalihan Akun Bendahara

**Skor:** 20 — Ekstrem

**Alasan prioritas:**

Bendahara memiliki kewenangan untuk mengelola transaksi keuangan. Apabila akun bendahara diambil alih oleh pihak yang tidak berwenang, pihak tersebut berpotensi menambahkan atau mengubah transaksi sehingga merugikan organisasi.

**Rencana penanganan:**

- Menggunakan password hashing yang sesuai untuk menyimpan kata sandi.
- Menerapkan autentikasi dan pengelolaan sesi yang aman.
- Membatasi percobaan login berulang.
- Menyediakan mekanisme penggantian kata sandi dan pencabutan sesi yang mencurigakan.

**Indikator pengujian:**

- Login menggunakan kredensial yang tidak valid harus ditolak.
- Percobaan login berulang harus dibatasi sesuai kebijakan yang ditetapkan.
- Sesi pengguna harus ditangani dengan mekanisme keamanan yang sesuai.

### Prioritas 2 — T-01: Perubahan Nominal Transaksi Tanpa Izin

**Skor:** 20 — Ekstrem

**Alasan prioritas:**

Perubahan nominal pemasukan atau pengeluaran tanpa izin dapat menyebabkan saldo dan laporan keuangan tidak sesuai dengan kondisi sebenarnya. Hal ini dapat mengurangi kepercayaan anggota terhadap pengelolaan kas.

**Rencana penanganan:**

- Memvalidasi nominal transaksi di sisi server.
- Memeriksa hak akses pengguna sebelum transaksi ditambahkan atau diubah.
- Mencatat perubahan transaksi pada log aktivitas.
- Menyediakan riwayat perubahan yang dapat digunakan untuk pemeriksaan.

**Indikator pengujian:**

- Pengguna tanpa hak yang sesuai tidak dapat mengubah nominal transaksi.
- Input nominal yang tidak valid harus ditolak.
- Perubahan transaksi yang sah tercatat dengan identitas akun, waktu, dan identitas transaksi.

### Prioritas 3 — E-01: Anggota Memperoleh Hak Bendahara

**Skor:** 20 — Ekstrem

**Alasan prioritas:**

Anggota seharusnya tidak memiliki kewenangan yang sama dengan bendahara. Jika pemeriksaan hak akses tidak diterapkan dengan benar, anggota dapat menjalankan fungsi pengelolaan keuangan tanpa izin.

**Rencana penanganan:**

- Menerapkan *Role-Based Access Control* (RBAC).
- Memeriksa peran dan hak akses di sisi server untuk setiap operasi sensitif.
- Menggunakan prinsip hak akses minimum.
- Memisahkan fungsi yang hanya boleh digunakan bendahara dari fungsi yang dapat diakses anggota.

**Indikator pengujian:**

- Akun anggota ditolak ketika mencoba menambahkan, mengubah, atau menghapus transaksi.
- Akun bendahara hanya dapat menjalankan fungsi yang sesuai dengan haknya.
- Pemeriksaan hak akses tetap dilakukan meskipun permintaan dikirim langsung ke endpoint.

### Prioritas 4 — I-02: Kebocoran Kata Sandi atau Secrets

**Skor:** 15 — Tinggi

**Alasan prioritas:**

Kata sandi, token, atau konfigurasi rahasia yang bocor dapat dimanfaatkan untuk mengakses akun atau layanan yang dilindungi. Kebocoran melalui source code atau repository juga dapat memperbesar dampak insiden.

**Rencana penanganan:**

- Tidak menyimpan kata sandi sebagai teks biasa.
- Menggunakan algoritma password hashing yang sesuai.
- Menyimpan secrets di luar source code dan tidak mengunggahnya ke repository.
- Menggunakan `.gitignore` untuk mengecualikan file environment lokal.
- Memeriksa file yang akan di-commit sebelum melakukan push.

**Indikator pengujian:**

- Kata sandi tidak tersimpan sebagai teks biasa pada penyimpanan kredensial.
- Repository tidak berisi secrets aktif atau kredensial asli.
- Secrets yang terpapar harus dapat dicabut atau dirotasi sesuai prosedur penanganan insiden.

### Prioritas 5 — E-02: Akses Langsung ke Fungsi Administratif

**Skor:** 15 — Tinggi

**Alasan prioritas:**

Menyembunyikan tombol atau menu pada antarmuka tidak cukup untuk membatasi akses. Pengguna dapat mencoba mengakses endpoint secara langsung apabila server tidak melakukan pemeriksaan autentikasi dan otorisasi yang benar.

Risiko ini diprioritaskan karena kelemahan otorisasi pada endpoint dapat membuat pembatasan yang terlihat pada antarmuka tidak efektif.

**Rencana penanganan:**

- Memeriksa autentikasi dan otorisasi pada setiap endpoint sensitif.
- Menolak permintaan dari pengguna yang tidak memiliki hak akses.
- Memisahkan endpoint dan fungsi berdasarkan kebutuhan akses.
- Mencatat percobaan akses yang ditolak untuk membantu penelusuran.

**Indikator pengujian:**

- Permintaan langsung dari akun tanpa izin harus ditolak.
- Pengguna tidak dapat mengakses fungsi administratif hanya dengan mengetahui URL endpoint.
- Upaya akses yang ditolak dapat dicatat tanpa menyimpan informasi rahasia yang tidak diperlukan.

## 5. Pertimbangan Penentuan Prioritas

Prioritas tidak hanya ditentukan oleh skor numerik, tetapi juga oleh konsekuensi bisnis dan kebutuhan perlindungan KasVault.

S-01, T-01, dan E-01 mendapatkan skor 20 karena berkaitan langsung dengan pengambilalihan akun penting, integritas transaksi, dan penyalahgunaan hak akses. I-02 dan E-02 mendapatkan skor 15, tetapi tetap diprioritaskan karena kebocoran secrets dan kelemahan otorisasi dapat memengaruhi beberapa komponen sistem sekaligus.

Risiko lain, seperti perubahan status iuran, kebocoran data keuangan, dan penyangkalan transaksi, tetap perlu ditangani meskipun tidak masuk dalam lima prioritas utama.

## 6. Catatan dan Batasan Penilaian

Penilaian risiko ini merupakan estimasi awal berdasarkan rancangan KasVault, bukan hasil pengukuran statistik, pengujian penetrasi, atau bukti bahwa serangan telah terjadi.

Beberapa komponen yang dibahas, seperti autentikasi, backend, database, backup, dan log aktivitas, mungkin masih berupa rencana. Oleh karena itu, skor kemungkinan dan dampak harus dievaluasi kembali setelah komponen tersebut diimplementasikan dan diuji.

Kontrol yang belum memiliki bukti implementasi tidak boleh dinyatakan sudah efektif. Setiap perubahan nilai risiko sebaiknya disertai alasan dan hasil pengujian yang mendukung.

## 7. Kesimpulan

Berdasarkan penilaian awal, risiko yang perlu mendapatkan perhatian utama adalah pengambilalihan akun bendahara, perubahan nominal transaksi tanpa izin, dan peningkatan hak akses anggota. Kebocoran kata sandi atau secrets serta akses langsung ke fungsi administratif juga menjadi prioritas karena dapat mengancam keamanan data dan integritas keuangan KasVault.

Rencana mitigasi untuk kelima risiko prioritas dijelaskan lebih lanjut dalam `controls.md`. Penilaian ini akan menjadi dasar untuk menentukan kontrol keamanan yang perlu diterapkan, diuji, dan dievaluasi selama pengembangan KasVault.