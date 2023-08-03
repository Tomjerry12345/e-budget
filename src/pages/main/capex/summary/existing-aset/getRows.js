import { nonEditable, textCell, numberCell, headerCell } from "values/react-grid/cells";
import { generateUID } from "values/Utilitas";
import { getColumns } from "./getColumns";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

export function getRootHeaderRow() {
  return [
    {
      rowId: HEADER_ROOT_ROW_ID,
      height: ROW_HEIGHT,
      cells: [...getColumns().map((e) => headerCell({ text: e.title }))],
    },
  ];
}

function getGroupRows(groups) {
  return [
    ...groups.map((d) => ({
      rowId: d["id"],
      height: ROW_HEIGHT,
      cells: [
        ...getColumns().map((e) => {
          if (e.type === "text") {
            return nonEditable(textCell(d[e.columnId] ?? "", "padding-left-lg"));
          } else if (e.type === "number") {
            return nonEditable(
              numberCell(d[e.columnId] ?? 0, "padding-left-lg", null, e.format ?? false)
            );
          }
        }),
      ],
    })),
  ];
}

export function getRows({ data }) {
  return [...getRootHeaderRow(), ...getGroupRows(data)];
}

export function fullNewRow() {
  return [...getRootHeaderRow(), reactgridNewRow()];
}

export function reactgridNewRow() {
  return {
    rowId: generateUID(),
    isNewRow: true,
    height: ROW_HEIGHT,
    cells: [...getColumns().map((e) => nonEditable(textCell("", "padding-left-lg")))],
  };
}
