import {
  nonEditable,
  textCell,
  monthHeaderCell,
  numberCell,
  totalCell,
  headerCell,
} from "values/react-grid/cells";
import { createArray, generateUID, log } from "values/Utilitas";
import { getColumns } from "./getColumns";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 18;
const FIRST_TOTAL = 3;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

const COLOR_1 = "#107C41";

export function getRootHeaderRow() {
  return {
    rowId: HEADER_ROOT_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Code", "justify-content-center font-bold")),
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

      nonEditable(monthHeaderCell(`Total`, "justify-content-center")),

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

      nonEditable(monthHeaderCell(`Total`, "justify-content-center")),
    ],
  };
}

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  list[3] = "";
  list[4] = "";
  data.forEach((e) => {
    list[0] += e["amount"] ?? 0;
    list[1] += e["rates"] ?? 0;
    list[2] += e["total"] ?? 0;
    list[5] += e["grand_total"] ?? 0;
    list[6] += e["jan_rates"] ?? 0;
    list[7] += e["feb_rates"] ?? 0;
    list[8] += e["mar_rates"] ?? 0;
    list[9] += e["apr_rates"] ?? 0;
    list[10] += e["mei_rates"] ?? 0;
    list[11] += e["jun_rates"] ?? 0;
    list[12] += e["jul_rates"] ?? 0;
    list[13] += e["agu_rates"] ?? 0;
    list[14] += e["sep_rates"] ?? 0;
    list[15] += e["okt_rates"] ?? 0;
    list[16] += e["nov_rates"] ?? 0;
    list[17] += e["des_rates"] ?? 0;
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
  let currentGrade = null;
  let currentSubGrade = null;
  let rowspanGrade = 0;
  let rowspanSubGrade = 0;

  return [
    ...groups.map((d) => {
      const { grade, sub_grade } = d;

      if (grade.grade !== currentGrade) {
        currentGrade = grade.grade;
        rowspanGrade = 12; // Set rowspan to 4 for the first occurrence of a grade
      } else {
        rowspanGrade = 1; // Set rowspan to 1 for subsequent occurrences of the same grade
      }

      if (sub_grade.sub_grade !== currentSubGrade) {
        currentSubGrade = sub_grade.sub_grade;
        rowspanSubGrade = 3; // Set rowspan to 4 for the first occurrence of a grade
      } else {
        rowspanSubGrade = 1; // Set rowspan to 1 for subsequent occurrences of the same grade
      }

      return {
        rowId: d["id"] ?? generateUID(),
        newRow: d["id"] === null,
        height: ROW_HEIGHT,
        cells: [
          ...getColumns().map((e, i) => {
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
              if (i === 0) {
                return headerCell({ text: d[e.columnId][e.columnId], rowspan: rowspanGrade });
              } else if (i === 1) {
                return headerCell({
                  text: d[e.columnId][e.columnId],
                  rowspan: rowspanSubGrade,
                });
              } else if (i === 2) {
                return headerCell({ text: d[e.columnId][e.columnId] });
              } else {
                headerCell({ text: d[e.columnId] ?? "" });
              }
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

      ...total.map((e, i) => totalCell(e, "", "beige", "", !(i === 0))),
    ],
  };
}

export function getRows({ data }) {
  return [
    getRootHeaderRow(),
    ...getGroupRows(data),
    // firstLoadTotalRow(data)
  ];
}

export function fullNewRow() {
  const list = createArray(TOTAL_DATA);
  return [
    getRootHeaderRow(),
    // reactgridNewRow(),
    // rowTotal("Total", list)
  ];
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
