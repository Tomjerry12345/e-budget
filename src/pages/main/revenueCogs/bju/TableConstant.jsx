export const tableList = {
  "Input Penjualan dan Potongan penjualan": [
    {
      description: "Stok Awal",
      endpoint: "detailrevenue/project/firststock",
      endpointPost: "detailrevenue/firststock",
      file: "stock_awal.xlsx",
    },
    {
      description: "Asumsi unit beli",
      endpoint: "detailrevenue/project/purchase-unit-assumption",
      endpointPost: "detailrevenue/purchase-unit-assumption",
      file: "asumsi_unit_beli.xlsx",
    },
    {
      description: "Harga beli per unit",
      endpoint: "detailrevenue/project/purchase-price-unit",
      endpointPost: "detailrevenue/purchase-price-unit",
      file: "harga_beli_unit.xlsx",
    },
    {
      description: "Stok akhir",
      endpoint: "detailrevenue/project/last-stock",
    },
    {
      description: "Asumsi unit jual",
      endpoint: "detailrevenue/project/selling-unit-assumption",
      endpointPost: "detailrevenue/selling-unit-assumption",
      file: "asumsi_unit_jual.xlsx",
    },
    {
      description: "Harga jual per unit",
      endpoint: "detailrevenue/project/selling-price-unit",
      endpointPost: "detailrevenue/selling-price-unit",
      file: "harga_jual_unit.xlsx",
    },
    {
      description: "Penjualan",
      endpoint: "detailrevenue/project/selling",
      endpointPost: "detailrevenue/selling",
    },
    {
      description: "Potongan penjualan",
      endpoint: "detailrevenue/project/sale-discount",
      endpointPost: "detailrevenue/sale-discount",
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
