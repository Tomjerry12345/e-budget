import {
  nonEditable,
  textCell,
  monthHeaderCell,
  rootHeaderCell,
  numberCell,
  noSideBorders,
  totalCell,
} from "values/react-grid/cells";
import { createArray, log } from "values/Utilitas";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 13;
const FIRST_TOTAL = 3;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

const COLOR_1 = "#107C41";

export function getRootHeaderRow() {
  return {
    rowId: HEADER_ROOT_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Name", "justify-content-center text-lg font-bold")),

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

      nonEditable(rootHeaderCell(`Total`, "justify-content-center", COLOR_1)),
    ],
  };
}

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  data.forEach((e) => {
    list[0] += e["jan_actual"] ?? 0;
    list[1] += e["feb_actual"] ?? 0;
    list[2] += e["mar_actual"] ?? 0;
    list[3] += e["apr_actual"] ?? 0;
    list[4] += e["mei_actual"] ?? 0;
    list[5] += e["jun_actual"] ?? 0;
    list[6] += e["jul_actual"] ?? 0;
    list[7] += e["agu_actual"] ?? 0;
    list[8] += e["sep_actual"] ?? 0;
    list[9] += e["okt_actual"] ?? 0;
    list[10] += e["nov_forecast"] ?? 0;
    list[11] += e["des_forecast"] ?? 0;
    list[12] += e["total"] ?? 0;
  });

  return rowTotal("Total", list);
};

export const updateTotalRow = (data) => {
  const newData = data.slice(1, data.length - 1);

  const list = newData
    .map((e) => {
      const values = [];
      for (let i = FIRST_TOTAL; i < END_TOTAL; i++) {
        values.push(e.cells[i].value);
      }
      return values;
    })
    .reduce((acc, curr) => acc.map((v, i) => v + curr[i]), createArray(TOTAL_DATA));

  log({ list });
  return rowTotal("Total", list);
};

function getGroupRows(groups) {
  return [
    ...groups.map((d) => ({
      rowId: d["id"],
      height: ROW_HEIGHT,
      cells: [
        textCell(d["description"], "padding-left-lg"),

        nonEditable(numberCell(d["jan_actual"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["feb_actual"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mar_actual"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["apr_actual"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mei_actual"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jun_actual"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jul_actual"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["agu_actual"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["sep_actual"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["okt_actual"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["nov_forecast"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["des_forecast"] ?? 0, "padding-left-lg")),

        nonEditable(numberCell(d["grand_total"] ?? 0, "padding-left-lg")),
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

      ...total.map((e, i) => noSideBorders(totalCell(e, "", "beige", ""))),
    ],
  };
}

export function getRows({ header, data }) {
  return [header, ...getGroupRows(data), firstLoadTotalRow(data)];
}

export function fullNewRow(header, id) {
  const list = createArray(TOTAL_DATA);
  list[5] = "";
  return [header, reactgridNewRow(id), rowTotal("Total", list)];
}

export function reactgridNewRow(id) {
  return {
    rowId: id,
    newRow: true,
    height: ROW_HEIGHT,
    cells: [
      textCell("", "padding-left-lg"),

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
    ],
  };
}
