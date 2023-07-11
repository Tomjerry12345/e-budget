import { ROW_HEIGHT } from "./Constant";

const {
  nonEditable,
  textCell,
  noSideBorders,
  totalCell,
} = require("values/react-grid/cells");

function type1(titleTotal, total) {
  return {
    rowId: "row_total",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(
        textCell(titleTotal, "padding-left-lg", {
          background: "beige",
          fontWeight: "bold",
        })
      ),
      nonEditable(
        textCell("", "padding-left-lg", {
          background: "beige",
          fontWeight: "bold",
        })
      ),

      ...total.map((e, i) => noSideBorders(totalCell(e, "", "beige", ""))),
    ],
  };
}

function type2(titleTotal, total) {
  return {
    rowId: "row_total",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(
        textCell(titleTotal, "padding-left-lg", {
          background: "beige",
          fontWeight: "bold",
        })
      ),
      nonEditable(
        textCell("", "padding-left-lg", {
          background: "beige",
          fontWeight: "bold",
        })
      ),
      nonEditable(
        textCell("", "padding-left-lg", {
          background: "beige",
          fontWeight: "bold",
        })
      ),

      ...total.map((e, i) => noSideBorders(totalCell(e, "", "beige", ""))),
    ],
  };
}

export const rowTotal = (titleTotal, data, key) => {
  const l = {
    "Stok Awal": type1(titleTotal, data),
    "Asumsi unit beli": type1(titleTotal, data),
    "Harga beli per unit": type1(titleTotal, data),
    "Stok akhir": type1(titleTotal, data),
    "Asumsi unit jual": type1(titleTotal, data),
    "Harga jual per unit": type1(titleTotal, data),
    // Penjualan: type1(titleTotal, data),
    // "Potongan penjualan": type2(titleTotal, data),
  };

  return l[key];
};
