import { createArray } from "values/Utilitas";
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
const FIRST_TOTAL = 2;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  data.forEach((e) => {
    list[0] += e["total"];
    list[1] += e["jan"];
    list[2] += e["feb"];
    list[3] += e["mar"];
    list[4] += e["apr"];
    list[5] += e["mei"];
    list[6] += e["jun"];
    list[7] += e["jul"];
    list[8] += e["agu"];
    list[9] += e["sep"];
    list[10] += e["okt"];
    list[11] += e["nov"];
    list[12] += e["des"];
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
    ...groups.map((d) => ({
      rowId: d["id"],
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell(d["location"], "padding-left-lg")),
        nonEditable(numberCell(d["total"], "padding-left-lg")),
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
