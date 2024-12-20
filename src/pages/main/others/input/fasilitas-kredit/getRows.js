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
import { colorHeaderTable, nonEditableColor } from "values/Colors";

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
        headerCell({
          text: "No",
          rowspan: 1,
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Nama Bank & Non Bank",
          rowspan: 1,
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Rate",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Rate",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Actual ${parseInt(act) - 1}`,
          colspan: 2,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Actual Jan ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Actual Feb ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({ text: "" }),
        headerCell({
          text: `Actual Mar ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
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
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Actual Agu ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Actual Sep ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Proyeksi Okt ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Proyeksi Nov ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Proyeksi Des ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Outlook ${act}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Jan ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Feb ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Mar ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Apr ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Mei ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Jun ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Jul ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Agu ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Sep ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Okt ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Nov ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Budget Des ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `Total ${budget}`,
          colspan: 4,
          style: {
            justifyContent: "center",
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),

        // headerCell({ text: "Status", rowspan: 1 }),
        headerCell({
          text: "Collateral Aset",
          rowspan: 1,
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "% Collateral Aset",
          rowspan: 1,
          style: {
            background: colorHeaderTable,
          },
        }),
      ],
    },
    {
      rowId: "sub-header",
      cells: [
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `${act}`,
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: `${budget}`,
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        headerCell({
          text: "Kebutuhan",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Pengembalian",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Outstanding",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "Sisa Plafon",
          style: {
            background: colorHeaderTable,
          },
        }),

        // headerCell({
        //   text: "",
        //   style: {
        //     background: colorHeaderTable,
        //   },
        // }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
        headerCell({
          text: "",
          style: {
            background: colorHeaderTable,
          },
        }),
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
      height: ROW_HEIGHT,
      cells: [
        ...getColumns().map((e) => {
          let style = null;
          if (d["id"] === undefined) {
            e.nonEditabled = true;
            style = {
              fontWeight: "bold",
              background: nonEditableColor,
            };
          } else {
            // e.nonEditabled = false;
            style = {
              fontWeight: "normal",
              background: nonEditableColor,
            };
          }

          if (e.type === "text") {
            if (e.nonEditabled === undefined || e.nonEditabled === false) {
              return textCell(d[e.columnId] ?? "", "padding-left-lg");
            } else {
              return nonEditable(textCell(d[e.columnId] ?? "", "padding-left-lg", style));
            }
          } else if (e.type === "number") {
            if (e.nonEditabled === undefined || e.nonEditabled === false) {
              return numberCell(d[e.columnId] ?? 0, "padding-left-lg", null, e.format ?? false);
            } else {
              return nonEditable(
                numberCell(d[e.columnId] ?? 0, "padding-left-lg", style, e.format ?? false)
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
      // nonEditable(textCell("", "padding-left-lg")),
      // nonEditable(textCell("", "padding-left-lg")),

      // nonEditable(numberCell(0, "padding-left-lg", null, false)),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg", null, false)),
      // nonEditable(numberCell(0, "padding-left-lg", null, false)),
      // nonEditable(numberCell(0, "padding-left-lg")),

      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
      // nonEditable(numberCell(0, "padding-left-lg")),
    ],
  };
}
