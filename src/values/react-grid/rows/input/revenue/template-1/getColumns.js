const COL_WIDTH = 110;

export const type1 = [
  {
    columnId: "product_code",
    width: 200,
  },
  {
    columnId: "product_description",
    width: 200,
  },
  { columnId: "jan", width: COL_WIDTH },
  { columnId: "feb", width: COL_WIDTH },
  { columnId: "mar", width: COL_WIDTH },
  { columnId: "apr", width: COL_WIDTH },
  { columnId: "mei", width: COL_WIDTH },
  { columnId: "jun", width: COL_WIDTH },
  { columnId: "jul", width: COL_WIDTH },
  { columnId: "agu", width: COL_WIDTH },
  { columnId: "sep", width: COL_WIDTH },
  { columnId: "okt", width: COL_WIDTH },
  { columnId: "nov", width: COL_WIDTH },
  { columnId: "des", width: COL_WIDTH },
  { columnId: "total", width: COL_WIDTH },
];

export const type2 = [
  {
    columnId: "product_code",
    width: 200,
  },
  {
    columnId: "product_description",
    width: 200,
  },

  { columnId: "jan", width: COL_WIDTH },
  { columnId: "feb", width: COL_WIDTH },
  { columnId: "mar", width: COL_WIDTH },
  { columnId: "apr", width: COL_WIDTH },
  { columnId: "mei", width: COL_WIDTH },
  { columnId: "jun", width: COL_WIDTH },
  { columnId: "jul", width: COL_WIDTH },
  { columnId: "agu", width: COL_WIDTH },
  { columnId: "sep", width: COL_WIDTH },
  { columnId: "okt", width: COL_WIDTH },
  { columnId: "nov", width: COL_WIDTH },
  { columnId: "des", width: COL_WIDTH },

  { columnId: "total_1", width: COL_WIDTH },

  { columnId: "jan_p", width: COL_WIDTH },
  { columnId: "feb_p", width: COL_WIDTH },
  { columnId: "mar_p", width: COL_WIDTH },
  { columnId: "apr_p", width: COL_WIDTH },
  { columnId: "mei_p", width: COL_WIDTH },
  { columnId: "jun_p", width: COL_WIDTH },
  { columnId: "jul_p", width: COL_WIDTH },
  { columnId: "agu_p", width: COL_WIDTH },
  { columnId: "sep_p", width: COL_WIDTH },
  { columnId: "okt_p", width: COL_WIDTH },
  { columnId: "nov_p", width: COL_WIDTH },
  { columnId: "des_p", width: COL_WIDTH },

  { columnId: "total_2", width: COL_WIDTH },
];

export const type3 = [
  {
    columnId: "potongan",
    width: 100,
  },
  {
    columnId: "product_code",
    width: 200,
  },
  {
    columnId: "product_description",
    width: 200,
  },
  { columnId: "jan", width: COL_WIDTH },
  { columnId: "feb", width: COL_WIDTH },
  { columnId: "mar", width: COL_WIDTH },
  { columnId: "apr", width: COL_WIDTH },
  { columnId: "mei", width: COL_WIDTH },
  { columnId: "jun", width: COL_WIDTH },
  { columnId: "jul", width: COL_WIDTH },
  { columnId: "agu", width: COL_WIDTH },
  { columnId: "sep", width: COL_WIDTH },
  { columnId: "okt", width: COL_WIDTH },
  { columnId: "nov", width: COL_WIDTH },
  { columnId: "des", width: COL_WIDTH },
  { columnId: "total", width: COL_WIDTH },
];

export const getColumns = {
  "Stok Awal": type2,
  "Asumsi unit beli": type2,
  "Harga beli per unit": type2,
  "Stok akhir": type2,
  "Asumsi unit jual": type1,
  "Harga jual per unit": type1,
  Penjualan: type1,
  "Potongan penjualan": type3,
};
