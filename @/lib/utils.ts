import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(angka: any) {
  if (angka == 0) {
    return "Gratis";
  }
  var reverse = angka.toString().split("").reverse().join("");
  var ribuan = reverse.match(/\d{1,3}/g);
  var result = ribuan.join(".").split("").reverse().join("");
  return "Rp" + result;
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
