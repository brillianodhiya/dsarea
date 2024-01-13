import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(angka: any) {
  var reverse = angka.toString().split("").reverse().join("");
  var ribuan = reverse.match(/\d{1,3}/g);
  var result = ribuan.join(".").split("").reverse().join("");
  return "Rp " + result;
}