import {
  nonEditable,
  textCell,
  numberCell,
  noSideBorders,
  totalCell,
  dropDownCell,
  headerCell,
  dropDownCustomCell,
  customCell,
} from "values/react-grid/cells";
import { createArray, log } from "values/Utilitas";
import { getColumns } from "./getColumns";
import { getMonthDuration } from "values/Constant";

export const HEADER_ROOT_ROW_ID = "header-root";
export const SUB_HEADER_ROW_ID = "sub-header";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 18;
const FIRST_TOTAL = 3;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

export function getRootHeaderRow() {
  return [
    {
      rowId: HEADER_ROOT_ROW_ID,
      height: ROW_HEIGHT,
      cells: [
        headerCell({ text: "", rowspan: 1 }),
        headerCell({ text: "Description", rowspan: 1 }),
        headerCell({ text: "Qty", rowspan: 1 }),
        headerCell({ text: "Price", rowspan: 1 }),
        headerCell({ text: "Asset Category", rowspan: 1 }),
        headerCell({
          text: "Purchase Date",
          colspan: 2,
          className: "justify-content-center font-bold",
        }),
        headerCell(""),
        headerCell({
          text: "Depreciation Date",
          colspan: 2,
          className: "justify-content-center font-bold",
        }),
        headerCell({ text: "" }),
        headerCell({ text: "Asset Life (In Years)", rowspan: 1 }),
        headerCell({ text: "Salvage Value", rowspan: 1 }),
        headerCell({ text: "Total", rowspan: 1 }),
        headerCell({
          text: "Depreciation Amount",
          colspan: 2,
          className: "justify-content-center font-bold",
        }),
        headerCell({ text: "" }),
        headerCell({ text: "Asset Account", rowspan: 1 }),
        headerCell({ text: "Accumulated Account", rowspan: 1 }),
        headerCell({ text: "Depreciation Account", rowspan: 1 }),
      ],
    },
    {
      rowId: SUB_HEADER_ROW_ID,
      height: ROW_HEIGHT,
      cells: [
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "Month", className: "justify-content-center" }),
        headerCell({ text: "Year", className: "justify-content-center" }),
        headerCell({ text: "Month", className: "justify-content-center" }),
        headerCell({ text: "Year", className: "justify-content-center" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: "Monthly",
          className: "justify-content-center",
        }),
        headerCell({ text: "Yearly" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
      ],
    },
  ];
}

// const firstLoadTotalRow = (data) => {
//   const list = createArray(TOTAL_DATA);

//   data.forEach((e) => {
//     list[0] += e["amount"] ?? 0;
//     list[1] += e["rates"] ?? 0;
//     list[2] += e["total"] ?? 0;
//     list[3] += e["month_duration"] ?? 0;
//     list[4] += e["month_start"] ?? 0;
//     list[5] += e["grand_total"] ?? 0;
//     list[6] += e["jan_rates"] ?? 0;
//     list[7] += e["feb_rates"] ?? 0;
//     list[8] += e["mar_rates"] ?? 0;
//     list[9] += e["apr_rates"] ?? 0;
//     list[10] += e["mei_rates"] ?? 0;
//     list[11] += e["jun_rates"] ?? 0;
//     list[12] += e["jul_rates"] ?? 0;
//     list[13] += e["agu_rates"] ?? 0;
//     list[14] += e["sep_rates"] ?? 0;
//     list[15] += e["okt_rates"] ?? 0;
//     list[16] += e["nov_rates"] ?? 0;
//     list[17] += e["des_rates"] ?? 0;
//   });

//   return rowTotal("Total", list);
// };

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

function getGroupRows(groups, categories) {
  return [
    ...groups.map((d) => {
      if (d.id) {
        return {
          rowId: d["id"],
          // isNewRow: d["id"] === null,
          height: ROW_HEIGHT,
          cells: [
            ...getColumns().map((e) => {
              if (e.type === "text") {
                if (e.nonEditabled === undefined || e.nonEditabled === false) {
                  return textCell(d[e.columnId] ?? "", "padding-left-lg");
                } else {
                  return nonEditable(
                    textCell(d[e.columnId] ?? "", "padding-left-lg")
                  );
                }
              } else if (e.type === "dropdown") {
                if (e.columnId === "asset_category_id") {
                  return dropDownCustomCell(
                    d[e.columnId] ?? "",
                    categories,
                    d.is_asset_category_id
                  );
                } else {
                  return dropDownCell(getMonthDuration(), d[e.columnId]);
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
                    numberCell(
                      d[e.columnId] ?? 0,
                      "padding-left-lg",
                      null,
                      e.format ?? false
                    )
                  );
                }
              } else if (e.type === "id") {
                return customCell({
                  text: "",
                  type: "id",
                  style: {
                    justifyContent: "center",
                  },
                });
              }
            }),
          ],
        };
      } else {
        return {
          rowId: null,
          // isNewRow: true,
          height: ROW_HEIGHT,
          cells: [
            textCell("", "padding-left-lg"),
            textCell("", "padding-left-lg"),
            nonEditable(numberCell(0, "padding-left-lg", null, false)),
            nonEditable(numberCell(0, "padding-left-lg", null, false)),
            nonEditable(dropDownCustomCell("", [], "asset_category_id")),
            // nonEditable(numberCell(0, "padding-left-lg", null, false)),
            nonEditable(numberCell(0, "padding-left-lg")),
            nonEditable(numberCell(0, "padding-left-lg")),
            nonEditable(numberCell(0, "padding-left-lg")),
            nonEditable(numberCell(0, "padding-left-lg")),
            nonEditable(numberCell(0, "padding-left-lg")),
            nonEditable(numberCell(0, "padding-left-lg")),
            nonEditable(numberCell(0, "padding-left-lg")),
            nonEditable(numberCell(0, "padding-left-lg")),
            nonEditable(textCell("", "padding-left-lg")),
            nonEditable(textCell("", "padding-left-lg")),
            nonEditable(textCell("", "padding-left-lg")),
          ],
        };
      }
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

      ...total.map((e, i) => noSideBorders(totalCell(e, "", "beige", ""))),
    ],
  };
}

export function getRows({ data, categories }) {
  return [
    ...getRootHeaderRow(),
    ...getGroupRows(data, categories),
    // firstLoadTotalRow(data)
  ];
}

export function fullNewRow() {
  return [...getRootHeaderRow(), reactgridNewRow()];
}

export function reactgridNewRow() {
  return {
    rowId: null,
    height: ROW_HEIGHT,
    cells: [
      textCell("", "padding-left-lg"),
      textCell("", "padding-left-lg"),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(dropDownCustomCell("", [], "asset_category_id")),
      // nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
    ],
  };
}
