# Security Controls Plan – KasVault

## 1. Pendahuluan

Dokumen Security Controls Plan ini menjelaskan kontrol keamanan yang dirancang dan diterapkan pada aplikasi KasVault. KasVault merupakan aplikasi pengelolaan keuangan kas kelas yang digunakan untuk mencatat pemasukan, pengeluaran, serta memantau kondisi keuangan kelas.

Penerapan kontrol keamanan dilakukan untuk mengurangi risiko yang telah diidentifikasi pada dokumen Risk Assessment dan analisis STRIDE. Fokus utama pengamanan meliputi autentikasi pengguna, pembatasan hak akses berdasarkan peran (Role-Based Access Control/RBAC), perlindungan kata sandi, validasi input, pengelolaan sesi pengguna, serta hardening lingkungan aplikasi.

Kontrol yang belum diterapkan atau belum diuji secara langsung tetap dicatat sebagai pekerjaan lanjutan agar status keamanan aplikasi dapat dievaluasi secara objektif.

## 2. Tujuan Security Controls

Tujuan penerapan kontrol keamanan pada KasVault adalah:

1. Melindungi akun pengguna dari akses yang tidak sah.
2. Memastikan setiap pengguna hanya dapat mengakses fitur sesuai dengan hak aksesnya.
3. Melindungi kata sandi agar tidak disimpan dalam bentuk teks biasa.
4. Mencegah perubahan data transaksi oleh pengguna yang tidak memiliki wewenang.
5. Mengurangi kemungkinan kebocoran informasi sensitif.
6. Memperkuat keamanan lingkungan aplikasi melalui hardening sistem dan container.
7. Menyediakan dasar pengujian keamanan dan evaluasi terhadap risiko aplikasi.

## 3. Daftar Risiko dan Kontrol Keamanan

### 3.1 S-01 – Pengambilalihan Akun Bendahara

**Risiko:**

Penyerang memperoleh akses ke akun Bendahara sehingga dapat mengakses atau mengubah informasi keuangan kelas.

**Kontrol yang direncanakan dan diterapkan:**

- Kata sandi pengguna disimpan menggunakan algoritma bcrypt dengan cost factor 12.
- Proses autentikasi dilakukan dengan membandingkan kata sandi menggunakan fungsi verifikasi bcrypt.
- Sesi pengguna menggunakan cookie dengan atribut HttpOnly dan SameSite=Lax.
- Cookie sesi menggunakan atribut Secure ketika aplikasi berjalan pada lingkungan production.
- Masa berlaku sesi dibatasi selama 8 jam.
- Kredensial akun demo disimpan melalui environment variable dan tidak ditulis langsung pada source code.

**Status:** Sebagian diimplementasikan.

**Catatan:**

Penyimpanan sesi saat ini menggunakan Map di memori aplikasi. Dengan demikian, sesi dapat hilang ketika server dimulai ulang dan belum dirancang untuk penggunaan multi-instance. Penggunaan session store yang persisten masih menjadi pengembangan lanjutan.

### 3.2 T-01 – Perubahan Data Transaksi Tanpa Izin

**Risiko:**

Pengguna yang tidak memiliki wewenang melakukan perubahan terhadap nominal, jenis, atau informasi transaksi.

**Kontrol yang direncanakan dan diterapkan:**

- Setiap Server Action yang berkaitan dengan penambahan, perubahan, dan penghapusan transaksi melakukan pemeriksaan role.
- Hanya pengguna dengan role BENDAHARA yang dapat menjalankan operasi pengelolaan transaksi.
- Validasi input dilakukan pada sisi server sebelum proses pengolahan data.
- Pengguna dengan role ANGGOTA tidak diberikan akses ke form dan tombol pengelolaan transaksi pada antarmuka.

**Status:** Kontrol otorisasi server telah diimplementasikan dan diuji.

**Catatan:**

Pengujian dilakukan dengan mengirimkan input tidak valid untuk memastikan pemeriksaan role berjalan sebelum proses perubahan database. Hasil pengujian membuktikan bahwa pemeriksaan role berhasil dilewati oleh Bendahara dan ditolak untuk Anggota. Pengujian ini tidak dimaksudkan untuk membuktikan keberhasilan operasi CRUD database.

### 3.3 E-01 – Anggota Memperoleh Hak Akses Bendahara

**Risiko:**

Pengguna dengan hak akses Anggota dapat memperoleh atau menggunakan fungsi yang seharusnya hanya dimiliki oleh Bendahara.

