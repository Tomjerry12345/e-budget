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
        headerCell({
          text: "Grade",
          rowspan: 1,
          style: {
            justifyContent: "center",
            fontWeight: 600,
          },
        }),
        headerCell({
          text: "",
          rowspan: 1,
          style: {
            justifyContent: "center",
            fontWeight: 600,
          },
        }),
        headerCell({
          text: "Jumlah Posisi Vacant",
          rowspan: 1,
          style: {
            justifyContent: "center",
            fontWeight: 600,
          },
        }),

        headerCell({
          text: "Rate",
          colspan: 5,
          style: {
            justifyContent: "center",
            fontWeight: 600,
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({
          text: "Rencana assessment",
          colspan: 4,
          style: {
            justifyContent: "center",
            fontWeight: 600,
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({
          text: "Rencana rekruitment",
          colspan: 4,
          style: {
            justifyContent: "center",
            fontWeight: 600,
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({
          text: "Rencana assessment",
          colspan: 12,
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

        headerCell({
          text: "Rencana rekruitment",
          colspan: 12,
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
      ],
    },
    {
      rowId: "sub-header",
      cells: [
        headerCell({ text: "" }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({ text: "Assessment" }),
        headerCell({ text: "Psikotes" }),
        headerCell({ text: "MCU" }),
        headerCell({ text: "Welcome Pack" }),
        headerCell({ text: "Total By Rekrutment" }),

        headerCell({ text: "Sep" }),
        headerCell({ text: "Okt" }),
        headerCell({ text: "Nov" }),
        headerCell({ text: "Des" }),

        headerCell({ text: "Sep" }),
        headerCell({ text: "Okt" }),
        headerCell({ text: "Nov" }),
        headerCell({ text: "Des" }),

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
        vacant,

        assessment,
        psychotest,
        mcu,
        welcome_pack,
        recruitment_total,

        assess_sep,
        assess_okt,
        assess_nov,
        assess_des,

        recruit_sep,
        recruit_okt,
        recruit_nov,
        recruit_des,

        assess_jan_p,
        assess_feb_p,
        assess_mar_p,
        assess_apr_p,
        assess_mei_p,
        assess_jun_p,
        assess_jul_p,
        assess_agu_p,
        assess_sep_p,
        assess_okt_p,
        assess_nov_p,
        assess_des_p,

        recruit_jan_p,
        recruit_feb_p,
        recruit_mar_p,
        recruit_apr_p,
        recruit_mei_p,
        recruit_jun_p,
        recruit_jul_p,
        recruit_agu_p,
        recruit_sep_p,
        recruit_okt_p,
        recruit_nov_p,
        recruit_des_p,
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
          numberCell(vacant),

          numberCell(assessment),
          numberCell(psychotest),
          numberCell(mcu),
          numberCell(welcome_pack),
          numberCell(recruitment_total),

          numberCell(assess_sep),
          numberCell(assess_okt),
          numberCell(assess_nov),
          numberCell(assess_des),

          numberCell(recruit_sep),
          numberCell(recruit_okt),
          numberCell(recruit_nov),
          numberCell(recruit_des),

          numberCell(assess_jan_p),
          numberCell(assess_feb_p),
          numberCell(assess_mar_p),
          numberCell(assess_apr_p),
          numberCell(assess_mei_p),
          numberCell(assess_jun_p),
          numberCell(assess_jul_p),
          numberCell(assess_agu_p),
          numberCell(assess_sep_p),
          numberCell(assess_okt_p),
          numberCell(assess_nov_p),
          numberCell(assess_des_p),

          numberCell(recruit_jan_p),
          numberCell(recruit_feb_p),
          numberCell(recruit_mar_p),
          numberCell(recruit_apr_p),
          numberCell(recruit_mei_p),
          numberCell(recruit_jun_p),
          numberCell(recruit_jul_p),
          numberCell(recruit_agu_p),
          numberCell(recruit_sep_p),
          numberCell(recruit_okt_p),
          numberCell(recruit_nov_p),
          numberCell(recruit_des_p),
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
  return [
    ...getRootHeaderRow(),
    reactgridNewRow(),
    // rowTotal("Total", list)
  ];
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
