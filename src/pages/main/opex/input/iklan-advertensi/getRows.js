import {
  emptyTextCell,
  nonEditable,
  textCell,
  monthHeaderCell,
  numberCell,
  noSideBorders,
  rootHeaderCell,
} from "../../../../../values/react-grid/cells";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const COLOR_1 = "#107C41";
const COLOR_2 = "#107C41";

function getRootHeaderRow() {
  return {
    rowId: HEADER_ROOT_ROW_ID,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("", "justify-content-center text-lg font-bold")),
      nonEditable(textCell("Aktivitas", "justify-content-center text-lg font-bold")),
      nonEditable(textCell("Cost Driver", "justify-content-center text-lg font-bold")),

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

      nonEditable(rootHeaderCell("Jumlah Bulan", "justify-content-center", COLOR_1)),
      nonEditable(rootHeaderCell("Tarif", "justify-content-center", COLOR_1)),
      nonEditable(
        rootHeaderCell("Total Beban Iklan & Advertensi", "justify-content-center", COLOR_1)
      ),

      nonEditable(monthHeaderCell(`Jan`, "justify-content-center", COLOR_2)),
      nonEditable(monthHeaderCell(`Feb`, "justify-content-center", COLOR_2)),
      nonEditable(monthHeaderCell(`Mar`, "justify-content-center", COLOR_2)),
      nonEditable(monthHeaderCell(`Apr`, "justify-content-center", COLOR_2)),
      nonEditable(monthHeaderCell(`Mei`, "justify-content-center", COLOR_2)),
      nonEditable(monthHeaderCell(`Jun`, "justify-content-center", COLOR_2)),
      nonEditable(monthHeaderCell(`Jul`, "justify-content-center", COLOR_2)),
      nonEditable(monthHeaderCell(`Agu`, "justify-content-center", COLOR_2)),
      nonEditable(monthHeaderCell(`Sep`, "justify-content-center", COLOR_2)),
      nonEditable(monthHeaderCell(`Okt`, "justify-content-center", COLOR_2)),
      nonEditable(monthHeaderCell(`Nov`, "justify-content-center", COLOR_2)),
      nonEditable(monthHeaderCell(`Des`, "justify-content-center", COLOR_2)),
    ],
  };
}

function getGroupRows(groups) {
  return [
    ...groups.map((d) => ({
      rowId: d["id"],
      height: ROW_HEIGHT,
      cells: [
        // Tahun 1
        // nonEditable(
        //   chevronCell(d["account"], d["hasChildren"], d["parentId"], "padding-left-lg")
        // ),
        textCell(d["name"], "padding-left-lg"),
        nonEditable(textCell(d["activity"], "padding-left-lg")),
        nonEditable(textCell(d["cost_driver"], "padding-left-lg")),
        nonEditable(numberCell(d["jan"], "padding-left-lg")),
        nonEditable(numberCell(d["feb"], "padding-left-lg")),
        nonEditable(numberCell(d["mar"], "padding-left-lg")),
        nonEditable(numberCell(d["apr"], "padding-left-lg")),
        nonEditable(numberCell(d["mei"], "padding-left-lg")),
        nonEditable(numberCell(d["jun"], "padding-left-lg")),
        nonEditable(numberCell(d["jul"], "padding-left-lg")),
        nonEditable(numberCell(d["agu"], "padding-left-lg")),
        nonEditable(numberCell(d["sep"], "padding-left-lg")),
        nonEditable(numberCell(d["okt"], "padding-left-lg")),
        nonEditable(numberCell(d["nov"], "padding-left-lg")),
        nonEditable(numberCell(d["des"], "padding-left-lg")),

        nonEditable(numberCell(d["total_qty"], "padding-left-lg")),
        nonEditable(numberCell(d["rates"], "padding-left-lg")),
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

function rowTotal(titleTotal) {
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

      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),

      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),

      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
      noSideBorders(nonEditable(rootHeaderCell("", "", "beige"))),
    ],
  };
}

export function getRows({ data, titleTotal }) {
  return [getRootHeaderRow(), ...getGroupRows(data), rowTotal(titleTotal)];
}