**Kontrol yang direncanakan dan diterapkan:**

- Aplikasi menggunakan Role-Based Access Control (RBAC).
- Role yang digunakan terdiri dari BENDAHARA dan ANGGOTA.
- Pemeriksaan role dilakukan pada sisi server melalui fungsi `wajibRole()`.
- Setiap operasi pengelolaan kas dan transaksi memerlukan role BENDAHARA.
- Antarmuka menyesuaikan fitur yang ditampilkan berdasarkan role pengguna.

**Status:** Diimplementasikan dan diuji.

### 3.4 I-02 – Kebocoran Kata Sandi dan Informasi Rahasia

**Risiko:**

Informasi sensitif seperti kata sandi atau konfigurasi rahasia aplikasi dapat diketahui pihak yang tidak berwenang.

**Kontrol yang direncanakan dan diterapkan:**

- Kata sandi tidak disimpan dalam bentuk plaintext, melainkan menggunakan bcrypt.
- Kredensial akun demo disimpan melalui environment variable.
- File environment seperti `.env` dan `.env.local` dimasukkan ke dalam `.gitignore`.
- File yang berisi kunci atau informasi rahasia tidak dimasukkan ke dalam repository.
- Penggunaan file `.env.example` hanya untuk memberikan contoh nama variabel tanpa menyimpan nilai rahasia.

**Status:** Sebagian diimplementasikan.

**Catatan:**

Pemeriksaan menyeluruh terhadap seluruh riwayat commit dan repository untuk memastikan tidak terdapat rahasia yang pernah terunggah masih perlu dilakukan.

### 3.5 E-02 – Akses Langsung ke Fungsi Administratif

**Risiko:**

Pengguna mencoba mengakses fungsi administratif secara langsung tanpa melalui antarmuka aplikasi.

**Kontrol yang direncanakan dan diterapkan:**

- Pemeriksaan autentikasi dilakukan menggunakan fungsi `wajibLogin()`.
- Pemeriksaan hak akses dilakukan menggunakan fungsi `wajibRole()`.
- Pemeriksaan otorisasi ditempatkan pada Server Action, bukan hanya mengandalkan penyembunyian tombol pada antarmuka.
- Pengguna yang tidak memiliki sesi aktif diarahkan ke halaman masuk.
- Pengguna dengan role yang tidak sesuai akan ditolak dari fungsi yang dilindungi.

**Status:** Diimplementasikan dan diuji melalui pengujian RBAC.

## 4. Rencana Kontrol Keamanan Tambahan

Beberapa kontrol berikut masih perlu diterapkan atau diverifikasi untuk meningkatkan keamanan KasVault.

| No. | Kontrol | Tujuan | Status |
|---|---|---|---|
| 1 | HTTPS pada deployment | Melindungi komunikasi data antara pengguna dan server | Belum diverifikasi |
| 2 | Audit log | Mencatat aktivitas penting pengguna dan perubahan transaksi | Belum diimplementasikan |
| 3 | Backup dan recovery | Menjaga ketersediaan dan pemulihan data | Belum diverifikasi |
| 4 | Persistent session store | Menjaga pengelolaan sesi agar lebih andal | Belum diimplementasikan |
| 5 | Repository secret scanning | Mendeteksi informasi rahasia yang mungkin terunggah | Perlu diverifikasi |
| 6 | Validasi input server | Mengurangi risiko input tidak sesuai | Sebagian diimplementasikan |

## 5. Hasil Implementasi dan Pengujian

### 5.1 Implementasi Role-Based Access Control

KasVault menggunakan dua role utama:

- **BENDAHARA:** Memiliki hak untuk mengelola data kas dan transaksi, termasuk menambah, mengubah, dan menghapus data.
- **ANGGOTA:** Memiliki hak untuk melihat informasi kas dan transaksi, tetapi tidak dapat melakukan perubahan data.

Pemeriksaan hak akses dilakukan melalui fungsi `wajibRole()` yang terdapat pada `src/lib/akses.ts`.

Seluruh Server Action untuk pengelolaan kas dan transaksi telah dilengkapi pemeriksaan role Bendahara.

### 5.2 Hasil Pengujian Akses

Pengujian dilakukan untuk memastikan pengguna dengan role yang sesuai dapat melewati pemeriksaan otorisasi dan pengguna yang tidak sesuai ditolak.

