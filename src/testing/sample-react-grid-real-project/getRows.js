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
} from "../../values/react-grid/cells";

export const CASHBOXBANK_ROW_ID = "cashboxBank";
export const CREDITLINE_ROW_ID = "creditLine";
export const CREDITLINEOVERDRAFT_ROW_ID = "creditLineOverdraft";
export const HEADER_ROW_ID = "header";
export const LIQUIDFUNDS_ROW_ID = "liquidFunds";
export const MONTHSTOTAL_ROW_ID = "monthsTotal";
export const CUMULATIVE_ROW_ID = "cumulative";

const ROW_HEIGHT = 32;
const HEADING_ROW_HEIGHT = 40;

function sumGroupValues(values) {
  return values.reduce(
    (prev, curr) => (isNaN(prev) ? 0 : prev) + (isNaN(curr) ? 0 : curr)
  );
}

function getHeaderRow() {
  const i = 1;
  return {
    rowId: HEADER_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(emptyTextCell),
      nonEditable(monthHeaderCell(`Jan ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Feb ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Mar ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Apr ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Mei ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Jun ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Jul ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Agu ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Sep ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Okt ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Nov ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Des ${i}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Year ${i}`, "justify-content-end")),
      nonEditable(monthHeaderCell(`Jan ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Feb ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Mar ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Apr ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Mei ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Jun ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Jul ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Agu ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Sep ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Okt ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Nov ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Des ${i + 1}`, "justify-content-center")),
      nonEditable(monthHeaderCell(`Year ${i + 1}`, "justify-content-end")),
    ],
  };
}

function getLiquidFundsRow(title) {
  return {
    rowId: LIQUIDFUNDS_ROW_ID,
    height: HEADING_ROW_HEIGHT,
    cells: [
      bottomLine(
        nonEditable(textCell(title, "align-items-end text-lg font-bold"))
      ),
      ...months().map(() =>
        noSideBorders(bottomLine(nonEditable(emptyTextCell)))
      ),
      bottomLine(nonEditable(emptyTextCell)),
    ],
  };
}

function getCashboxBankRow(title, cashboxBank) {
  return {
    rowId: CASHBOXBANK_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell(title, "padding-left-lg")),
      ...months().map((_, idx) =>
        idx === 0
          ? numberCell(cashboxBank[idx], "light-green-bg")
          : nonEditable(showZero(numberCell(cashboxBank[idx], "disabled")))
      ),
      nonEditable(emptyTextCell),
    ],
  };
}

function getMonthsTotalRow(title, monthlyInflowOuflowDiffs, yearlyGroupsDiff) {
  const monthsTotalCell = (value) =>
    bottomLine(
      nonEditable(showZero(numberCell(value, "text-md disabled font-bold")))
    );
  return {
    rowId: MONTHSTOTAL_ROW_ID,
    height: HEADING_ROW_HEIGHT,
    cells: [
      bottomLine(nonEditable(textCell(title, "text-lg font-bold"))),
      ...months().map((_, idx) =>
        monthsTotalCell(monthlyInflowOuflowDiffs[idx])
      ),
      bottomLine(
        nonEditable(
          showZero(numberCell(yearlyGroupsDiff, "text-lg disabled font-bold"))
        )
      ),
    ],
  };
}

function getCumulativeRow(title, cumulativeTotals, yearlyInflowOuflowDiff) {
  return {
    rowId: CUMULATIVE_ROW_ID,
    height: HEADING_ROW_HEIGHT,
    cells: [
      bottomLine(
        nonEditable(textCell(title, "align-items-end text-lg font-bold"))
      ),
      ...months().map((_, idx) =>
        bottomLine(
          nonEditable(
            showZero(
              numberCell(
                cumulativeTotals[idx],
                "align-items-end disabled text-md font-bold"
              )
            )
          )
        )
      ),
      bottomLine(
        nonEditable(
          showZero(
            numberCell(
              yearlyInflowOuflowDiff,
              "align-items-end disabled font-bold text-lg"
            )
          )
        )
      ),
    ],
  };
}

function getGroupRows(
  title,
  summaryTitle,
  groups,
  monthlyGroupTotals,
  yearlyGroupTotal
) {
  return [
    {
      rowId: `${title}Header`,
      height: HEADING_ROW_HEIGHT,
      cells: [
        bottomLine(
          nonEditable(
            textCell(
              title,
              `align-items-end text-lg font-bold text-${
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
    // {
    //   rowId: `${title}Summary`,
    //   height: ROW_HEIGHT,
    //   cells: [
    //     nonEditable(textCell(summaryTitle, "padding-left-lg font-bold")),
    //     ...months().map((_, idx) =>
    //       nonEditable(
    //         showZero(
    //           numberCell(
    //             monthlyGroupTotals[idx],
    //             `font-bold disabled text-${
    //               title === "Inflow" ? "green" : "blue"
    //             }`
    //           )
    //         )
    //       )
    //     ),
    //     nonEditable(
    //       showZero(
    //         numberCell(
    //           yearlyGroupTotal,
    //           `font-bold disabled text-${title === "Inflow" ? "green" : "blue"}`
    //         )
    //       )
    //     ),
    //   ],
    // },
  ];
}

export function getCreditLineRows(
  cumulativeTotals,
  yearlyInflowOuflowDiff,
  creditLine
) {
  const yearlyOverdraft =
    -yearlyInflowOuflowDiff - (isNaN(creditLine) ? 0 : creditLine);
  return [
    {
      rowId: CREDITLINE_ROW_ID,
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell("Credit line", "padding-left-lg")),
        ...months().map((_, idx) =>
          idx === 0
            ? numberCell(creditLine, "light-green-bg")
            : nonEditable(showZero(numberCell(creditLine, "disabled")))
        ),
        nonEditable(showZero(numberCell(creditLine, "font-bold disabled"))),
      ],
    },
    {
      rowId: CREDITLINEOVERDRAFT_ROW_ID,
      height: HEADING_ROW_HEIGHT,
      cells: [
        nonEditable(
          textCell("Credit line overdraft", "align-items-end text-lg font-bold")
        ),
        ...months().map((_, idx) => {
          const overdraft =
            -cumulativeTotals[idx] - (isNaN(creditLine) ? 0 : creditLine);
          return nonEditable(
            numberCell(
              overdraft > 0 ? overdraft : NaN,
              overdraft > 0
                ? "align-items-end disabled text-md text-red font-bold"
                : "disabled"
            )
          );
        }),
        nonEditable(
          numberCell(
            yearlyOverdraft > 0 ? yearlyOverdraft : NaN,
            "align-items-end disabled text-red text-lg font-bold"
          )
        ),
      ],
    },
  ];
}

export function getRows({ data }) {
  return [
    getHeaderRow(),
    ...getGroupRows(
      "Inflow",
      "Cash in (total)",
      data
      // monthlyInflowTotals,
      // yearlyInflowTotal
    ),
  ];
}
