import { nonEditable, textCell, numberCell, headerCell } from "values/react-grid/cells";
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
          colspan: 4,
          style: {
            justifyContent: "center",
            fontWeight: 600,
          },
        }),
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
    ...groups.map((item) => {
      return {
        rowId: item["id"] ?? generateUID(),
        newRow: item["id"] === null,
        codeAccount: item["code_account"],
        cells: [
          nonEditable(textCell(item["code_account"] ?? "")),
          nonEditable(textCell(item["description"] ?? "")),

          numberCell(item["sep"]),
          numberCell(item["okt"]),
          numberCell(item["nov"]),
          numberCell(item["des"]),

          nonEditable(numberCell(item["total_1"])),

          numberCell(item["jan_p"]),
          numberCell(item["feb_p"]),
          numberCell(item["mar_p"]),
          numberCell(item["apr_p"]),
          numberCell(item["mei_p"]),
          numberCell(item["jun_p"]),
          numberCell(item["jul_p"]),
          numberCell(item["agu_p"]),
          numberCell(item["sep_p"]),
          numberCell(item["okt_p"]),
          numberCell(item["nov_p"]),
          numberCell(item["des_p"]),

          nonEditable(numberCell(item["total_2"])),
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