| No. | Pengujian | Hasil yang Diharapkan | Hasil |
|---|---|---|---|
| 1 | Bendahara menambah kas | Lolos pemeriksaan role | Berhasil |
| 2 | Bendahara mengubah kas | Lolos pemeriksaan role | Berhasil |
| 3 | Bendahara menghapus kas | Lolos pemeriksaan role | Berhasil |
| 4 | Bendahara menambah transaksi | Lolos pemeriksaan role | Berhasil |
| 5 | Bendahara mengubah transaksi | Lolos pemeriksaan role | Berhasil |
| 6 | Bendahara menghapus transaksi | Lolos pemeriksaan role | Berhasil |
| 7 | Anggota menambah kas | Ditolak | Berhasil ditolak |
| 8 | Anggota mengubah kas | Ditolak | Berhasil ditolak |
| 9 | Anggota menghapus kas | Ditolak | Berhasil ditolak |
| 10 | Anggota menambah transaksi | Ditolak | Berhasil ditolak |
| 11 | Anggota mengubah transaksi | Ditolak | Berhasil ditolak |
| 12 | Anggota menghapus transaksi | Ditolak | Berhasil ditolak |

**Ringkasan hasil pengujian:**

- Positive test: 6 pengujian.
- Negative test: 6 pengujian.
- Total pengujian otorisasi: 12 pengujian.
- Hasil pengujian: seluruh pemeriksaan role sesuai dengan hasil yang diharapkan.

Pengujian positif membuktikan bahwa akun Bendahara dapat melewati pemeriksaan role. Pengujian negatif membuktikan bahwa akun Anggota ditolak oleh pemeriksaan role. Pengujian tersebut tidak membuktikan keberhasilan perubahan data pada database karena menggunakan input pengujian yang tidak valid untuk menghindari perubahan data sebenarnya.

### 5.3 Bukti Pengujian RBAC

Bukti pengujian RBAC disimpan pada folder `evidence/cyber/`.

Bukti yang digunakan:

- `04-dashboard-bendahara.png` – Tampilan dashboard Bendahara.
- `05-dashboard-anggota.png` – Tampilan dashboard Anggota.
- `06-tujuan-anggota.png` – Tampilan halaman tujuan untuk Anggota.
- `07-kas-anggota.png` – Tampilan halaman kas untuk Anggota.
- `08-transaksi-anggota.png` – Tampilan halaman transaksi untuk Anggota.
- `09-pengujian-rbac-simulasi.png` – Bukti pengujian simulasi RBAC.
- `09-pengujian-rbac-negatif.png` – Bukti pengujian akses Anggota.
- `10-pengujian-rbac-positif.png` – Bukti pengujian akses Bendahara.

### 5.4 SSH dan Operating System Hardening

Pengamanan sistem dilakukan menggunakan Ubuntu 24.04 pada WSL 2.

Kontrol SSH yang diterapkan:

- `PasswordAuthentication no` untuk menonaktifkan autentikasi SSH menggunakan kata sandi.
- `PermitRootLogin no` untuk mencegah login langsung menggunakan akun root.
- Autentikasi SSH menggunakan pasangan kunci Ed25519.
- Konfigurasi diperiksa menggunakan `sshd -t` dan `sshd -T`.
- Login menggunakan kunci SSH berhasil diuji setelah konfigurasi diterapkan.

Hasil pemeriksaan konfigurasi SSH:

| Parameter | Nilai | Status |
|---|---|---|
| PasswordAuthentication | no | Berhasil |
| PermitRootLogin | no | Berhasil |
| SSH key authentication | Berhasil diuji | Berhasil |

**Hasil Lynis:**

Audit sistem dilakukan menggunakan Lynis versi 3.0.9.

| Parameter | Hasil |
|---|---:|
| Hardening Index | 63 |
| Warnings | 0 |
| Suggestions | 48 |
| Tests Performed | 244 |

Skor hardening yang diperoleh adalah 63, sehingga belum mencapai target indeks minimal 70 yang ditetapkan dalam tugas. Tidak dilakukan perubahan konfigurasi secara sembarangan hanya untuk meningkatkan skor.

**Catatan keterbatasan:**

Lingkungan yang digunakan adalah Ubuntu 24.04 berbasis WSL 2, bukan virtual machine penuh. Oleh karena itu, hasil audit ini merupakan bukti hardening lingkungan WSL dan tidak boleh dianggap sebagai pemenuhan penuh persyaratan VM. Pengujian pada virtual machine penuh masih diperlukan apabila persyaratan tersebut diwajibkan.

