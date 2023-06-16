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

        nonEditable(numberCell(d["total"] ?? 0, "padding-left-lg")),
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

        nonEditable(numberCell(d["total"] ?? 0, "padding-left-lg")),

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

        nonEditable(numberCell(d["total"] ?? 0, "padding-left-lg")),
      ],
    })),
  ];
}

function type3(data) {
  return [
    ...data.map((d) => ({
      rowId: d["id"] ?? generateUID(),
      height: ROW_HEIGHT,
      cells: [
        textCell(d["potongan"], "padding-left-lg"),
        textCell(d["product_code"], "padding-left-lg"),
        textCell(d["product_description"], "padding-left-lg"),

        nonEditable(numberCell(d["jan"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["feb"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mar"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["apr"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mei"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jun"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jul"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["agu"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["sep"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["okt"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["nov"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["des"] ?? 0, "padding-left-lg")),

        nonEditable(numberCell(d["total"] ?? 0, "padding-left-lg")),
      ],
    })),
  ];
}

function type4(data) {
  return [
    ...data.map((d) => ({
      rowId: d["id"] ?? generateUID(),
      height: ROW_HEIGHT,
      cells: [
        nonEditable(textCell(d["product_code"], "padding-left-lg")),
        nonEditable(textCell(d["product_description"], "padding-left-lg")),

        nonEditable(numberCell(d["jan"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["feb"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mar"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["apr"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["mei"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jun"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["jul"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["agu"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["sep"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["okt"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["nov"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["des"] ?? 0, "padding-left-lg")),

        nonEditable(numberCell(d["total"] ?? 0, "padding-left-lg")),
      ],
    })),
  ];
}

export const getGroupRows = (data, key) => {
  const l = {
    "Stok Awal": type2(data),
    "Asumsi unit beli": type2(data),
    "Harga beli per unit": type2(data),
    "Stok akhir": type4(data),
    "Asumsi unit jual": type1(data),
    "Harga jual per unit": type1(data),
    Penjualan: type1(data),
    "Potongan penjualan": type3(data),
  };
  return l[key];
};
