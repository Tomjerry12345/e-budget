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

const TOTAL_DATA = 12;
const FIRST_TOTAL = 1;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

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

function getRootHeaderRow() {
  return {
    rowId: HEADER_ROOT_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(
        textCell("Total By Iklan & Advertensi", "justify-content-center text-lg font-bold")
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
    ...groups.map((d, i) => ({
      rowId: i,
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell(d["location_description"], "padding-left-lg")),
        nonEditable(numberCell(d["jan"], "padding-left-lg")),
        nonEditable(numberCell(d["feb"], "padding-left-lg")),
        nonEditable(numberCell(d["mar"], "padding-left-lg")),
        nonEditable(numberCell(d["apr"], "padding-left-lg")),
        nonEditable(numberCell(d["mei"], "padding-left-lg")),
        nonEditable(numberCell(d["jun"], "padding-left-lg")),
        nonEditable(numberCell(d["jul"], "padding-left-lg")),
        nonEditable(numberCell(d["agu"], "padding-left-lg")),
        nonEditable(numberCell(d["sep"], "padding-left-lg")),
        nonEditable(numberCell(d["okt"], "padding-left-lg")),
        nonEditable(numberCell(d["nov"], "padding-left-lg")),
        nonEditable(numberCell(d["des"], "padding-left-lg")),
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

export function getRows({ data }) {
  return [getRootHeaderRow(), ...getGroupRows(data), firstLoadTotalRow(data)];
}

export function fullNewRow(id) {
  return [getRootHeaderRow(), reactgridNewRow(id), rowTotal("Total", createArray(TOTAL_DATA))];
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
    ],
  };
}
