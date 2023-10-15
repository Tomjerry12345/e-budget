import {
  nonEditable,
  textCell,
  numberCell,
  totalCell,
  headerCell,
} from "values/react-grid/cells";
import { createArray, generateUID, log } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { tableRowTotal } from "values/Colors";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 18;
const FIRST_TOTAL = 3;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

export function getRootHeaderRow() {
  return [
    {
      rowId: "header",
      cells: [
        headerCell({ text: "Grade" }),
        headerCell({ text: "Sub grade" }),

        headerCell({
          text: "Forecast",
          colspan: 5,
          style: {
            justifyContent: "center",
          },
        }),

        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({ text: "" }),

        headerCell({
          text: "Budget",
          colspan: 13,
          style: {
            justifyContent: "center",
          },
        }),

        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({ text: "" }),
      ],
    },
    {
      rowId: "sub-header",
      cells: [
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({ text: "Sep" }),
        headerCell({ text: "Okt" }),
        headerCell({ text: "Nov" }),
        headerCell({ text: "Des" }),

        headerCell({ text: "Total" }),

        headerCell({ text: "Jan" }),
        headerCell({ text: "Feb" }),
        headerCell({ text: "Mar" }),
        headerCell({ text: "Apr" }),
        headerCell({ text: "Mei" }),
        headerCell({ text: "Jun" }),
        headerCell({ text: "jul" }),
        headerCell({ text: "Agu" }),
        headerCell({ text: "Sep" }),
        headerCell({ text: "Okt" }),
        headerCell({ text: "Nov" }),
        headerCell({ text: "Des" }),

        headerCell({ text: "Total" }),
      ],
    },
  ];
}

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

const formatCell = (d, rowspanGrade) => {
  return [
    ...getColumns().map((e, i) => {
      if (e.type === "text") {
        if (e.nonEditabled === undefined || e.nonEditabled === false) {
          return textCell(d[e.columnId] ?? "", "padding-left-lg");
        } else {
          return nonEditable(textCell(d[e.columnId] ?? "", "padding-left-lg"));
        }
      } else if (e.type === "number") {
        if (e.nonEditabled === undefined || e.nonEditabled === false) {
          return numberCell(d[e.columnId] ?? 0, "padding-left-lg", null, e.format ?? false);
        } else {
          return nonEditable(
            numberCell(d[e.columnId] ?? 0, "padding-left-lg", null, e.format ?? false)
          );
        }
      } else if (e.type === "header") {
        if (i === 0) {
          return headerCell({ text: d[e.columnId][e.columnId], rowspan: rowspanGrade });
        } else if (i === 1) {
          return headerCell({ text: d[e.columnId][e.columnId] });
        } else {
          return headerCell({ text: d[e.columnId] ?? "" });
        }
      }
    }),
  ];
};

function getGroupRows(groups) {
  let currentGrade = null;
  let rowspanGrade = 0;

  const lastData = groups[groups.length - 1];
  const data = groups.slice(0, groups.length - 1);

  let newLastData = [];

  for (let k in lastData) {
    newLastData.push({
      grade: "total",
      sub_grade: "",
      level: k,
      ...lastData[k],
    });
  }

  newLastData = newLastData.slice(0, newLastData.length - 1);

  return [
    ...data.map((d) => {
      const { grade } = d;

      if (grade.grade !== currentGrade) {
        currentGrade = grade.grade;
        rowspanGrade = 4;
      } else {
        rowspanGrade = 1;
      }

      return {
        rowId: d["id"] ?? generateUID(),
        newRow: d["id"] === null,
        height: ROW_HEIGHT,
        cells: formatCell(d, rowspanGrade),
      };
    }),

    ...newLastData.map((d) => {
      return {
        rowId: generateUID(),
        height: ROW_HEIGHT,
        cells: [
          ...getColumns().map((e) => {
            if (e.type === "text") {
              if (e.nonEditabled === undefined || e.nonEditabled === false) {
                return textCell(d[e.columnId] ?? "", "padding-left-lg");
              } else {
                return nonEditable(textCell(d[e.columnId] ?? "", "padding-left-lg"));
              }
            } else if (e.type === "number") {
              if (e.nonEditabled === undefined || e.nonEditabled === false) {
                return numberCell(
                  d[e.columnId] ?? 0,
                  "padding-left-lg",
                  null,
                  e.format ?? false
                );
              } else {
                return nonEditable(
                  numberCell(d[e.columnId] ?? 0, "padding-left-lg", null, e.format ?? false)
                );
              }
            } else if (e.type === "header") {
              return headerCell({ text: d[e.columnId] ?? "" });
            }
          }),
        ],
      };
    }),
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
      nonEditable(
        textCell("", "padding-left-lg", {
          background: tableRowTotal,
        })
      ),
      nonEditable(
        textCell("", "padding-left-lg", {
          background: tableRowTotal,
        })
      ),

      ...total.map((e, i) => totalCell(e, "", tableRowTotal, "", !(i === 0))),
    ],
  };
}

export function getRows({ data }) {
  return [...getRootHeaderRow(), ...getGroupRows(data)];
}

export function fullNewRow() {
  return [getRootHeaderRow()];
}

export function reactgridNewRow() {
  return {
    rowId: generateUID(),
    newRow: true,
    height: ROW_HEIGHT,
    cells: [
      textCell("", "padding-left-lg"),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),

      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
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
