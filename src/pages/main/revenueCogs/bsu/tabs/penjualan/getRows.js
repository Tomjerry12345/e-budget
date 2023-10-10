import { nonEditable, textCell, numberCell, customCell } from "values/react-grid/cells";
import { colorNonEditable } from "values/react-grid/rows/input/revenue/template-1/Constant";
import { firstLoadTotalRow } from "values/react-grid/rows/input/revenue/template-1/firstLoadTotalRow";
import { getColumns } from "values/react-grid/rows/input/revenue/template-1/getColumns";
import { generateUID } from "values/Utilitas";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

function getGroupRows(groups, key) {
  return [
    ...groups.map((d, i) => {
      const id = d === null ? generateUID() : d["id"];
      return {
        list_number: d === null ? null : d["list_number"] ?? null,
        rowId: id ?? generateUID(),
        newRow: d === null || d["id"] === null,
        height: ROW_HEIGHT,
        cells: [
          ...getColumns[key].map((e) => {
            if (d === null) {
              return nonEditable(textCell("", "padding-left-lg"));
            }

            let nonEdit = false;

            if (key === "All data") {
              if (i === 6 || i === 8 || i === 12 || i === 13 || i === 15) {
                e.nonEditabled = true;
                nonEdit = true;
              } else {
                e.nonEditabled = false;
                nonEdit = true;
              }
            }

            if (e.type === "text") {
              if (e.nonEditabled === undefined || e.nonEditabled === false) {
                return textCell(d[e.columnId] ?? "", "padding-left-lg");
              } else {
                return nonEditable(
                  textCell(d[e.columnId] ?? "", "padding-left-lg", {
                    fontWeight: key === "All data" ? (nonEdit ? "bold" : "normal") : "normal",
                    background:
                      d["columnId"] !== "product_code" ||
                      d["columnId"] !== "product_description" ||
                      d["columnId"] !== "code_account" ||
                      d["columnId"] !== "description"
                        ? "#fff"
                        : colorNonEditable,
                  })
                );
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
                    {
                      background: colorNonEditable,
                    },
                    e.format ?? false
                  )
                );
              }
            } else if (e.type === "percent") {
              return customCell({
                type: e.type,
                text: `${d[e.columnId]}`,
                style: {
                  justifyContent: "end",
                },
              });
            }
          }),
        ],
      };
    }),
  ];
}

export function getRows({ header, data, key }) {
  const r =
    key === "All data"
      ? [header, ...getGroupRows(data, key)]
      : [header, ...getGroupRows(data, key), firstLoadTotalRow(data, key)];
  return r;
}
