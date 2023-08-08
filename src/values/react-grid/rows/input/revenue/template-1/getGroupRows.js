import { generateUID } from "values/Utilitas";
import { ROW_HEIGHT } from "./Constant";
import { getColumns } from "./getColumns";

const { nonEditable, textCell, numberCell } = require("values/react-grid/cells");

export const getGroupRows = (groups, key, getCol) => {
  const col = getCol ?? getColumns;
  return [
    ...groups.map((d) => ({
      rowId: d["id"] ?? generateUID(),
      newRow: d["id"] === null,
      height: ROW_HEIGHT,
      cells: [
        ...col[key].map((e) => {
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
          }
        }),
      ],
    })),
  ];
};
