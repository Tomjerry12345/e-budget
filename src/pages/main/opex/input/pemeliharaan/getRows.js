import { createArray, log } from "../../../../../values/Utilitas";
import {
  emptyTextCell,
  nonEditable,
  textCell,
  monthHeaderCell,
  numberCell,
  noSideBorders,
  rootHeaderCell,
  totalCell,
} from "../../../../../values/react-grid/cells";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const COLOR_1 = "#107C41";
const COLOR_2 = "#107C41";

const firstLoadTotalRow = (data) => {
  const list = createArray(27);

  data.forEach((e) => {
    list[0] += e["jan"];
    list[1] += e["feb"];
    list[2] += e["mar"];
    list[3] += e["apr"];
    list[4] += e["mei"];
    list[5] += e["jun"];
    list[6] += e["jul"];
    list[7] += e["agu"];
    list[8] += e["sep"];
    list[9] += e["okt"];
    list[10] += e["nov"];
    list[11] += e["des"];
    list[12] += e["total_qty"];
    list[13] += e["rates"];
    list[14] += e["total"];
    list[15] += e["jan_rates"];
    list[16] += e["feb_rates"];
    list[17] += e["mar_rates"];
    list[18] += e["apr_rates"];
    list[19] += e["mei_rates"];
    list[20] += e["jun_rates"];
    list[21] += e["jul_rates"];
    list[22] += e["agu_rates"];
    list[23] += e["sep_rates"];
    list[24] += e["okt_rates"];
    list[25] += e["nov_rates"];
    list[26] += e["des_rates"];
  });

  return rowTotal("Total", list);
};

export const updateTotalRow = (data) => {
  const newData = data.slice(1, data.length - 1);

  const list = newData
    .map((e) => {
      const values = [];
      for (let i = 3; i < 30; i++) {
        values.push(e.cells[i].value);
      }
      return values;
    })
    .reduce((acc, curr) => acc.map((v, i) => v + curr[i]), createArray(27));

  return rowTotal("Total", list);
};

function getRootHeaderRow() {
  return {
    rowId: HEADER_ROOT_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(
        textCell("Description", "justify-content-center text-lg font-bold")
      ),
      nonEditable(
        textCell("Aktivitas", "justify-content-center text-lg font-bold")
      ),
      nonEditable(
        textCell("Cost Driver", "justify-content-center text-lg font-bold")
      ),

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

      nonEditable(
        textCell("Jumlah Bulan", "justify-content-center text-lg font-bold")
      ),
      nonEditable(
        textCell("Tarif", "justify-content-center text-lg font-bold")
      ),
      nonEditable(
        rootHeaderCell(
          "Total Maintenance Cost",
          "justify-content-center",
          COLOR_2
        )
      ),

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
    ],
  };
}

function getGroupRows(groups) {
  return [
    ...groups.map((d) => ({
      rowId: d["id"],
      height: ROW_HEIGHT,
      cells: [
        textCell(d["name"], "padding-left-lg"),
        textCell(d["activity"] ?? "-", "padding-left-lg"),
        textCell(d["cost_driver"] ?? "-", "padding-left-lg"),
        numberCell(d["jan"], "padding-left-lg"),
        numberCell(d["feb"], "padding-left-lg"),
        numberCell(d["mar"], "padding-left-lg"),
        numberCell(d["apr"], "padding-left-lg"),
        numberCell(d["mei"], "padding-left-lg"),
        numberCell(d["jun"], "padding-left-lg"),
        numberCell(d["jul"], "padding-left-lg"),
        numberCell(d["agu"], "padding-left-lg"),
        numberCell(d["sep"], "padding-left-lg"),
        numberCell(d["okt"], "padding-left-lg"),
        numberCell(d["nov"], "padding-left-lg"),
        numberCell(d["des"], "padding-left-lg"),

        nonEditable(numberCell(d["total_qty"], "padding-left-lg")),
        numberCell(d["rates"], "padding-left-lg"),
        nonEditable(numberCell(d["total"], "padding-left-lg")),
        // Tahun 2
        nonEditable(numberCell(d["jan_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["feb_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["mar_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["apr_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["mei_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["jun_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["jul_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["agu_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["sep_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["okt_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["nov_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["des_rates"], "padding-left-lg")),
      ],
    })),
  ];
}

function rowTotal(titleTotal, total) {
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
        })
      ),
      nonEditable(
        textCell("", "padding-left-lg", {
          background: "beige",
        })
      ),

      ...total.map((e) => noSideBorders(totalCell(e, "", "beige"))),
    ],
  };
}

export function getRows({ data }) {
  return [getRootHeaderRow(), ...getGroupRows(data), firstLoadTotalRow(data)];
}

export function fullNewRow(id) {
  return [
    getRootHeaderRow(),
    reactgridNewRow(id),
    rowTotal("Total", createArray(27)),
  ];
}

export function reactgridNewRow(id) {
  return {
    rowId: id,
    newRow: true,
    height: ROW_HEIGHT,
    cells: [
      textCell("", "padding-left-lg"),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),

      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      // Tahun 2
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
    ],
  };
}