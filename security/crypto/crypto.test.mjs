
import test from "node:test";
import assert from "node:assert/strict";
import { buatKunci, enkripsi, dekripsi } from "./crypto.mjs";

test("enkripsi dan dekripsi transaksi berhasil", () => {
  const kunci = buatKunci();

  const transaksi = JSON.stringify({
    jenis: "pemasukan",
    nominal: 150000,
    keterangan: "Iuran kegiatan",
  });

  const hasilEnkripsi = enkripsi(transaksi, kunci);
  const hasilDekripsi = dekripsi(hasilEnkripsi, kunci);

  assert.equal(hasilDekripsi, transaksi);
  assert.notEqual(hasilEnkripsi.ciphertext, transaksi);
});

test("teks kosong ditolak", () => {
  const kunci = buatKunci();

  assert.throws(() => enkripsi("", kunci), /Teks tidak boleh kosong/);
});

test("ciphertext yang diubah ditolak", () => {
  const kunci = buatKunci();
  const hasilEnkripsi = enkripsi("Data transaksi rahasia", kunci);
  const ciphertext = Buffer.from(hasilEnkripsi.ciphertext, "base64");

  ciphertext[0] = ciphertext[0] ^ 1;

  const dataDiubah = {
    ...hasilEnkripsi,
    ciphertext: ciphertext.toString("base64"),
  };

  assert.throws(() => dekripsi(dataDiubah, kunci));
});

test("kunci yang salah ditolak", () => {
  const kunciBenar = buatKunci();
  const kunciSalah = buatKunci();
  const hasilEnkripsi = enkripsi("Data transaksi rahasia", kunciBenar);

  assert.throws(() => dekripsi(hasilEnkripsi, kunciSalah));
});

test("authentication tag yang diubah ditolak", () => {
  const kunci = buatKunci();
  const hasilEnkripsi = enkripsi("Data transaksi rahasia", kunci);
  const tag = Buffer.from(hasilEnkripsi.tag, "base64");

  tag[0] = tag[0] ^ 1;

  const dataDiubah = {
    ...hasilEnkripsi,
    tag: tag.toString("base64"),
  };

  assert.throws(() => dekripsi(dataDiubah, kunci));
});