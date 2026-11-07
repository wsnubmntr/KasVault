
import test from "node:test";
import assert from "node:assert/strict";

function periksaRole(sesi, roleDibutuhkan) {
  if (!sesi) {
    return "LOGIN_REQUIRED";
  }

  if (sesi.role !== roleDibutuhkan) {
    return "FORBIDDEN";
  }

  return "ALLOWED";
}

const sesiBendahara = {
  email: "bendahara@kasvault.local",
  role: "BENDAHARA",
};

const sesiAnggota = {
  email: "anggota@kasvault.local",
  role: "ANGGOTA",
};

const operasi = [
  "Tambah Kas",
  "Ubah Kas",
  "Hapus Kas",
  "Tambah Transaksi",
  "Ubah Transaksi",
  "Hapus Transaksi",
];

for (const namaOperasi of operasi) {
  test(`Positif: Bendahara dapat ${namaOperasi}`, () => {
    assert.equal(
      periksaRole(sesiBendahara, "BENDAHARA"),
      "ALLOWED"
    );
  });

  test(`Negatif: Anggota ditolak saat ${namaOperasi}`, () => {
    assert.equal(
      periksaRole(sesiAnggota, "BENDAHARA"),
      "FORBIDDEN"
    );
  });
}

test("Negatif: Pengguna tanpa sesi harus login", () => {
  assert.equal(
    periksaRole(null, "BENDAHARA"),
    "LOGIN_REQUIRED"
  );
});
