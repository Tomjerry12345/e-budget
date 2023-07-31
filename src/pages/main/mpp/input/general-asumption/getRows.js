import {
  nonEditable,
  textCell,
  monthHeaderCell,
  rootHeaderCell,
  numberCell,
  totalCell,
  dropDownCell,
  textCellObj,
  headerCell,
} from "values/react-grid/cells";
import { createArray, generateUID, log } from "values/Utilitas";
import { getMonthDuration, getMonthName } from "values/Constant";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 2;
const FIRST_TOTAL = 1;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

export function getRootHeaderRow() {
  return [
    {
      rowId: "header",
      cells: [
        headerCell({ text: "Asumsi" }),
        headerCell({ text: "Forecast" }),
        headerCell({ text: "Budget" }),
      ],
    },
  ];
}

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  const { jht, thr_period, bonus_period, jht_p, thr_period_p, bonus_period_p } =
    data;

  list[0] = jht ?? 0 + thr_period ?? 0 + bonus_period ?? 0;
  list[1] = jht_p ?? 0 + thr_period_p ?? 0 + bonus_period_p ?? 0;

  log({ list });

  return rowTotal("Total", list);
};

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

function getGroupRows(groups) {
  const {
    id,
    jht,
    thr_period,
    bonus_period,
    jht_p,
    thr_period_p,
    bonus_period_p,
  } = groups;

  log({ id });

  return [
    {
      rowId: generateUID(),
      id: id,
      newRow: id === null,
      forecast: "jht",
      budget: "jht_p",
      cells: [
        headerCell({ text: "BPJSTK JHT - Pemberi Kerja" }),
        numberCell(jht ?? 0),
        numberCell(jht_p ?? 0),
      ],
    },
    {
      rowId: generateUID(),
      id: id,
      newRow: id === null,
      forecast: "thr_period",
      budget: "thr_period_p",
      cells: [
        headerCell({ text: "Periode Pembayaran THR" }),
        textCell(thr_period, "padding-left-lg"),
        textCell(thr_period_p ?? ""),
      ],
    },
    {
      rowId: generateUID(),
      id: id,
      newRow: id === null,
      forecast: "bonus_period",
      budget: "bonus_period_p",
      cells: [
        headerCell({ text: "Periode Pembayaran Bonus" }),
        textCell(bonus_period ?? ""),
        textCell(bonus_period_p ?? ""),
      ],
    },
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

      ...total.map((e, i) =>
        nonEditable(
          numberCell(e, "padding-left-lg", {
            background: "beige",
          })
        )
      ),
    ],
  };
}

export function getRows({ data }) {
  return [
    ...getRootHeaderRow(),
    ...getGroupRows(data),
    // firstLoadTotalRow(data),
  ];
}

export const updateNewRow = (data) => {
  const firstData = data[0];
  const lastData = data[data.length - 1];
  const newData = data.slice(1, data.length - 1);
  return [
    firstData,
    ...newData.map((e) => {
      return {
        ...e,
        newRow: false,
      };
    }),
    lastData,
  ];
};
