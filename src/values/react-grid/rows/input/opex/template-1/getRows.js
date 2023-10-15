import { tableRowTotal } from "values/Colors";
import { createArray } from "values/Utilitas";
import { nonEditable, textCell, numberCell, totalCell } from "values/react-grid/cells";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 27;
const FIRST_TOTAL = 3;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  data.forEach((e) => {
    list[0] += e["jan"];
    list[1] += e["feb"];
    list[2] += e["mar"];
    list[3] += e["apr"];
    list[4] += e["mei"];
    list[5] += e["jun"];
    list[6] += e["jul"];
    list[7] += e["agu"];
    list[8] += e["sep"];
    list[9] += e["okt"];
    list[10] += e["nov"];
    list[11] += e["des"];
    list[12] += e["total_qty"];
    list[13] += e["rates"];
    list[14] += e["total"];
    list[15] += e["jan_rates"];
    list[16] += e["feb_rates"];
    list[17] += e["mar_rates"];
    list[18] += e["apr_rates"];
    list[19] += e["mei_rates"];
    list[20] += e["jun_rates"];
    list[21] += e["jul_rates"];
    list[22] += e["agu_rates"];
    list[23] += e["sep_rates"];
    list[24] += e["okt_rates"];
    list[25] += e["nov_rates"];
    list[26] += e["des_rates"];
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

  return rowTotal("Total", list);
};

function getGroupRows(groups) {
  return [
    ...groups.map((d) => ({
      rowId: d["id"],
      height: ROW_HEIGHT,
      cells: [
        textCell(d["name"], "padding-left-lg border-none"),
        textCell(d["activity"] ?? "-", "padding-left-lg border-none"),
        textCell(d["cost_driver"] ?? "-", "padding-left-lg"),
        numberCell(d["jan"], "padding-left-lg", null, false),
        numberCell(d["feb"], "padding-left-lg", null, false),
        numberCell(d["mar"], "padding-left-lg", null, false),
        numberCell(d["apr"], "padding-left-lg", null, false),
        numberCell(d["mei"], "padding-left-lg", null, false),
        numberCell(d["jun"], "padding-left-lg", null, false),
        numberCell(d["jul"], "padding-left-lg", null, false),
        numberCell(d["agu"], "padding-left-lg", null, false),
        numberCell(d["sep"], "padding-left-lg", null, false),
        numberCell(d["okt"], "padding-left-lg", null, false),
        numberCell(d["nov"], "padding-left-lg", null, false),
        numberCell(d["des"], "padding-left-lg", null, false),

        nonEditable(numberCell(d["total_qty"], "padding-left-lg", null, false)),
        numberCell(d["rates"], "padding-left-lg"),
        nonEditable(numberCell(d["total"], "padding-left-lg")),
        // Tahun 2
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
          background: tableRowTotal,
          fontWeight: "bold",
        })
      ),
      nonEditable(
        textCell("", "padding-left-lg", {
          background: tableRowTotal,
        })
      ),
      nonEditable(
        textCell("", "padding-left-lg", {
          background: tableRowTotal,
        })
      ),

      ...total.map((e, i) => totalCell(e, "", tableRowTotal, "", !(i <= 12))),
    ],
  };
}

export function getRows({ header, data }) {
  return [header, ...getGroupRows(data), firstLoadTotalRow(data)];
}

export function fullNewRow(header, id) {
  return [header, reactgridNewRow(id), rowTotal("Total", createArray(TOTAL_DATA))];
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
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg", null, false)),

      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg")),
      nonEditable(numberCell(0, "padding-left-lg")),
      // Tahun 2
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
