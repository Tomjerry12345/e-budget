import {
  nonEditable,
  textCell,
  monthHeaderCell,
  rootHeaderCell,
  numberCell,
  totalCell,
  dropDownCell,
} from "values/react-grid/cells";
import { createArray, log } from "values/Utilitas";
import { getMonthDuration, getMonthName } from "values/Constant";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 18;
const FIRST_TOTAL = 3;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

const COLOR_1 = "#107C41";

export function getRootHeaderRow() {
  return {
    rowId: HEADER_ROOT_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Description", "justify-content-center font-bold")),
      nonEditable(textCell("Aktivitas", "justify-content-center font-bold")),
      nonEditable(textCell("Cost Driver", "justify-content-center font-bold")),

      nonEditable(textCell("Jumlah", "justify-content-center font-bold")),
      nonEditable(textCell("Tarif Asuransi", "justify-content-center font-bold")),
      nonEditable(textCell("Total Asuransi", "justify-content-center font-bold")),
      nonEditable(textCell("Lama Asuransi", "justify-content-center font-bold")),
      nonEditable(textCell("Mulai Asuransi", "justify-content-center font-bold")),
      nonEditable(rootHeaderCell(`Grand Total`, "justify-content-center", COLOR_1)),

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
    ...groups.map((d, i) => ({
      rowId: d["id"],
      height: ROW_HEIGHT,
      cells: [
        textCell(d["name"], "padding-left-lg"),
        textCell(d["activity"] ?? "-", "padding-left-lg"),
        textCell(d["cost_driver"] ?? "-", "padding-left-lg"),

        numberCell(d["amount"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["rates"] ?? 0, "padding-left-lg"),
        nonEditable(numberCell(d["total"] ?? 0, "padding-left-lg")),
        // numberCell(d["month_duration"] ?? 0, "padding-left-lg", null, false),
        dropDownCell(
          getMonthDuration(),
          d["month_duration"] ?? 0,
          "padding-left-lg",
          null,
          false
        ),
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

      ...total.map((e, i) => {
        if (i === 0) {
          return totalCell(e, "", "beige", "", false);
        } else if (i === 3 || i === 4) {
          return nonEditable(
            textCell("", "padding-left-lg", {
              background: "beige",
            })
          );
        } else {
          return totalCell(e, "", "beige", "");
        }
      }),
    ],
  };
}

export function getRows({ header, data }) {
  return [header, ...getGroupRows(data), firstLoadTotalRow(data)];
}

export function fullNewRow(header, id) {
  const list = createArray(TOTAL_DATA);
  list[5] = "";
  return [header, reactgridNewRow(id), rowTotal("Total", list)];
}

export function reactgridNewRow(id) {
  return {
    rowId: id,
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
