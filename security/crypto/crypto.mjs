
import crypto from "node:crypto";

const ALGORITMA = "aes-256-gcm";
const PANJANG_KUNCI = 32;
const PANJANG_IV = 12;
const PANJANG_TAG = 16;

export function buatKunci() {
  return crypto.randomBytes(PANJANG_KUNCI);
}

export function enkripsi(teks, kunci) {
  if (typeof teks !== "string" || teks.length === 0) {
    throw new Error("Teks tidak boleh kosong.");
  }

  if (!Buffer.isBuffer(kunci) || kunci.length !== PANJANG_KUNCI) {
    throw new Error("Kunci harus berupa Buffer 32 byte.");
  }

  const iv = crypto.randomBytes(PANJANG_IV);
  const cipher = crypto.createCipheriv(ALGORITMA, kunci, iv);

  const ciphertext = Buffer.concat([
    cipher.update(teks, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return {
    versi: 1,
    algoritma: ALGORITMA,
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  };
}

export function dekripsi(data, kunci) {
  if (!Buffer.isBuffer(kunci) || kunci.length !== PANJANG_KUNCI) {
    throw new Error("Kunci harus berupa Buffer 32 byte.");
  }

  if (
    !data ||
    data.versi !== 1 ||
    data.algoritma !== ALGORITMA ||
    typeof data.iv !== "string" ||
    typeof data.tag !== "string" ||
    typeof data.ciphertext !== "string"
  ) {
    throw new Error("Format data terenkripsi tidak valid.");
  }

  const iv = Buffer.from(data.iv, "base64");
  const tag = Buffer.from(data.tag, "base64");
  const ciphertext = Buffer.from(data.ciphertext, "base64");

  if (
    iv.length !== PANJANG_IV ||
    tag.length !== PANJANG_TAG ||
    ciphertext.toString("base64") !== data.ciphertext ||
    iv.toString("base64") !== data.iv ||
    tag.toString("base64") !== data.tag
  ) {
    throw new Error("Format data terenkripsi tidak valid.");
  }

  const decipher = crypto.createDecipheriv(ALGORITMA, kunci, iv);
  decipher.setAuthTag(tag);

  const teks = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return teks.toString("utf8");
}
