export const tableList = {
  "Input Penjualan dan Potongan penjualan": [
    {
      description: "Stok Awal",
      endpoint: "detailrevenue/project/firststock",
      insert: true,
      file: "stock_awal.xlsx",
    },
    {
      description: "Asumsi unit beli",
      endpoint: "detailrevenue/project/purchase-unit-assumption",
      insert: true,
      file: "asumsi_unit_beli.xlsx",
    },
    {
      description: "Harga beli per unit",
      endpoint: "detailrevenue/project/purchase-price-unit",
      insert: true,
      file: "harga_beli_unit.xlsx",
    },
    {
      description: "Stok akhir",
      endpoint: "detailrevenue/project/last-stock",
      insert: false,
    },
    {
      description: "Asumsi unit jual",
      endpoint: "detailrevenue/project/selling-unit-assumption",
      insert: true,
      file: "asumsi_unit_jual.xlsx",
    },
    {
      description: "Harga jual per unit",
      endpoint: "detailrevenue/project/selling-price-unit",
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
