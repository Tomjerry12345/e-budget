import {
  nonEditable,
  textCell,
  monthHeaderCell,
  rootHeaderCell,
  numberCell,
  noSideBorders,
  totalCell,
  dropDownCell,
} from "values/react-grid/cells";
import { createArray, log } from "values/Utilitas";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 18;
const FIRST_TOTAL = 3;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

export function getRootHeaderRow() {
  return {
    rowId: HEADER_ROOT_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Description", "justify-content-center font-bold")),
      nonEditable(textCell("Qty", "justify-content-center font-bold")),
      nonEditable(textCell("Price", "justify-content-center font-bold")),
      nonEditable(textCell("Asset Category", "justify-content-center font-bold")),
      nonEditable(textCell("Purchase Date Month", "justify-content-center font-bold")),
      nonEditable(textCell("Purchase Date Year", "justify-content-center font-bold")),
      nonEditable(textCell("Depreciation Date Month", "justify-content-center font-bold")),
      nonEditable(textCell("Depreciation Date Year", "justify-content-center font-bold")),
      nonEditable(textCell("Asset Life (In Years)", "justify-content-center font-bold")),
      nonEditable(textCell("Salvage Value", "justify-content-center font-bold")),
      nonEditable(textCell("Total", "justify-content-center font-bold")),
      nonEditable(textCell("Depreciation Amount Monthly", "justify-content-center font-bold")),
      nonEditable(textCell("Depreciation Amount Yearly", "justify-content-center font-bold")),
      nonEditable(textCell("Accumulated Account", "justify-content-center font-bold")),
      nonEditable(textCell("Depreciation Account", "justify-content-center font-bold")),
    ],
  };
}

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  data.forEach((e) => {
    list[0] += e["amount"] ?? 0;
    list[1] += e["rates"] ?? 0;
    list[2] += e["total"] ?? 0;
    list[3] += e["month_duration"] ?? 0;
    list[4] += e["month_start"] ?? 0;
    list[5] += e["grand_total"] ?? 0;
    list[6] += e["jan_rates"] ?? 0;
    list[7] += e["feb_rates"] ?? 0;
    list[8] += e["mar_rates"] ?? 0;
    list[9] += e["apr_rates"] ?? 0;
    list[10] += e["mei_rates"] ?? 0;
    list[11] += e["jun_rates"] ?? 0;
    list[12] += e["jul_rates"] ?? 0;
    list[13] += e["agu_rates"] ?? 0;
    list[14] += e["sep_rates"] ?? 0;
    list[15] += e["okt_rates"] ?? 0;
    list[16] += e["nov_rates"] ?? 0;
    list[17] += e["des_rates"] ?? 0;
  });

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
    .reduce((acc, curr) => acc.map((v, i) => v + curr[i]), createArray(TOTAL_DATA));

  log({ list });
  return rowTotal("Total", list);
};

function getGroupRows(groups) {
  return [
    ...groups.map((d) => ({
      rowId: d["id"],
      height: ROW_HEIGHT,
      cells: [
        textCell(d["name"], "padding-left-lg"),
        textCell(d["activity"] ?? "-", "padding-left-lg"),
        textCell(d["cost_driver"] ?? "-", "padding-left-lg"),

        numberCell(d["amount"] ?? 0, "padding-left-lg"),

        numberCell(d["rates"] ?? 0, "padding-left-lg", null, false),
        nonEditable(numberCell(d["total"] ?? 0, "padding-left-lg")),
        numberCell(d["month_duration"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["month_start"] ?? 0, "padding-left-lg", null, false),
        nonEditable(numberCell(d["grand_total"] ?? 0, "padding-left-lg")),

        nonEditable(numberCell(d["jan_rates"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["feb_rates"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mar_rates"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["apr_rates"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mei_rates"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jun_rates"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jul_rates"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["agu_rates"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["sep_rates"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["okt_rates"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["nov_rates"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["des_rates"] ?? 0, "padding-left-lg")),
      ],
    })),
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
      nonEditable(
        textCell("", "padding-left-lg", {
          background: "beige",
        })
      ),
      nonEditable(
        textCell("", "padding-left-lg", {
          background: "beige",
        })
      ),

      ...total.map((e, i) => noSideBorders(totalCell(e, "", "beige", ""))),
    ],
  };
}

export function getRows({ data }) {
  return [getRootHeaderRow(), ...getGroupRows(data), firstLoadTotalRow(data)];
}

export function fullNewRow({ id }) {
  const list = createArray(TOTAL_DATA);
  return [
    getRootHeaderRow(),
    reactgridNewRow(id),
    // rowTotal("Total", list)
  ];
}

export function reactgridNewRow(id) {
  return {
    rowId: id,
    newRow: true,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
    ],
  };
}
