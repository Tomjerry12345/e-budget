import { createArray } from "../../../../../values/Utilitas";
import {
  nonEditable,
  textCell,
  numberCell,
  noSideBorders,
  totalCell,
} from "values/react-grid/cells";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 13;
const FIRST_TOTAL = 1;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  data.forEach((e) => {
    list[0] += e["jan"] ?? 0;
    list[1] += e["jan"] ?? 0;
    list[2] += e["feb"] ?? 0;
    list[3] += e["mar"] ?? 0;
    list[4] += e["apr"] ?? 0;
    list[5] += e["mei"] ?? 0;
    list[6] += e["jun"] ?? 0;
    list[7] += e["jul"] ?? 0;
    list[8] += e["agu"] ?? 0;
    list[9] += e["sep"] ?? 0;
    list[10] += e["okt" ?? 0];
    list[11] += e["nov" ?? 0];
    list[12] += e["des" ?? 0];
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

  return rowTotal("Total", list);
};

function getGroupRows(groups) {
  return [
    ...groups.map((d, i) => ({
      rowId: i,
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell(d["location"] ?? "-", "padding-left-lg")),
        nonEditable(numberCell(d["total"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jan"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["feb"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mar"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["apr"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mei"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jun"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jul"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["agu"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["sep"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["okt"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["nov"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["des"] ?? 0, "padding-left-lg")),
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

      ...total.map((e) => noSideBorders(totalCell(e, "", "beige"))),
    ],
  };
}

export function getRows({ header, data }) {
  return [header, ...getGroupRows(data), firstLoadTotalRow(data)];
}

export function fullNewRow(header, id) {
  return [header, reactgridNewRow(id), rowTotal("Total", createArray(TOTAL_DATA))];
}

export function reactgridNewRow(id) {
  return {
    rowId: id,
    newRow: true,
    height: ROW_HEIGHT,
    cells: [
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
    ],
  };
}