### 5.5 Container Hardening

Container aplikasi KasVault diperkuat menggunakan beberapa konfigurasi keamanan untuk menerapkan prinsip least privilege.

Kontrol yang diterapkan:

- Container dijalankan menggunakan user non-root `nextjs`.
- Seluruh Linux capabilities dihapus menggunakan `cap_drop: ALL`.
- `no-new-privileges:true` diterapkan untuk mencegah proses memperoleh privilege tambahan.
- Root filesystem dibuat read-only.
- Direktori sementara menggunakan tmpfs dengan opsi pembatasan.
- Jumlah proses dibatasi menggunakan `pids_limit: 100`.
- Penggunaan memori dibatasi sebesar 512 MB.
- Penggunaan CPU dibatasi sebesar 1.0.
- Port aplikasi hanya diekspos secara internal melalui `expose: 3000`, tanpa publikasi port ke host.

**Hasil verifikasi konfigurasi container:**

| Kontrol | Hasil Pemeriksaan | Status |
|---|---|---|
| User | `nextjs` | Terverifikasi |
| Read-only filesystem | `true` | Terverifikasi |
| Capabilities | `ALL` dihapus | Terverifikasi |
| No new privileges | `true` | Terverifikasi |
| Memory limit | 512 MB | Terverifikasi |
| PID limit | 100 | Terverifikasi |
| Port aplikasi | `3000/tcp`, tidak dipublikasikan | Terverifikasi |

Pemeriksaan dilakukan menggunakan `docker inspect` terhadap container `kasvault-app`.

**Catatan:**

Container PostgreSQL `pg-praktikum` tetap menggunakan port 5432 yang dipublikasikan ke host sesuai konfigurasi praktikum sebelumnya. Konfigurasi tersebut tidak diubah. Kontrol port yang tidak dipublikasikan dalam implementasi ini berlaku untuk container aplikasi KasVault.

### 5.6 Vulnerability Scanning dan Remediasi Image

Pemindaian kerentanan dilakukan menggunakan Trivy terhadap image Docker KasVault.

Pada pemeriksaan awal, ditemukan 10 kerentanan HIGH dan 0 kerentanan CRITICAL pada dependency bawaan npm di base image Node.js.

Berdasarkan informasi lokasi paket dari laporan JSON Trivy, temuan tersebut berasal dari direktori:

`/usr/local/lib/node_modules/npm/node_modules/`

Dengan demikian, sumber temuan berasal dari dependency internal npm yang disertakan dalam image, bukan dari dependency aplikasi KasVault yang terpasang pada root `/app`.

Remediasi dilakukan dengan memperbarui npm bawaan pada Dockerfile dari versi 10.9.9 menjadi 12.2.2. Versi tersebut telah diperiksa kompatibilitasnya dengan Node.js 22 yang digunakan pada image.

Hasil verifikasi versi setelah pembaruan:

| Komponen | Sebelum | Sesudah |
|---|---|---|
| Node.js | 22.23.4 | 22.23.4 |
| npm | 10.9.9 | 12.2.2 |

**Hasil pemindaian setelah remediasi:**

| Komponen | HIGH | CRITICAL | MEDIUM |
|---|---:|---:|---:|
| Alpine 3.24.4 | 0 | 0 | 1 |
| Node.js dependencies | 0 | 0 | 2 |
| **Total** | **0** | **0** | **3** |

Hasil tersebut menunjukkan bahwa setelah pembaruan npm, seluruh temuan HIGH pada pemindaian sebelumnya tidak lagi terdeteksi. Tidak ditemukan kerentanan CRITICAL pada hasil pemindaian terbaru.

Masih terdapat tiga temuan MEDIUM, yaitu satu pada komponen Alpine dan dua pada dependency Node.js. Temuan tersebut tetap dicatat sebagai pekerjaan remediasi lanjutan dan tidak dinyatakan telah selesai.

**Catatan:**

Pemindaian sebelum dan sesudah remediasi menggunakan image dengan konfigurasi yang berbeda pada bagian npm. Hasil tersebut digunakan untuk menunjukkan perubahan temuan setelah pembaruan npm. Image akhir tetap perlu dipantau dan diperiksa kembali apabila terdapat pembaruan base image atau dependency.

### 5.7 Software Bill of Materials (SBOM)

SBOM dibuat menggunakan Trivy dengan format CycloneDX untuk mencatat komponen perangkat lunak yang terdapat pada image KasVault.

