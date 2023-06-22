import { months } from "../../values/react-grid/helpers";
import {
  emptyTextCell,
  nonEditable,
  textCell,
  monthHeaderCell,
  bottomLine,
  numberCell,
  showZero,
  noSideBorders,
  rootHeaderCell,
} from "../../values/react-grid/cells";

export const HEADER_ROOT_ROW_ID = "header-root";
export const HEADER_CHILD_ROW_ID = "header-child";

const ROW_HEIGHT = 32;
const HEADING_ROW_HEIGHT = 40;

function sumGroupValues(values) {
  return values.reduce(
    (prev, curr) => (isNaN(prev) ? 0 : prev) + (isNaN(curr) ? 0 : curr)
  );
}

function getRootHeaderRow() {
  return {
    rowId: HEADER_ROOT_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(emptyTextCell),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      nonEditable(rootHeaderCell(`2023`, "justify-content-center")),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      nonEditable(rootHeaderCell(`2024`, "justify-content-center")),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
      noSideBorders(nonEditable(rootHeaderCell(""))),
    ],
  };
}

function getChildHeaderRow() {
  const i = 1;
  return {
    rowId: HEADER_CHILD_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(emptyTextCell),
      nonEditable(monthHeaderCell(`Jan`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Feb`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Mar`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Apr`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Mei`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Jun`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Jul`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Agu`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Sep`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Okt`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Nov`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Des`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Year`, "justify-content-end")),
      nonEditable(monthHeaderCell(`Jan`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Feb`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Mar`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Apr`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Mei`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Jun`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Jul`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Agu`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Sep`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Okt`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Nov`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Des`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Year`, "justify-content-end")),
    ],
  };
}

function getGroupRows(title, groups) {
  return [
    {
      rowId: `${title}Header`,
      height: HEADING_ROW_HEIGHT,
      cells: [
        bottomLine(
          nonEditable(
            textCell(
              title,
              `align-items-end font-bold text-${
                title === "Inflow" ? "green" : "blue"
              }`
            )
          )
        ),
        ...months().map((_) =>
          noSideBorders(bottomLine(nonEditable(emptyTextCell)))
        ),
        bottomLine(nonEditable(emptyTextCell)),
      ],
    },
    ...groups.map(({ title, year1, year2 }) => ({
      rowId: title,
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell(title, "padding-left-lg")),
        ...year1.map((_, idx) => numberCell(year1[idx])),
        nonEditable(
          showZero(numberCell(sumGroupValues(year1), "font-bold disabled"))
        ),
        ...year2.map((_, idx) => numberCell(year2[idx])),
        nonEditable(
          showZero(numberCell(sumGroupValues(year2), "font-bold disabled"))
        ),
      ],
    })),
  ];
}

export function getRows({ data }) {
  return [
    getRootHeaderRow(),
    getChildHeaderRow(),
    ...getGroupRows("Inflow", data),
  ];
}
