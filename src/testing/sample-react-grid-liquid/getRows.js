import { months } from "./helpers";
import {
  emptyTextCell,
  nonEditable,
  textCell,
  monthHeaderCell,
  bottomLine,
  numberCell,
  showZero,
  noSideBorders,
} from "./cells";

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
  return {
    rowId: HEADER_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(emptyTextCell),
      nonEditable(monthHeaderCell("Jan", "justify-content-center")),
      nonEditable(monthHeaderCell("Feb", "justify-content-center")),
      nonEditable(monthHeaderCell("Mar", "justify-content-center")),
      nonEditable(monthHeaderCell("Apr", "justify-content-center")),
      nonEditable(monthHeaderCell("May", "justify-content-center")),
      nonEditable(monthHeaderCell("Jun", "justify-content-center")),
      nonEditable(monthHeaderCell("Jul", "justify-content-center")),
      nonEditable(monthHeaderCell("Aug", "justify-content-center")),
      nonEditable(monthHeaderCell("Sep", "justify-content-center")),
      nonEditable(monthHeaderCell("Oct", "justify-content-center")),
      nonEditable(monthHeaderCell("Nov", "justify-content-center")),
      nonEditable(monthHeaderCell("Dec", "justify-content-center")),
      nonEditable(monthHeaderCell("Totals", "justify-content-end")),
    ],
  };
}

function getLiquidFundsRow(title) {
  return {
    rowId: LIQUIDFUNDS_ROW_ID,
    height: HEADING_ROW_HEIGHT,
    cells: [
      bottomLine(nonEditable(textCell(title, "align-items-end font-bold"))),
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
      bottomLine(nonEditable(textCell(title, "font-bold"))),
      ...months().map((_, idx) =>
        monthsTotalCell(monthlyInflowOuflowDiffs[idx])
      ),
      bottomLine(
        nonEditable(
          showZero(numberCell(yearlyGroupsDiff, "disabled font-bold"))
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
      bottomLine(nonEditable(textCell(title, "align-items-end font-bold"))),
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
              "align-items-end disabled font-bold"
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
    ...groups.map(({ title, values }) => ({
      rowId: title,
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell(title, "padding-left-lg")),
        ...values.map((_, idx) => numberCell(values[idx])),
        nonEditable(
          showZero(numberCell(sumGroupValues(values), "font-bold disabled"))
        ),
      ],
    })),
    {
      rowId: `${title}Summary`,
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell(summaryTitle, "padding-left-lg font-bold")),
        ...months().map((_, idx) =>
          nonEditable(
            showZero(
              numberCell(
                monthlyGroupTotals[idx],
                `font-bold disabled text-${
                  title === "Inflow" ? "green" : "blue"
                }`
              )
            )
          )
        ),
        nonEditable(
          showZero(
            numberCell(
              yearlyGroupTotal,
              `font-bold disabled text-${title === "Inflow" ? "green" : "blue"}`
            )
          )
        ),
      ],
    },
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
          textCell("Credit line overdraft", "align-items-end font-bold")
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
            "align-items-end disabled text-red font-bold"
          )
        ),
      ],
    },
  ];
}

export function getRows({
  cashInflow,
  cashOutflow,
  cashboxBank,
  monthlyInflowTotals,
  monthlyOutflowTotals,
  yearlyInflowOuflowDiff,
  yearlyInflowTotal,
  yearlyOutflowTotal,
  monthlyInflowOuflowDiffs,
  cumulativeTotals,
  // openingBalance,
  creditLine,
}) {
  return [
    getHeaderRow(),
    getLiquidFundsRow("Liquid funds"),
    getCashboxBankRow("Cashbox/bank", cashboxBank),
    ...getGroupRows(
      "Inflow",
      "Cash in (total)",
      cashInflow,
      monthlyInflowTotals,
      yearlyInflowTotal
    ),
    ...getGroupRows(
      "Outflow",
      "Cash out (total)",
      cashOutflow,
      monthlyOutflowTotals,
      yearlyOutflowTotal
    ),
    getMonthsTotalRow(
      "Total",
      monthlyInflowOuflowDiffs,
      yearlyInflowOuflowDiff
    ),
    getCumulativeRow("Cumulative", cumulativeTotals, yearlyInflowOuflowDiff),
    ...getCreditLineRows(cumulativeTotals, yearlyInflowOuflowDiff, creditLine),
  ];
}
