import { getMonthDuration, getMonthName } from "values/Constant";
import {
  nonEditable,
  textCell,
  monthHeaderCell,
  rootHeaderCell,
  numberCell,
  totalCell,
  dropDownCustomCell,
  headerCell,
} from "values/react-grid/cells";
import { createArray, generateUID, log } from "values/Utilitas";
import { getColumns } from "./getColumns";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 18;
const FIRST_TOTAL = 3;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

const COLOR_1 = "#107C41";

export function getRootHeaderRow(act, budget) {
  return [
    {
      rowId: "header",
      cells: [
        headerCell({ text: "No", rowspan: 1 }),
        headerCell({ text: "Nama Bank & Non Bank", rowspan: 1 }),
        headerCell({
          text: "Rate",
        }),
        headerCell({ text: "Rate" }),
        headerCell({ text: "Plafon" }),
        headerCell({
          text: `Actual ${act}`,
          colspan: 2,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({
          text: `Actual Jan ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Actual Feb ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Actual Mar ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Actual Apr ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Actual Mei ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Actual Jun ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Actual Jul ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Actual Agu ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Actual Sep ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Proyeksi Okt ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Proyeksi Nov ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Proyeksi Des ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Outlook ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Jan ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Feb ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Mar ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Apr ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Mei ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Jun ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Jul ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Agu ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Sep ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Okt ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Nov ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Budget Des ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: `Total ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        // headerCell({ text: "Status", rowspan: 1 }),
        headerCell({ text: "Collateral Aset", rowspan: 1 }),
        headerCell({ text: "% Collateral Aset", rowspan: 1 }),
      ],
    },
    {
      rowId: "sub-header",
      cells: [
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: `${act}` }),
        headerCell({ text: `${budget}` }),
        headerCell({ text: "" }),

        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        headerCell({ text: "KEBUTUHAN" }),
        headerCell({ text: "PENGEMBALIAN" }),
        headerCell({ text: "Outstanding" }),
        headerCell({ text: "Sisa Plafon" }),

        // headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
      ],
    },
  ];
}

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  list[3] = "";
  list[4] = "";
  data.forEach((e) => {
    list[0] += e["amount"] ?? 0;
    list[1] += e["rates"] ?? 0;
    list[2] += e["total"] ?? 0;
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
      rowId: d["id"] ?? generateUID(),
      newRow: d["id"] === null,
      height: ROW_HEIGHT,
      cells: [
        ...getColumns().map((e) => {
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

      ...total.map((e, i) => totalCell(e, "", "beige", "", !(i === 0))),
    ],
  };
}

export function getRows({ data, act, budget }) {
  return [
    ...getRootHeaderRow(act, budget),
    ...getGroupRows(data),
    // firstLoadTotalRow(data)
  ];
}

export function fullNewRow() {
  const list = createArray(TOTAL_DATA);
  return [
    ...getRootHeaderRow("2022", "2023"),
    // reactgridNewRow(),
    // rowTotal("Total", list)
  ];
}

export function reactgridNewRow() {
  return {
    rowId: generateUID(),
    newRow: true,
    height: ROW_HEIGHT,
    cells: [
      textCell("", "padding-left-lg"),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),

      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg")),

      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
    ],
  };
}
