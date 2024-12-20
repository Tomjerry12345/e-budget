import { ROW_HEIGHT } from "./Constant";
import { tableRowTotal } from "values/Colors";

const { nonEditable, textCell, noSideBorders, totalCell } = require("values/react-grid/cells");

function type1(titleTotal, total) {
  return {
    rowId: "row_total",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(
        textCell(titleTotal, "padding-left-lg", {
          background: tableRowTotal,
          fontWeight: "bold",
        })
      ),
      nonEditable(
        textCell("", "padding-left-lg", {
          background: tableRowTotal,
          fontWeight: "bold",
        })
      ),

      ...total.map((e, i) => noSideBorders(totalCell(e, "", tableRowTotal, ""))),
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
          background: tableRowTotal,
          fontWeight: "bold",
        })
      ),

      ...total.map((e, i) => noSideBorders(totalCell(e, "", tableRowTotal, ""))),
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
          background: tableRowTotal,
          fontWeight: "bold",
        })
      ),
      nonEditable(
        textCell("", "padding-left-lg", {
          background: tableRowTotal,
          fontWeight: "bold",
        })
      ),

      ...total.map((e, i) => {
        if (i > 24) {
          return noSideBorders(
            totalCell(i % 2 === 0 ? `${e} %` : e, "", tableRowTotal, "", true, {
              justifyContent: "end",
            })
          );
        } else {
          return noSideBorders(
            totalCell(i % 2 === 1 ? `${e} %` : e, "", tableRowTotal, "", true, {
              justifyContent: "end",
            })
          );
        }
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
          background: tableRowTotal,
          fontWeight: "bold",
        })
      ),
      nonEditable(
        textCell("", "padding-left-lg", {
          background: tableRowTotal,
          fontWeight: "bold",
        })
      ),

      ...total.map((e, i) => noSideBorders(totalCell(e, "", tableRowTotal, "", false))),
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
