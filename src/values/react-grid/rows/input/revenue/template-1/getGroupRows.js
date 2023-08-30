import { generateUID, log } from "values/Utilitas";
import { ROW_HEIGHT } from "./Constant";
import { getColumns } from "./getColumns";

const { nonEditable, textCell, numberCell, customCell } = require("values/react-grid/cells");

export const getGroupRows = (groups, key, getCol) => {
  const col = getCol ?? getColumns;

  return [
    ...groups.map((d) => {
      const id = d === null ? generateUID() : d["id"];
      return {
        list_number: d === null ? null : d["list_number"] ?? null,
        rowId: id ?? generateUID(),
        newRow: d === null || d["id"] === null,
        height: ROW_HEIGHT,
        cells: [
          ...col[key].map((e) => {
            if (d === null) {
              return nonEditable(textCell("", "padding-left-lg"));
            }

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
};
