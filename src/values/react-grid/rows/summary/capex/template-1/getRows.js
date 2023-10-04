import {
  nonEditable,
  textCell,
  numberCell,
  headerCell,
} from "values/react-grid/cells";
import { generateUID, log } from "values/Utilitas";
import { getColumns } from "./getColumns";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

export function getRootHeaderRow() {
  return [
    {
      rowId: "header",
      cells: [
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({
          text: "Forecast",
          colspan: 3,
          style: {
            justifyContent: "center",
          },
        }),

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
      rowId: HEADER_ROOT_ROW_ID,
      height: ROW_HEIGHT,
      cells: [...getColumns().map((e) => headerCell({ text: e.title }))],
    },
  ];
}

function getGroupRows(groups) {
  return [
    ...groups.map((d) => {
      return {
        rowId: generateUID(),
        height: ROW_HEIGHT,
        cells: [
          ...getColumns().map((e) => {
            if (e.type === "text") {
              return nonEditable(
                textCell(d[e.columnId] ?? "", "padding-left-lg")
              );
            } else if (e.type === "number") {
              return nonEditable(
                numberCell(
                  d[e.columnId] ?? 0,
                  "padding-left-lg",
                  null,
                  e.format ?? false
                )
              );
            }
          }),
        ],
      };
    }),
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
    cells: [
      ...getColumns().map((e) => nonEditable(textCell("", "padding-left-lg"))),
    ],
  };
}
