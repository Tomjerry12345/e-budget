export const ROW_HEIGHT = 32;

export const FIRST_TOTAL = {
  "Stok Awal": 2,
  "Asumsi unit beli": 2,
  "Harga beli per unit": 2,
  "Stok akhir": 2,
  "Asumsi unit jual": 2,
  "Harga jual per unit": 2,
  Penjualan: 2,
  "Potongan penjualan": 12,
};

export const TOTAL_DATA = {
  "Stok Awal": 26,
  "Asumsi unit beli": 26,
  "Harga beli per unit": 26,
  "Stok akhir": 26,
  "Asumsi unit jual": 13,
  "Harga jual per unit": 13,
  Penjualan: 13,
  "Potongan penjualan": 12,
};

export const END_TOTAL = (key) => FIRST_TOTAL[key] + TOTAL_DATA[key];
