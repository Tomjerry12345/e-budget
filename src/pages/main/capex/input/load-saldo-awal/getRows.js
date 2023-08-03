import { Button } from "antd";
import {
  nonEditable,
  textCell,
  monthHeaderCell,
  rootHeaderCell,
  numberCell,
  noSideBorders,
  totalCell,
  dropDownCell,
  customCell,
} from "values/react-grid/cells";
import { createArray, log } from "values/Utilitas";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 10;
const FIRST_TOTAL = 10;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

export function getRootHeaderRow() {
  return {
    rowId: HEADER_ROOT_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Asset Book", "justify-content-center font-bold")),
      nonEditable(textCell("Asset  Number", "justify-content-center font-bold")),
      nonEditable(textCell("Asset Category", "justify-content-center font-bold")),
      nonEditable(textCell("Asset Cost Account", "justify-content-center font-bold")),
      nonEditable(textCell("Depreciation Account", "justify-content-center font-bold")),
      nonEditable(textCell("Account Akumulasi", "justify-content-center font-bold")),
      nonEditable(textCell("Asset Description", "justify-content-center font-bold")),
      nonEditable(textCell("Date Placed in Service", "justify-content-center font-bold")),
      nonEditable(textCell("Account Date", "justify-content-center font-bold")),
      nonEditable(textCell("Asset Life (In Years)", "justify-content-center font-bold")),
      nonEditable(textCell("Unit", "justify-content-center font-bold")),
      nonEditable(textCell("Original Cost", "justify-content-center font-bold")),
      nonEditable(textCell("Asset Cost", "justify-content-center font-bold")),
      nonEditable(textCell("Depreciation Amount", "justify-content-center font-bold")),
      nonEditable(textCell("Cost Retired", "justify-content-center font-bold")),
      nonEditable(textCell("Accumulated Depreciation", "justify-content-center font-bold")),
      nonEditable(textCell("Net Book Value", "justify-content-center font-bold")),
      nonEditable(textCell("Disposal Aset	Month", "justify-content-center font-bold")),
      nonEditable(textCell("Disposal Aset	Year", "justify-content-center font-bold")),
      nonEditable(textCell("Nilai Jual", "justify-content-center font-bold")),
      nonEditable(textCell("Status", "justify-content-center font-bold")),
    ],
  };
}

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  data.forEach((e) => {
    list[0] += e["unit"] ?? 0;
    list[1] += e["original_cost"] ?? 0;
    list[2] += e["asset_cost"] ?? 0;
    list[3] += e["depreciation_amount"] ?? 0;
    list[4] += e["cost_retired"] ?? 0;
    list[5] += e["accumulated_depreciation"] ?? 0;
    list[6] += e["net_book_value"] ?? 0;
    list[7] += e["disposal_month"] ?? 0;
    list[8] += e["disposal_year"] ?? 0;
    list[9] += e["price"] ?? 0;
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
        nonEditable(textCell(d["asset_book"], "padding-left-lg")),
        nonEditable(textCell(d["asset_number"] ?? "-", "padding-left-lg")),
        nonEditable(textCell(d["asset_category"] ?? "-", "padding-left-lg")),
        nonEditable(textCell(d["asset_cost_account"] ?? "-", "padding-left-lg")),
        nonEditable(textCell(d["depreciation_account"] ?? "-", "padding-left-lg")),
        nonEditable(textCell(d["accumulated_account"] ?? "-", "padding-left-lg")),
        nonEditable(textCell(d["asset_description"] ?? "-", "padding-left-lg")),
        nonEditable(textCell(d["date_placed"] ?? "-", "padding-left-lg")),
        nonEditable(textCell(d["account_date"] ?? "-", "padding-left-lg")),
        nonEditable(numberCell(d["asset_life"] ?? 0, "padding-left-lg")),

        nonEditable(numberCell(d["unit"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["original_cost"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["asset_cost"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["depreciation_amount"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["cost_retired"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["accumulated_depreciation"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["net_book_value"] ?? 0, "padding-left-lg")),
        nonEditable(numberCell(d["disposal_month"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["disposal_year"] ?? 0, "padding-left-lg", null, false)),
        nonEditable(numberCell(d["price"] ?? 0, "padding-left-lg")),

        nonEditable(textCell(d["status"], "padding-left-lg")),
        // nonEditable(
        //   customCell({ widget: <Button className="btn-tambah-row">Tambah Data</Button> })
        // ),
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
      nonEditable(
        textCell(titleTotal, "padding-left-lg", {
          background: "beige",
          fontWeight: "bold",
        })
      ),

      ...total.map((e, i) => noSideBorders(totalCell(e, "", "beige", ""))),
    ],
  };
}

export function getRows({ data }) {
  return [getRootHeaderRow(), ...getGroupRows(data)];
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
      textCell("", "padding-left-lg"),
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
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),
    ],
  };
}