File SBOM yang dihasilkan:

- `evidence/cyber/sbom.cdx.json`

SBOM diperbarui setelah proses pembaruan npm dan rebuild image agar mencerminkan komponen pada image terbaru.

SBOM dapat digunakan sebagai dokumentasi inventaris komponen perangkat lunak dan dasar pemeriksaan dependency pada pengembangan selanjutnya.

### 5.8 Bukti Hardening dan Vulnerability Scanning

Seluruh bukti hardening dan pemindaian disimpan pada folder `evidence/cyber/`.

Bukti yang digunakan:

- `lynis-before.txt` – Hasil audit Lynis sebelum penguatan.
- `lynis-after.txt` – Hasil audit Lynis setelah penguatan.
- `sudoers-permission.txt` – Bukti pengaturan permission direktori sudoers.
- `11-ssh-key-only.png` – Bukti pengujian autentikasi SSH menggunakan kunci.
- `image-scan-after.txt` – Hasil pemindaian image setelah remediasi npm.
- `sbom.cdx.json` – SBOM image KasVault dalam format CycloneDX.

Bukti tambahan terkait RBAC tercantum pada Subbab 5.3.

## 6. Keterkaitan dengan Risk Assessment

Penerapan kontrol keamanan pada dokumen ini mengacu pada risiko yang telah diidentifikasi dalam `risk-assessment.md` dan analisis STRIDE.

| Risk ID | Risiko | Kontrol yang Diterapkan |
|---|---|---|
| S-01 | Pengambilalihan Akun Bendahara | Bcrypt, autentikasi, dan pengelolaan sesi |
| T-01 | Perubahan Data Transaksi Tanpa Izin | Pemeriksaan role pada Server Action dan validasi input |
| E-01 | Anggota Memperoleh Hak Akses Bendahara | RBAC dan pemeriksaan otorisasi server |
| I-02 | Kebocoran Kata Sandi dan Informasi Rahasia | Bcrypt, environment variable, dan `.gitignore` |
| E-02 | Akses Langsung ke Fungsi Administratif | Pemeriksaan autentikasi dan otorisasi server |

Penguatan sistem operasi, container, dan image Docker menjadi kontrol pendukung untuk mengurangi risiko terhadap lingkungan aplikasi. Hasil pemeriksaan teknisnya didokumentasikan pada Subbab 5.4 sampai 5.8.

## 7. Kesimpulan

Berdasarkan implementasi dan pengujian yang telah dilakukan, KasVault telah memiliki kontrol keamanan dasar pada bagian autentikasi, penyimpanan kata sandi, dan pembatasan hak akses berdasarkan role.

Pengujian RBAC menunjukkan bahwa enam pengujian positif untuk Bendahara dan enam pengujian negatif untuk Anggota memberikan hasil sesuai dengan aturan akses yang dirancang. Pemeriksaan otorisasi telah diterapkan pada Server Action pengelolaan kas dan transaksi sehingga keamanan tidak hanya bergantung pada tampilan antarmuka.

Pada sisi infrastruktur, konfigurasi container KasVault telah menerapkan non-root user, read-only filesystem, penghapusan capabilities, pembatasan privilege, serta pembatasan penggunaan resource. Autentikasi SSH juga telah dikonfigurasi menggunakan kunci dan menonaktifkan login berbasis kata sandi serta login root.

Pembaruan npm pada Docker image berhasil menurunkan jumlah temuan HIGH dari 10 menjadi 0, dengan jumlah temuan CRITICAL tetap 0. Namun, masih terdapat tiga temuan MEDIUM yang perlu ditindaklanjuti. SBOM dalam format CycloneDX juga telah diperbarui sesuai image terbaru.

Meskipun demikian, hasil audit Lynis memperoleh indeks 63 dan belum mencapai target 70. Selain itu, lingkungan yang digunakan merupakan WSL 2, bukan virtual machine penuh. Beberapa aspek lain yang masih perlu dikembangkan adalah penggunaan penyimpanan sesi persisten, audit log, verifikasi HTTPS pada deployment, backup dan recovery, serta pemindaian rahasia pada repository.

Dengan demikian, kontrol keamanan yang telah diterapkan menjadi dasar untuk mengurangi risiko pada KasVault. Kontrol yang belum selesai dan temuan kerentanan yang masih tersisa perlu menjadi prioritas pada tahap pengembangan berikutnya.