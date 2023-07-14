import {
  nonEditable,
  textCell,
  monthHeaderCell,
  numberCell,
  noSideBorders,
  totalCell,
} from "values/react-grid/cells";
import { createArray, log } from "values/Utilitas";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 12;
const FIRST_TOTAL = 2;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

export function getRootHeaderRow() {
  return {
    rowId: HEADER_ROOT_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Account", "justify-content-center font-bold")),
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
    ],
  };
}

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  data.forEach((e) => {
    list[0] += e["jan"] ?? 0;
    list[1] += e["feb"] ?? 0;
    list[2] += e["mar"] ?? 0;
    list[3] += e["apr"] ?? 0;
    list[4] += e["mei"] ?? 0;
    list[5] += e["jun"] ?? 0;
    list[6] += e["jul"] ?? 0;
    list[7] += e["aug"] ?? 0;
    list[8] += e["sep"] ?? 0;
    list[9] += e["okt"] ?? 0;
    list[10] += e["nov"] ?? 0;
    list[11] += e["des"] ?? 0;
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
      rowId: d["account"],
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell(d["account"], "padding-left-lg")),
        nonEditable(textCell(d["description"] ?? "-", "padding-left-lg")),

        nonEditable(numberCell(d["jan"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["feb"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mar"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["apr"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mei"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jun"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jul"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["aug"] ?? 0, "padding-left-lg")),
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
      nonEditable(
        textCell("", "padding-left-lg", {
          background: "beige",
        })
      ),

      ...total.map((e, i) => noSideBorders(totalCell(e, "", "beige", ""))),
    ],
  };
}

export function getRows({ data }) {
  return [getRootHeaderRow(), ...getGroupRows(data), firstLoadTotalRow(data)];
}

export function fullNewRow({ id }) {
  const list = createArray(TOTAL_DATA);
  return [getRootHeaderRow(), reactgridNewRow(id), rowTotal("Total", list)];
}

export function reactgridNewRow(id) {
  return {
    rowId: id,
    newRow: true,
    height: ROW_HEIGHT,
    cells: [
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
    ],
  };
}
