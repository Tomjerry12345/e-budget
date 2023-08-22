export const tableList = {
  "Input Penjualan dan Potongan penjualan": [
    {
      description: "Penjualan",
      endpoint: "detailrevenue/bk",
      file: "penjualan.xlsx",
      insert: false,
    },
    // {
    //   description: "Potongan penjualan",
    //   endpoint: "detailrevenue/sale-discount",
    //   insert: false,
    // },
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
