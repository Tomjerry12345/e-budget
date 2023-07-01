import {
  nonEditable,
  textCell,
  monthHeaderCell,
  rootHeaderCell,
  numberCell,
  totalCell,
} from "../../../../../values/react-grid/cells";
import { createArray } from "values/Utilitas";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 16;
const FIRST_TOTAL = 3;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

const COLOR_2 = "#107C41";

export function getRootHeaderRow() {
  return {
    rowId: HEADER_ROOT_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Description", "justify-content-center font-bold")),
      nonEditable(textCell("Aktivitas", "justify-content-center font-bold")),
      nonEditable(textCell("Cost Driver", "justify-content-center font-bold")),
      nonEditable(textCell("Satuan", "justify-content-center font-bold")),
      nonEditable(textCell("Tarif", "justify-content-center font-bold")),
      nonEditable(
        rootHeaderCell("Grand Total", "justify-content-center", COLOR_2)
      ),
      nonEditable(
        textCell("Periode Bayar", "justify-content-center font-bold")
      ),

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
    list[0] += e["unit"];
    list[1] += e["rates"];
    list[2] += e["total"];
    list[4] += e["jan_rates"];
    list[5] += e["feb_rates"];
    list[6] += e["mar_rates"];
    list[7] += e["apr_rates"];
    list[8] += e["mei_rates"];
    list[9] += e["jun_rates"];
    list[10] += e["jul_rates"];
    list[11] += e["agu_rates"];
    list[12] += e["sep_rates"];
    list[13] += e["okt_rates"];
    list[14] += e["nov_rates"];
    list[15] += e["des_rates"];
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
    .reduce(
      (acc, curr) => acc.map((v, i) => v + curr[i]),
      createArray(TOTAL_DATA)
    );

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
        numberCell(d["unit"], "padding-left-lg", null, false),
        numberCell(d["rates"], "padding-left-lg"),
        nonEditable(numberCell(d["total"], "padding-left-lg")),
        numberCell(d["pay_period"], "padding-left-lg", null, false),
        nonEditable(numberCell(d["jan_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["feb_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["mar_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["apr_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["mei_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["jun_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["jul_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["agu_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["sep_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["okt_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["nov_rates"], "padding-left-lg")),
        nonEditable(numberCell(d["des_rates"], "padding-left-lg")),
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
        if (i === 3)
          return nonEditable(
            textCell("", "padding-left-lg", {
              background: "beige",
            })
          );
        else return totalCell(e, "", "beige", "", !(i === 0));
      }),
    ],
  };
}

export function getRows({ header, data }) {
  return [header, ...getGroupRows(data), firstLoadTotalRow(data)];
}

export function fullNewRow(header, id) {
  return [
    header,
    reactgridNewRow(id),
    rowTotal("Total", createArray(TOTAL_DATA)),
  ];
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
