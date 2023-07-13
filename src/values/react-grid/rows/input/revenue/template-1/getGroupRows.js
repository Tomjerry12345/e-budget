import { generateUID } from "values/Utilitas";
import { ROW_HEIGHT } from "./Constant";

const { nonEditable, textCell, numberCell } = require("values/react-grid/cells");

function type1(data) {
  return [
    ...data.map((d) => ({
      rowId: d["id"] ?? generateUID(),
      newRow: d["id"] === null,
      height: ROW_HEIGHT,
      cells: [
        textCell(d["product_code"], "padding-left-lg"),
        textCell(d["product_description"], "padding-left-lg"),

        numberCell(d["jan"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["feb"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["mar"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["apr"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["mei"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["jun"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["jul"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["agu"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["sep"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["okt"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["nov"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["des"] ?? 0, "padding-left-lg", null, false),

        nonEditable(numberCell(d["total_1"] ?? 0, "padding-left-lg")),

        numberCell(d["jan_p"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["feb_p"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["mar_p"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["apr_p"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["mei_p"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["jun_p"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["jul_p"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["agu_p"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["sep_p"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["okt_p"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["nov_p"] ?? 0, "padding-left-lg", null, false),
        numberCell(d["des_p"] ?? 0, "padding-left-lg", null, false),

        nonEditable(numberCell(d["total_2"] ?? 0, "padding-left-lg")),
      ],
    })),
  ];
}

function type2(data) {
  return [
    ...data.map((d) => ({
      rowId: d["id"] ?? generateUID(),
      newRow: d["id"] === null,
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell(d["product_code"], "padding-left-lg")),
        nonEditable(textCell(d["product_description"], "padding-left-lg")),

        nonEditable(numberCell(d["jan"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["feb"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["mar"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["apr"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["mei"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["jun"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["jul"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["agu"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["sep"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["okt"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["nov"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["des"] ?? 0, "padding-left-lg", null, false)),

        nonEditable(numberCell(d["total_1"] ?? 0, "padding-left-lg", null, false)),

        nonEditable(numberCell(d["jan_p"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["feb_p"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["mar_p"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["apr_p"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["mei_p"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["jun_p"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["jul_p"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["agu_p"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["sep_p"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["okt_p"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["nov_p"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["des_p"] ?? 0, "padding-left-lg", null, false)),

        nonEditable(numberCell(d["total_2"] ?? 0, "padding-left-lg", null, false)),
      ],
    })),
  ];
}

function type3(data) {
  return [
    ...data.map((d) => ({
      rowId: d["id"] ?? generateUID(),
      newRow: d["id"] === null,
      height: ROW_HEIGHT,
      cells: [
        textCell(d["product_code"], "padding-left-lg"),
        textCell(d["product_description"], "padding-left-lg"),

        numberCell(d["jan"] ?? 0, "padding-left-lg"),
        numberCell(d["feb"] ?? 0, "padding-left-lg"),
        numberCell(d["mar"] ?? 0, "padding-left-lg"),
        numberCell(d["apr"] ?? 0, "padding-left-lg"),
        numberCell(d["mei"] ?? 0, "padding-left-lg"),
        numberCell(d["jun"] ?? 0, "padding-left-lg"),
        numberCell(d["jul"] ?? 0, "padding-left-lg"),
        numberCell(d["agu"] ?? 0, "padding-left-lg"),
        numberCell(d["sep"] ?? 0, "padding-left-lg"),
        numberCell(d["okt"] ?? 0, "padding-left-lg"),
        numberCell(d["nov"] ?? 0, "padding-left-lg"),
        numberCell(d["des"] ?? 0, "padding-left-lg"),

        nonEditable(numberCell(d["total_1"] ?? 0, "padding-left-lg")),

        numberCell(d["jan_p"] ?? 0, "padding-left-lg"),
        numberCell(d["feb_p"] ?? 0, "padding-left-lg"),
        numberCell(d["mar_p"] ?? 0, "padding-left-lg"),
        numberCell(d["apr_p"] ?? 0, "padding-left-lg"),
        numberCell(d["mei_p"] ?? 0, "padding-left-lg"),
        numberCell(d["jun_p"] ?? 0, "padding-left-lg"),
        numberCell(d["jul_p"] ?? 0, "padding-left-lg"),
        numberCell(d["agu_p"] ?? 0, "padding-left-lg"),
        numberCell(d["sep_p"] ?? 0, "padding-left-lg"),
        numberCell(d["okt_p"] ?? 0, "padding-left-lg"),
        numberCell(d["nov_p"] ?? 0, "padding-left-lg"),
        numberCell(d["des_p"] ?? 0, "padding-left-lg"),

        nonEditable(numberCell(d["total_2"] ?? 0, "padding-left-lg")),
      ],
    })),
  ];
}
// textCell(d["potongan"], "padding-left-lg"),

// function type4(data) {
//   return [
//     ...data.map((d) => ({
//       rowId: d["id"] ?? generateUID(),
//       height: ROW_HEIGHT,
//       cells: [
//         nonEditable(textCell(d["product_code"], "padding-left-lg")),
//         nonEditable(textCell(d["product_description"], "padding-left-lg")),

//         nonEditable(numberCell(d["jan"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["feb"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["mar"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["apr"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["mei"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["jun"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["jul"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["agu"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["sep"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["okt"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["nov"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["des"] ?? 0, "padding-left-lg")),

//         nonEditable(numberCell(d["total_1"] ?? 0, "padding-left-lg")),

//         nonEditable(numberCell(d["jan_p"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["feb_p"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["mar_p"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["apr_p"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["mei_p"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["jun_p"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["jul_p"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["agu_p"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["sep_p"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["okt_p"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["nov_p"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["des_p"] ?? 0, "padding-left-lg")),

//         nonEditable(numberCell(d["total_2"] ?? 0, "padding-left-lg")),
//       ],
//     })),
//   ];
// }

// function type5(data) {
//   return [
//     ...data.map((d) => ({
//       rowId: d["id"] ?? generateUID(),
//       height: ROW_HEIGHT,
//       cells: [
//         nonEditable(textCell(d["product_code"], "padding-left-lg")),
//         nonEditable(textCell(d["product_description"], "padding-left-lg")),

//         nonEditable(numberCell(d["jan"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["feb"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["mar"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["apr"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["mei"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["jun"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["jul"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["agu"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["sep"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["okt"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["nov"] ?? 0, "padding-left-lg")),
//         nonEditable(numberCell(d["des"] ?? 0, "padding-left-lg")),

//         nonEditable(numberCell(d["total"] ?? 0, "padding-left-lg")),
//       ],
//     })),
//   ];
// }

export const getGroupRows = (data, key) => {
  const l = {
    "Stok Awal": type1(data),
    "Asumsi unit beli": type1(data),
    "Harga beli per unit": type3(data),
    "Stok akhir": type2(data),
    "Asumsi unit jual": type1(data),
    "Harga jual per unit": type3(data),
    Penjualan: type2(data),
    // "Potongan penjualan": type5(data),
  };
  return l[key];
};
