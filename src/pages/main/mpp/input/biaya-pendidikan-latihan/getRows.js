import { nonEditable, textCell, numberCell, headerCell } from "values/react-grid/cells";
import { createArray, generateUID, log } from "values/Utilitas";

export const HEADER_ROOT_ROW_ID = "header-root";

const ROW_HEIGHT = 32;

const TOTAL_DATA = 2;
const FIRST_TOTAL = 2;
const END_TOTAL = FIRST_TOTAL + TOTAL_DATA;

export function getRootHeaderRow() {
  return [
    {
      rowId: "header",
      cells: [
        headerCell({ text: "Grade", rowspan: 1 }),
        headerCell({ text: "", rowspan: 1 }),
        headerCell({
          text: "Forecast",
          colspan: 3,

          style: {
            justifyContent: "center",
            fontWeight: 600,
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({
          text: "Budget",
          colspan: 3,
          style: {
            justifyContent: "center",
            fontWeight: 600,
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
      ],
    },
    {
      rowId: "sub-header",
      cells: [
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "Rate" }),
        headerCell({ text: "Sep" }),
        headerCell({ text: "Okt" }),
        headerCell({ text: "Nov" }),
        headerCell({ text: "Des" }),
        headerCell({ text: "Total" }),
        headerCell({ text: "Rate" }),
        headerCell({ text: "Jan" }),
        headerCell({ text: "Feb" }),
        headerCell({ text: "Mar" }),
        headerCell({ text: "Apr" }),
        headerCell({ text: "Mei" }),
        headerCell({ text: "Jun" }),
        headerCell({ text: "Jul" }),
        headerCell({ text: "Agu" }),
        headerCell({ text: "Sep" }),
        headerCell({ text: "Okt" }),
        headerCell({ text: "Nov" }),
        headerCell({ text: "Des" }),
        headerCell({ text: "Total" }),
      ],
    },
  ];
}

const firstLoadTotalRow = (data) => {
  const list = createArray(TOTAL_DATA);

  data.forEach((e) => {
    const { forecast, budget } = e;
    list[0] += forecast ?? 0;
    list[1] += budget ?? 0;
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
  let currentGrade = null;
  let rowspan = 0;

  return [
    ...groups.map((item) => {
      const {
        id,
        grade,
        sub_grade,
        sep,
        okt,
        nov,
        des,
        total,
        jan_p,
        feb_p,
        mar_p,
        apr_p,
        mei_p,
        jun_p,
        jul_p,
        agu_p,
        sep_p,
        okt_p,
        nov_p,
        des_p,
        total_p,
      } = item;

      if (grade.grade !== currentGrade) {
        currentGrade = grade.grade;
        rowspan = 4; // Set rowspan to 4 for the first occurrence of a grade
      } else {
        rowspan = 1; // Set rowspan to 1 for subsequent occurrences of the same grade
      }

      return {
        rowId: id ?? generateUID(),
        newRow: id === null,
        gradeId: grade.id,
        subGradeId: sub_grade.id,
        cells: [
          headerCell({ text: grade.grade, rowspan }),
          nonEditable(textCell(sub_grade.sub_grade)),
          nonEditable(numberCell(0)),
          numberCell(sep),
          numberCell(okt),
          numberCell(nov),
          numberCell(des),
          nonEditable(numberCell(total)),
          nonEditable(numberCell(0)),
          numberCell(jan_p),
          numberCell(feb_p),
          numberCell(mar_p),
          numberCell(apr_p),
          numberCell(mei_p),
          numberCell(jun_p),
          numberCell(jul_p),
          numberCell(agu_p),
          numberCell(sep_p),
          numberCell(okt_p),
          numberCell(nov_p),
          numberCell(des_p),
          nonEditable(numberCell(total_p)),
        ],
      };
    }),
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

      ...total.map((e, i) =>
        nonEditable(
          numberCell(e, "padding-left-lg", {
            background: "beige",
          })
        )
      ),
    ],
  };
}

export function getRows({ data }) {
  return [
    ...getRootHeaderRow(),
    ...getGroupRows(data),
    // firstLoadTotalRow(data)
  ];
}

export function fullNewRow() {
  const list = createArray(TOTAL_DATA);
  return [...getRootHeaderRow(), reactgridNewRow(), rowTotal("Total", list)];
}

export function reactgridNewRow() {
  return {
    rowId: generateUID(),
    newRow: true,
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("", "padding-left-lg")),
      nonEditable(textCell("", "padding-left-lg")),

      nonEditable(numberCell(0, "padding-left-lg", null, false)),
      nonEditable(numberCell(0, "padding-left-lg")),
    ],
  };
}
