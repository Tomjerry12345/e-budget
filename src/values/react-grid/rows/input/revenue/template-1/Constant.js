export const ROW_HEIGHT = 32;

export const FIRST_TOTAL = {
  "Stok Awal": 2,
  "Asumsi unit beli": 2,
  "Harga beli per unit": 2,
  "Stok akhir": 2,
  "Asumsi unit jual": 2,
  "Harga jual per unit": 2,
  "Volume / Unit": 2,
  Tarif: 2,
  "Asumsi trip": 2,
  Penjualan: 2,
  "Potongan penjualan": 2,
  "Pendapatan Operasional Lainnya": 2,
  "HPP Variable": 2,
  "HPP Lainnya": 2,
};

export const TOTAL_DATA = {
  "Stok Awal": 26,
  "Asumsi unit beli": 26,
  "Harga beli per unit": 26,
  "Stok akhir": 26,
  "Asumsi unit jual": 26,
  "Harga jual per unit": 26,
  "Volume / Unit": 26,
  Tarif: 26,
  "Asumsi trip": 26,
  Penjualan: 26,
  "Potongan penjualan": 26,
  "Pendapatan Operasional Lainnya": 26,
  "HPP Variable": 26,
  "HPP Lainnya": 26,
};

export const END_TOTAL = (key) => FIRST_TOTAL[key] + TOTAL_DATA[key];
