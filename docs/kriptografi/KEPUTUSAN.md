# Keputusan Mekanisme Kriptografi KasVault

## 1. Kebutuhan Keamanan

KasVault membutuhkan mekanisme kriptografi untuk menjaga kerahasiaan dan integritas data transaksi. Data yang dienkripsi tidak boleh dapat dibaca tanpa kunci yang benar. Perubahan pada ciphertext, authentication tag, atau konteks autentikasi harus menyebabkan proses dekripsi ditolak.

## 2. Mekanisme yang Dipilih

Mekanisme yang digunakan adalah Authenticated Encryption with Associated Data (AEAD) menggunakan algoritma AES-256-GCM.

Implementasi menggunakan modul `node:crypto` bawaan Node.js melalui fungsi `createCipheriv` dan `createDecipheriv`.

Alasan pemilihan:
- AES-GCM menyediakan kerahasiaan sekaligus autentikasi data.
- AES-256 menggunakan kunci sepanjang 256 bit.
- Authentication tag digunakan untuk mendeteksi perubahan ciphertext atau data autentikasi.
- Node.js menyediakan implementasi kriptografi melalui modul bawaan sehingga tidak perlu membuat algoritma sendiri.

## 3. Parameter Kriptografi

| Parameter | Nilai | Keterangan |
|---|---|---|
| Algoritma | AES-256-GCM | Algoritma AEAD |
| Panjang kunci | 256 bit (32 byte) | Dibuat menggunakan `crypto.randomBytes(32)` |
| IV/Nonce | 96 bit (12 byte) | Dibuat secara acak untuk setiap proses enkripsi |
| AAD | `KasVault:Transaksi:v1` | Konteks autentikasi yang mengikat data pada transaksi KasVault |
| Authentication tag | 128 bit (16 byte) | Digunakan untuk memverifikasi integritas dan autentisitas |
| Encoding | Base64 | Representasi IV, AAD, tag, dan ciphertext |

IV dibuat menggunakan CSPRNG melalui `crypto.randomBytes(12)`. IV harus unik untuk setiap enkripsi dengan kunci yang sama. Penggunaan nilai acak memberikan probabilitas benturan yang sangat kecil, tetapi bukan jaminan keunikan mutlak.

AAD tidak dienkripsi, tetapi ikut diverifikasi dalam proses autentikasi. Nilai AAD yang digunakan ditetapkan sebagai konteks aplikasi dan versi format data.

## 4. Pengelolaan Kunci

Kunci dibuat menggunakan CSPRNG melalui `crypto.randomBytes(32)`. Kunci disimpan dalam file Base64 di luar direktori repository:

`%USERPROFILE%\.kasvault-secrets\crypto-key.base64`

File tersebut tidak dimasukkan ke repository maupun diunggah ke GitHub. Kunci tidak boleh dicantumkan dalam source code, dokumentasi, atau log yang dipublikasikan.

## 5. Validasi dan Fail-Closed

Implementasi melakukan validasi terhadap:
- Teks masukan yang tidak boleh kosong.
- Kunci yang harus berupa Buffer dengan panjang 32 byte.
- Versi dan nama algoritma.
- Format Base64 serta panjang IV dan authentication tag.
- Kesesuaian AAD dengan konteks aplikasi.

Pada proses dekripsi, plaintext hanya dikembalikan setelah verifikasi `decipher.final()` berhasil. Jika autentikasi gagal, proses dekripsi menghasilkan error dan plaintext tidak dikembalikan.

## 6. Format Data Hasil Enkripsi

Hasil enkripsi disimpan dalam bentuk objek yang memuat:
- `versi`
- `algoritma`
- `iv`
- `aad`
- `tag`
- `ciphertext`

Field IV, AAD, tag, dan ciphertext direpresentasikan dalam Base64 agar dapat disimpan atau dipertukarkan sebagai teks.

## 7. Batasan Implementasi

Implementasi ini merupakan komponen kriptografi yang diuji secara terpisah. Keberhasilan pengujian belum membuktikan bahwa seluruh data transaksi pada aplikasi KasVault sudah dienkripsi saat disimpan di database atau ketika dikirim melalui jaringan.
