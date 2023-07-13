const { nonEditable, textCell, monthHeaderCell } = require("values/react-grid/cells");

const ROW_HEIGHT = 32;
const HEADER_ROOT_ROW_ID = "header-root";

const type1 = {
  rowId: HEADER_ROOT_ROW_ID,
  height: ROW_HEIGHT,
  cells: [
    nonEditable(textCell("Code", "justify-content-center font-bold")),
    nonEditable(textCell("Description", "justify-content-center font-bold")),

    nonEditable(monthHeaderCell(`Jan`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Feb`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Mar`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Apr`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Mei`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Jun`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Jul`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Agu`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Sep`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Okt`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Nov`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Des`, "justify-content-center")),

    nonEditable(monthHeaderCell(`Total`, "justify-content-center")),

    nonEditable(monthHeaderCell(`Jan`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Feb`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Mar`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Apr`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Mei`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Jun`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Jul`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Agu`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Sep`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Okt`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Nov`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Des`, "justify-content-center")),

    nonEditable(monthHeaderCell(`Total`, "justify-content-center")),
  ],
};

const type2 = {
  rowId: HEADER_ROOT_ROW_ID,
  height: ROW_HEIGHT,
  cells: [
    nonEditable(textCell("Code", "justify-content-center font-bold")),
    nonEditable(textCell("Description", "justify-content-center font-bold")),

    nonEditable(monthHeaderCell(`Jan`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Feb`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Mar`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Apr`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Mei`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Jun`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Jul`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Agu`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Sep`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Okt`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Nov`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Des`, "justify-content-center")),

    nonEditable(monthHeaderCell(`Total`, "justify-content-center")),

    nonEditable(monthHeaderCell(`Jan`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Feb`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Mar`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Apr`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Mei`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Jun`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Jul`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Agu`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Sep`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Okt`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Nov`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Des`, "justify-content-center")),

    nonEditable(monthHeaderCell(`Total`, "justify-content-center")),
  ],
};

const type3 = {
  rowId: HEADER_ROOT_ROW_ID,
  height: ROW_HEIGHT,
  cells: [
    nonEditable(textCell("Potongan", "justify-content-center font-bold")),
    nonEditable(textCell("Code", "justify-content-center font-bold")),
    nonEditable(textCell("Description", "justify-content-center font-bold")),

    nonEditable(monthHeaderCell(`Jan`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Feb`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Mar`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Apr`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Mei`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Jun`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Jul`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Agu`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Sep`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Okt`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Nov`, "justify-content-center")),
    nonEditable(monthHeaderCell(`Des`, "justify-content-center")),

    nonEditable(monthHeaderCell(`Total`, "justify-content-center")),
  ],
};

export const getHeaderRow = {
  "Stok Awal": type1,
  "Asumsi unit beli": type1,
  "Harga beli per unit": type1,
  "Stok akhir": type1,
  "Asumsi unit jual": type1,
  "Harga jual per unit": type1,
  Penjualan: type1,
  // "Potongan penjualan": type5,
};
