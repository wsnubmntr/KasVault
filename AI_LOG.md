# AI Usage Log - KasVault

## Tujuan Penggunaan

AI digunakan sebagai sarana belajar dan referensi dalam proses pengembangan proyek KasVault. Penggunaannya bertujuan membantu memahami materi, mencari inspirasi, mengembangkan ide, dan memperoleh gambaran mengenai konsep keamanan yang dapat diterapkan pada proyek.

## Bentuk Penggunaan

- Membantu memahami konsep inventaris aset, Data Flow Diagram (DFD), STRIDE, dan penilaian risiko.
- Mencari referensi dan alternatif ide pengembangan keamanan aplikasi KasVault.
- Membantu memahami rancangan komponen kriptografi, termasuk AES-256-GCM, Initialization Vector (IV), Additional Authenticated Data (AAD), authentication tag, dan representasi data.
- Memberikan saran penyusunan implementasi enkripsi dan dekripsi menggunakan modul `node:crypto` pada Node.js.
- Membantu memahami pembuatan kunci enkripsi menggunakan Cryptographically Secure Pseudorandom Number Generator (CSPRNG) dan penyimpanannya di luar repository.
- Memberikan saran penyusunan pengujian otomatis untuk memeriksa keberhasilan enkripsi dan dekripsi serta penanganan data yang tidak valid.
- Membantu memeriksa hasil lint, build, pengujian otomatis, dan dokumentasi proyek.

## Verifikasi

Saran yang diperoleh dari AI diperiksa kembali melalui implementasi, pengujian otomatis, dan pemeriksaan proyek.

Pada pengujian komponen kriptografi menggunakan Node.js Test Runner, terdapat tujuh skenario pengujian yang berhasil dijalankan dengan hasil sebagai berikut:

- Enkripsi dan dekripsi data transaksi berhasil.
- Teks kosong ditolak.
- Ciphertext yang diubah ditolak.
- Penggunaan kunci yang salah ditolak.
- Authentication tag yang diubah ditolak.
- AAD yang diubah ditolak.
- Panjang kunci yang tidak sesuai ditolak.

Hasil pengujian menunjukkan tujuh tes lulus dan tidak ada tes gagal.

Kunci enkripsi dibuat menggunakan `crypto.randomBytes(32)` dan disimpan dalam file Base64 di luar direktori repository KasVault. Panjang kunci telah diverifikasi sebesar 32 byte dan format Base64 dinyatakan valid.

ESLint dan build produksi Next.js juga telah selesai tanpa error pada pemeriksaan sebelumnya.

Hasil pengujian tersebut hanya menunjukkan keberhasilan pemeriksaan yang telah dilakukan. Hal ini tidak menjadi bukti bahwa seluruh aplikasi telah aman atau bahwa semua data transaksi pada aplikasi KasVault sudah dienkripsi.

Keputusan akhir, pemahaman materi, pemeriksaan hasil, dan penyelesaian tugas tetap menjadi tanggung jawab mahasiswa.

## Batasan

AI digunakan sebagai alat bantu belajar, pengembangan ide, dan pemeriksaan awal. Rekomendasi yang diberikan tidak langsung dianggap sebagai bukti bahwa suatu fitur atau kontrol keamanan telah diterapkan dan berhasil diuji.

Setiap implementasi dan hasil pengujian diperiksa kembali secara langsung. Informasi rahasia seperti kunci enkripsi, password, token, dan data pribadi tidak dicantumkan dalam dokumentasi maupun repository publik.

## Tanggal

7 November 2026