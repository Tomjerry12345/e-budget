import { tableRowTotal } from "values/Colors";
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
    list[12] += e["total_qty"];
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
        textCell(d["name"] ?? "-", "padding-left-lg"),

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
          background: tableRowTotal,
          fontWeight: "bold",
        })
      ),

      ...total.map((e) => noSideBorders(totalCell(e, "", tableRowTotal))),
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
