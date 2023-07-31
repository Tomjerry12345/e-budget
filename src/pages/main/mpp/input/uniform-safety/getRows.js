import { monthData } from "values/Constant";
import {
  nonEditable,
  textCell,
  numberCell,
  headerCell,
  dropDownCell,
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
        headerCell({ text: "" }),

        headerCell({ text: "Rate", colspan: 5, className: "justify-content-center" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({
          text: "Qty pembelian",
          colspan: 5,
          className: "justify-content-center",
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({ text: "Total pembelian", rowspan: 1 }),
        headerCell({ text: "Forecast" }),
        headerCell({ text: "Budget" }),
      ],
    },
    {
      rowId: "sub-header",
      cells: [
        headerCell({ text: "" }),

        headerCell({ text: "Kemeja Abu Abu" }),
        headerCell({ text: "Batik" }),
        headerCell({ text: "Polo Tshirt" }),
        headerCell({ text: "IC Card" }),
        headerCell({ text: "Lainnya" }),

        headerCell({ text: "Kemeja Abu Abu" }),
        headerCell({ text: "Batik" }),
        headerCell({ text: "Polo Tshirt" }),
        headerCell({ text: "IC Card" }),
        headerCell({ text: "Lainnya" }),

        headerCell({ text: "" }),
        headerCell({ text: "Waktu pembelian" }),
        headerCell({ text: "Waktu pembelian" }),
      ],
    },
  ];
}

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  data.forEach((e) => {
    const { forecast, budget } = e;
    list[0] += forecast ?? 0;
    list[1] += budget ?? 0;
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
    ...groups.map((item) => {
      const {
        id,
        sub_grade,
        rate_gray_shirt,
        rate_batik,
        rate_polo,
        rate_ic_card,
        rate_other,
        qty_gray_shirt,
        qty_batik,
        qty_polo,
        qty_ic_card,
        qty_other,
        total,
        forecast,
        budget,
      } = item;

      return {
        rowId: id ?? generateUID(),
        newRow: id === null,
        subGradeId: sub_grade.id,
        cells: [
          headerCell({ text: sub_grade.sub_grade }),

          numberCell(rate_gray_shirt ?? 0),
          numberCell(rate_batik ?? 0),
          numberCell(rate_polo ?? 0),
          numberCell(rate_ic_card ?? 0),
          numberCell(rate_other ?? 0),

          numberCell(qty_gray_shirt ?? 0),
          numberCell(qty_batik ?? 0),
          numberCell(qty_polo ?? 0),
          numberCell(qty_ic_card ?? 0),
          numberCell(qty_other ?? 0),

          numberCell(total ?? 0),
          dropDownCell(monthData, forecast),
          dropDownCell(monthData, forecast),
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

export function fullNewRow() {
  const list = createArray(TOTAL_DATA);
  return [
    ...getRootHeaderRow(),
    // reactgridNewRow(),
    // rowTotal("Total", list),
  ];
}

export function reactgridNewRow() {
  return {
    rowId: generateUID(),
    newRow: true,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),

      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg")),
    ],
  };
}
