export const tableList = {
  "Input Penjualan dan Potongan penjualan": [
    {
      description: "Stok Awal",
      endpoint: "detailrevenue/firststock",
      insert: true,
      file: "stock_awal.xlsx",
    },
    {
      description: "Asumsi unit beli",
      endpoint: "detailrevenue/purchase-unit-assumption",
      insert: true,
      file: "asumsi_unit_beli.xlsx",
    },
    {
      description: "Harga beli per unit",
      endpoint: "detailrevenue/purchase-price-unit",
      insert: true,
      file: "harga_beli_unit.xlsx",
    },
    {
      description: "Stok akhir",
      endpoint: "detailrevenue/last-stock",
      insert: false,
    },
    {
      description: "Asumsi trip",
      endpoint: "detailrevenue/trip-assumption",
      insert: true,
      file: "asumsi_unit_jual.xlsx",
    },
    {
      description: "Volume / Unit",
      endpoint: "detailrevenue/selling-unit-assumption",
      insert: true,
      file: "asumsi_unit_jual.xlsx",
    },
    {
      description: "Tarif",
      endpoint: "detailrevenue/selling-price-unit",
      insert: true,
      file: "harga_jual_unit.xlsx",
    },
    {
      description: "Penjualan",
      endpoint: "detailrevenue/selling",
      insert: false,
    },
    {
      description: "Potongan penjualan",
      endpoint: "detailrevenue/sale-discount",
      insert: false,
    },
  ],

  "Input HPP dan pendapatan lainnya": [
    {
      description: "Pendapatan Operasional Lainnya",
      endpoint: "detailrevenueother/pendapatan-lainnya",
      insert: true,
      file: "pendapatan_lainnya.xlsx",
    },
    {
      description: "HPP Variable",
      endpoint: "detailrevenueother/hpp-variable",
      insert: true,
      // file: "hpp_variable.xlsx",
    },
    {
      description: "HPP Lainnya",
      endpoint: "detailrevenueother/hpp-lainnya",
      insert: true,
      file: "hpp_lainnya.xlsx",
    },
  ],
};
