# Bukti Pengujian KasVault

Folder ini berisi screenshot antarmuka KasVault dan hasil audit Lighthouse yang diambil dari aplikasi lokal.

## Screenshot antarmuka

| File | Keterangan |
|---|---|
| `dashboard-desktop.png` | Dashboard pada viewport responsif 1280 × 800. |
| `dashboard-tablet.png` | Dashboard pada viewport 768 × 1280. |
| `dashboard-mobile.png` | Dashboard pada viewport 360 × 800. |
| `transaksi-desktop.png` | Halaman Transaksi pada browser desktop. |
| `tujuan-desktop.png` | Halaman Tujuan Keuangan pada browser desktop. |

## Hasil audit Lighthouse

| File | Halaman | Hasil yang terlihat |
|---|---|---|
| `lighthouse/dashboard-accessibility.png` | Dashboard (`/`) | Accessibility 100/100 |
| `lighthouse/transaksi-accessibility.png` | Transaksi (`/transaksi`) | Accessibility 100/100 |
| `lighthouse/tujuan-accessibility.png` | Tujuan Keuangan (`/tujuan`) | Accessibility 100/100 |

## Catatan

- Screenshot Lighthouse menunjukkan hasil audit otomatis pada saat pengujian dilakukan.
- Lighthouse menyarankan pemeriksaan aksesibilitas manual tambahan; skor otomatis tidak menjamin semua aspek aksesibilitas sudah sempurna.
- Screenshot yang tersedia belum memperlihatkan pesan kesalahan validasi formulir. Tambahkan `validasi-form.png` setelah mengambil screenshot ketika form menampilkan pesan validasi.
- Screenshot ini merupakan bukti visual, bukan laporan Lighthouse HTML lengkap.
