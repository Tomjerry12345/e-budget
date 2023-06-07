export const ROW_HEIGHT = 32;

export const FIRST_TOTAL = {
  "Stok Awal": 12,
  "Asumsi unit beli": 12,
  "Harga beli per unit": 12,
  "Stok akhir": 12,
  "Asumsi unit jual": 12,
  "Harga jual per unit": 12,
  Penjualan: 12,
  "Potongan penjualan": 12,
};

export const TOTAL_DATA = {
  "Stok Awal": 12,
  "Asumsi unit beli": 12,
  "Harga beli per unit": 12,
  "Stok akhir": 12,
  "Asumsi unit jual": 12,
  "Harga jual per unit": 12,
  Penjualan: 12,
  "Potongan penjualan": 12,
};

export const END_TOTAL = (key) => FIRST_TOTAL[key] + TOTAL_DATA[key];
