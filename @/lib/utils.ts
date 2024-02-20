import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(angka: any) {
  if (angka) {
    if (angka == 0) {
      return "Gratis";
    }
    var reverse = angka.toString().split("").reverse().join("");
    var ribuan = reverse.match(/\d{1,3}/g);
    var result = ribuan.join(".").split("").reverse().join("");
    return "Rp" + result;
  } else {
    return "Gratis";
  }
}

// Fungsi untuk memeriksa apakah tanggal valid
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

// Fungsi untuk memeriksa apakah tanggal sudah lewat dari tanggal sekarang
function isPastDate(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
}

// Fungsi untuk mengembalikan "active" atau "expired" berdasarkan input tanggal
export function getStatus(dateString: string): string {
  // Jika tanggal tidak valid, kembalikan "invalid"
  if (!isValidDate(dateString)) {
    return "invalid";
  }
  // Jika tanggal sudah lewat, kembalikan "expired"
  if (isPastDate(dateString)) {
    return "expired";
  }
  // Jika tanggal masih berlaku, kembalikan "active"
  return "active";
}

// Membuat array warna

// Membuat fungsi untuk memilih satu data acak dari array
export function pickRandomItem() {
  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];
  // Menghasilkan indeks acak antara 0 dan panjang array - 1
  const randIndex = Math.floor(Math.random() * colors.length);
  // Mengembalikan data pada indeks acak tersebut
  return colors[randIndex];
}

export function formatAngka(angka: any) {
  const satuan = ["", "rb", "jt", "M"]; // Satuan ribu, juta, dan jutaan

  let formattedAngka = angka;

  // Menentukan satuan yang sesuai
  let satuanIndex = 0;
  while (formattedAngka >= 1000 && satuanIndex < satuan.length - 1) {
    formattedAngka /= 1000;
    satuanIndex++;
  }

  // Format angka dengan dua digit di belakang koma dan satuan yang sesuai
  formattedAngka = formattedAngka?.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Tambahkan satuan ke angka yang sudah diformat
  formattedAngka += " " + satuan[satuanIndex];

  return formattedAngka;
}

export const sensorEmail = (email = "") => {
  const [name, domain] = email.split("@");
  const maskedName = name.substring(0, 3) + "**";
  const maskedEmail = maskedName + "@" + domain;
  return maskedEmail;
};
