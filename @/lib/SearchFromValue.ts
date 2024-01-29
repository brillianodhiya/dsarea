// Membuat tipe data untuk objek yang tidak diketahui propertinya
type ObjectItem = Record<string, unknown>;

// Membuat fungsi searchFromValue yang menerima array of object dan nilai pencarian
export function searchFromValue(array: ObjectItem[], value: any): ObjectItem[] {
  // Membuat array kosong untuk menyimpan hasil filter
  let result: ObjectItem[] = [];

  // Mengubah array menjadi Array yang valid dengan operator spread
  array = [...array];

  // Melakukan iterasi untuk setiap objek di array
  for (let obj of array) {
    // Mendapatkan array yang berisi nilai-nilai dari objek
    let values = Object.values(obj);

    // Mengecek apakah ada nilai yang sama dengan nilai pencarian
    let match = values.some((val) => {
      // Mengecek apakah val bertipe string
      if (typeof val === "string") {
        // Melakukan type assertion untuk val sebagai string
        let valString = val as string;

        // Membandingkan valString dengan value dengan mengabaikan huruf besar dan kecil
        return valString.toLowerCase().includes(value.toLowerCase());
      } else if (
        typeof val === "number" ||
        typeof val === "boolean" ||
        typeof val === "bigint"
      ) {
        // Jika val bertipe number, boolean, atau bigint, membandingkan val dengan value
        return val.toString().includes(value.toLowerCase());

        // Jika val bukan bertipe string, mengembalikan false
      }
    });

    // Jika ada nilai yang cocok, menambahkan objek ke array hasil
    if (match) {
      result.push(obj);
    }
  }

  // Mengembalikan array hasil
  return result;
}
