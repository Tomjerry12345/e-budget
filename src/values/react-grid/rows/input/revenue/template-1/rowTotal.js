import { ROW_HEIGHT } from "./Constant";

const { nonEditable, textCell, noSideBorders, totalCell } = require("values/react-grid/cells");

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

      ...total.map((e, i) => noSideBorders(totalCell(e, "", "beige", ""))),
    ],
  };
}

function type3(titleTotal, total) {
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

      ...total.map((e, i) => {
        return noSideBorders(
          totalCell(i % 2 === 1 ? `${e} %` : e, "", "beige", "", true, {
            justifyContent: "end",
          })
        );
      }),
    ],
  };
}

function type4(titleTotal, total) {
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

      ...total.map((e, i) => noSideBorders(totalCell(e, "", "beige", "", false))),
    ],
  };
}

export const rowTotal = (titleTotal, data, key) => {
  const l = {
    "Stok Awal": type4(titleTotal, data),
    "Asumsi unit beli": type4(titleTotal, data),
    "Harga beli per unit": type1(titleTotal, data),
    "Stok akhir": type4(titleTotal, data),
    "Asumsi unit jual": type4(titleTotal, data),
    "Harga jual per unit": type1(titleTotal, data),
    "Volume / Unit": type1(titleTotal, data),
    Tarif: type1(titleTotal, data),
    "Asumsi trip": type1(titleTotal, data),
    Penjualan: type1(titleTotal, data),
    "All data": type2(titleTotal, data),
    "Potongan penjualan": type3(titleTotal, data),
    "Pendapatan Operasional Lainnya": type1(titleTotal, data),
    "HPP Variable": type3(titleTotal, data),
    "HPP Lainnya": type1(titleTotal, data),
  };

  return l[key];
};
