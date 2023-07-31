import {
  nonEditable,
  textCell,
  rootHeaderCell,
  numberCell,
  headerCell,
} from "values/react-grid/cells";
import { createArray, generateUID, log } from "values/Utilitas";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 2;
const FIRST_TOTAL = 2;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

export function getRootHeaderRow() {
  return [
    {
      rowId: "header",
      cells: [
        // headerCell({ text: "" }),

        headerCell({
          text: "Forecast",
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({
          text: "Budget",
          colspan: 12,
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
      ],
    },
    {
      rowId: "sub-header",
      cells: [
        // headerCell({ text: "" }),

        headerCell({ text: "sep" }),
        headerCell({ text: "okt" }),
        headerCell({ text: "nov" }),
        headerCell({ text: "des" }),

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
    .reduce(
      (acc, curr) => acc.map((v, i) => v + curr[i]),
      createArray(TOTAL_DATA)
    );

  log({ list });
  return rowTotal("Total", list);
};

function getGroupRows(groups) {
  return [
    {
      rowId: groups["id"] ?? generateUID(),
      newRow: groups["id"] === null,
      cells: [
        numberCell(groups["sep"]),
        numberCell(groups["okt"]),
        numberCell(groups["nov"]),
        numberCell(groups["des"]),

        numberCell(groups["jan_p"]),
        numberCell(groups["feb_p"]),
        numberCell(groups["mar_p"]),
        numberCell(groups["apr_p"]),
        numberCell(groups["mei_p"]),
        numberCell(groups["jun_p"]),
        numberCell(groups["jul_p"]),
        numberCell(groups["agu_p"]),
        numberCell(groups["sep_p"]),
        numberCell(groups["okt_p"]),
        numberCell(groups["nov_p"]),
        numberCell(groups["des_p"]),
      ],
    },
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

      ...total.map((e, i) =>
        nonEditable(
          numberCell(e, "padding-left-lg", {
            background: "beige",
          })
        )
      ),
    ],
  };
}

export function getRows({ data }) {
  return [
    ...getRootHeaderRow(),
    ...getGroupRows(data),
    // firstLoadTotalRow(data)
  ];
}
