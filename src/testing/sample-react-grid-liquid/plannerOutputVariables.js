import { months } from "./helpers";

const sumGroupInAMonth = (group) => (monthIndex) =>
  group.reduce(
    (acc, { values }) =>
      acc + (isNaN(values[monthIndex]) ? 0 : values[monthIndex]),
    0
  );

const calcMonthlyGroupTotals = (group) =>
  months().map((_, idx) => sumGroupInAMonth(group)(idx));

export function calculateOutputVariables(inputVariables) {
  const {
    cashInflow,
    cashOutflow,
    openingBalance,
    // creditLine
  } = inputVariables;
  const monthlyInflowTotals = calcMonthlyGroupTotals(cashInflow);
  const monthlyOutflowTotals = calcMonthlyGroupTotals(cashOutflow);

  const cashboxBank = months().map(
    (_, idx, array) =>
      (array[idx + 1] =
        idx === 0
          ? openingBalance
          : array[idx] +
            monthlyInflowTotals[idx - 1] -
            monthlyOutflowTotals[idx - 1])
  );

  const cumulativeTotals = months().map(
    (_, idx) =>
      (isNaN(cashboxBank[idx]) ? 0 : cashboxBank[idx]) +
      monthlyInflowTotals[idx] -
      monthlyOutflowTotals[idx]
  );

  const yearlyInflowTotal = monthlyInflowTotals.reduce((a, b) => a + b);
  const yearlyOutflowTotal = monthlyOutflowTotals.reduce((a, b) => a + b);

  const yearlyInflowOuflowDiff = yearlyInflowTotal - yearlyOutflowTotal;

  const monthlyInflowOuflowDiffs = months().map(
    (_, idx) => monthlyInflowTotals[idx] - monthlyOutflowTotals[idx]
  );

  return {
    yearlyInflowTotal,
    yearlyOutflowTotal,
    cumulativeTotals,
    monthlyInflowTotals,
    monthlyOutflowTotals,
    cashboxBank,
    yearlyInflowOuflowDiff,
    monthlyInflowOuflowDiffs,
  };
}
