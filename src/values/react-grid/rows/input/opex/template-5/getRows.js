import { createArray, log } from "values/Utilitas";
import {
  nonEditable,
  textCell,
  numberCell,
  totalCell,
} from "values/react-grid/cells";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 28;
const FIRST_TOTAL = 4;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  data.forEach((e) => {
    list[0] += e["amount"];

    list[1] += e["jan"];
    list[2] += e["feb"];
    list[3] += e["mar"];
    list[4] += e["apr"];
    list[5] += e["mei"];
    list[6] += e["jun"];
    list[7] += e["jul"];
    list[8] += e["agu"];
    list[9] += e["sep"];
    list[10] += e["okt"];
    list[11] += e["nov"];
    list[12] += e["des"];

    list[13] += e["total_quantity"];
    list[14] += e["rates"];
    list[15] += e["grand_total"];

    list[16] += e["jan_rates"];
    list[17] += e["feb_rates"];
    list[18] += e["mar_rates"];
    list[19] += e["apr_rates"];
    list[20] += e["mei_rates"];
    list[21] += e["jun_rates"];
    list[22] += e["jul_rates"];
    list[23] += e["agu_rates"];
    list[24] += e["sep_rates"];
    list[25] += e["okt_rates"];
    list[26] += e["nov_rates"];
    list[27] += e["des_rates"];
  });

  return rowTotal("Total", list);
};

export const updateTotalRow = (data) => {
  const newData = data.slice(1, data.length - 1);

  log({ newData });

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
        textCell(d["unit"] ?? "-", "padding-left-lg"),
        numberCell(d["amount"], "padding-left-lg", "", false),

        numberCell(d["jan"], "padding-left-lg", "", false),
        numberCell(d["feb"], "padding-left-lg", "", false),
        numberCell(d["mar"], "padding-left-lg", "", false),
        numberCell(d["apr"], "padding-left-lg", "", false),
        numberCell(d["mei"], "padding-left-lg", "", false),
        numberCell(d["jun"], "padding-left-lg", "", false),
        numberCell(d["jul"], "padding-left-lg", "", false),
        numberCell(d["agu"], "padding-left-lg", "", false),
        numberCell(d["sep"], "padding-left-lg", "", false),
        numberCell(d["okt"], "padding-left-lg", "", false),
        numberCell(d["nov"], "padding-left-lg", "", false),
        numberCell(d["des"], "padding-left-lg", "", false),

        nonEditable(
          numberCell(d["total_quantity"], "padding-left-lg", "", false)
        ),
        numberCell(d["rates"], "padding-left-lg"),
        nonEditable(numberCell(d["grand_total"], "padding-left-lg")),

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
      nonEditable(
        textCell("", "padding-left-lg", {
          background: "beige",
        })
      ),

      ...total.map((e, i) => totalCell(e, "", "beige", "", !(i <= 13))),
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
      nonEditable(textCell("", "padding-left-lg")),

      nonEditable(numberCell(0, "padding-left-lg", "", false)),

      nonEditable(numberCell(0, "padding-left-lg", "", false)),
      nonEditable(numberCell(0, "padding-left-lg", "", false)),
      nonEditable(numberCell(0, "padding-left-lg", "", false)),
      nonEditable(numberCell(0, "padding-left-lg", "", false)),
      nonEditable(numberCell(0, "padding-left-lg", "", false)),
      nonEditable(numberCell(0, "padding-left-lg", "", false)),
      nonEditable(numberCell(0, "padding-left-lg", "", false)),
      nonEditable(numberCell(0, "padding-left-lg", "", false)),
      nonEditable(numberCell(0, "padding-left-lg", "", false)),
      nonEditable(numberCell(0, "padding-left-lg", "", false)),
      nonEditable(numberCell(0, "padding-left-lg", "", false)),
      nonEditable(numberCell(0, "padding-left-lg", "", false)),

      nonEditable(numberCell(0, "padding-left-lg", "", false)),
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
      nonEditable(numberCell(0, "padding-left-lg")),
    ],
  };
}
