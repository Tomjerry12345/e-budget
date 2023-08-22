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

const TOTAL_DATA = 26;
const FIRST_TOTAL = 2;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

export function getRootHeaderRow() {
  return [
    {
      rowId: "header",
      cells: [
        headerCell({
          text: "Account",
          style: {
            justifyContent: "center",
            fontWeight: 600,
          },
        }),
        headerCell({
          text: "Description",
          style: {
            justifyContent: "center",
            fontWeight: 600,
          },
        }),

        headerCell({
          text: "Forecast",
          colspan: 12,
          style: {
            justifyContent: "center",
            fontWeight: 600,
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

        headerCell({
          text: "Budget",
          colspan: 12,
          style: {
            justifyContent: "center",
            fontWeight: 600,
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

        headerCell({ text: "jan" }),
        headerCell({ text: "feb" }),
        headerCell({ text: "mar" }),
        headerCell({ text: "apr" }),
        headerCell({ text: "mei" }),
        headerCell({ text: "jun" }),
        headerCell({ text: "jul" }),
        headerCell({ text: "agu" }),
        headerCell({ text: "sep" }),
        headerCell({ text: "okt" }),
        headerCell({ text: "nov" }),
        headerCell({ text: "des" }),

        headerCell({ text: "Total" }),

        headerCell({ text: "jan" }),
        headerCell({ text: "feb" }),
        headerCell({ text: "mar" }),
        headerCell({ text: "apr" }),
        headerCell({ text: "mei" }),
        headerCell({ text: "jun" }),
        headerCell({ text: "jul" }),
        headerCell({ text: "agu" }),
        headerCell({ text: "sep" }),
        headerCell({ text: "okt" }),
        headerCell({ text: "nov" }),
        headerCell({ text: "des" }),

        headerCell({ text: "Total" }),
      ],
    },
  ];
}

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  data.forEach((e) => {
    if (e !== null) {
      list[0] += e["jan"] ?? 0;
      list[1] += e["feb"] ?? 0;
      list[2] += e["mar"] ?? 0;
      list[3] += e["apr"] ?? 0;
      list[4] += e["mei"] ?? 0;
      list[5] += e["jun"] ?? 0;
      list[6] += e["jul"] ?? 0;
      list[7] += e["agu"] ?? 0;
      list[8] += e["sep"] ?? 0;
      list[9] += e["okt"] ?? 0;
      list[10] += e["nov"] ?? 0;
      list[11] += e["des"] ?? 0;
      list[12] += e["total_1"] ?? 0;
      list[13] += e["jan_p"] ?? 0;
      list[14] += e["feb_p"] ?? 0;
      list[15] += e["mar_p"] ?? 0;
      list[16] += e["apr_p"] ?? 0;
      list[17] += e["mei_p"] ?? 0;
      list[18] += e["jun_p"] ?? 0;
      list[19] += e["jul_p"] ?? 0;
      list[20] += e["agu_p"] ?? 0;
      list[21] += e["sep_p"] ?? 0;
      list[22] += e["okt_p"] ?? 0;
      list[23] += e["nov_p"] ?? 0;
      list[24] += e["des_p"] ?? 0;
      list[25] += e["total_2"] ?? 0;
    }
  });
  return rowTotal("Total", list);
};

export const updateTotalRow = (data) => {
  const newData = data.slice(1, data.length - 1);

  const list = newData
    .map((e) => {
      const values = [];
      for (let i = FIRST_TOTAL; i < END_TOTAL; i++) {
        values.push(e.cells[i].value ?? 0);
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
      rowId: d["id"] ?? generateUID(),
      newRow: d["id"] === null,
      height: ROW_HEIGHT,
      parent: d.parent,
      cells: [
        ...getColumns().map((e) => {
          let style = null;

          if (d.parent === true) {
            e.nonEditabled = true;
            style = {
              fontWeight: "bold",
            };
          }
          if (e.type === "text") {
            if (e.nonEditabled === undefined || e.nonEditabled === false) {
              return textCell(d[e.columnId] ?? "", "padding-left-lg");
            } else {
              return nonEditable(textCell(d[e.columnId] ?? "", "padding-left-lg", style));
            }
          } else if (e.type === "number") {
            if (e.nonEditabled === undefined || e.nonEditabled === false) {
              return numberCell(d[e.columnId] ?? 0, "padding-left-lg", null, e.format ?? false);
            } else {
              return nonEditable(
                numberCell(d[e.columnId] ?? 0, "padding-left-lg", style, e.format ?? false)
              );
            }
          }
        }),
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

      ...total.map((e, i) => totalCell(e, "", "beige", "", !(i === 0))),
    ],
  };
}

export function getRows({ data }) {
  return [...getRootHeaderRow(), ...getGroupRows(data), firstLoadTotalRow(data)];
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
