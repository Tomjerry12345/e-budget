export const tableList = {
  "Input Penjualan dan Potongan penjualan": [
    {
      description: "All data",
      key: "All data",
      endpoint: "detailrevenue/bsu",
      endpointChange: "detailrevenue/bsu",
      insert: false,
      file: "all_data.xlsx",
    },
    {
      description: "Potongan penjualan",
      // key: "Potongan penjualan 1",
      endpoint: "detailrevenue/bsu-sale-discount",
      endpointChange: "detailrevenue/sale-discount",
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
