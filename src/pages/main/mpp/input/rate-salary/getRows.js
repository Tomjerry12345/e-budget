import {
  nonEditable,
  textCell,
  monthHeaderCell,
  rootHeaderCell,
  numberCell,
  totalCell,
  dropDownCell,
  textCellObj,
  headerCell,
} from "values/react-grid/cells";
import { createArray, generateUID, log } from "values/Utilitas";
import { getMonthDuration, getMonthName } from "values/Constant";

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
        headerCell({ text: "Grade" }),
        headerCell({ text: "Sub grade" }),
        headerCell({ text: "level" }),

        headerCell({
          text: "Forecast",
          colspan: 3,
          style: {
            justifyContent: "center",
          },
        }),
        headerCell({ text: "" }),
        headerCell({ text: "" }),

        headerCell({
          text: "Budget",
          colspan: 3,
          style: {
            justifyContent: "center",
          },
        }),
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

        headerCell({ text: "Person Grade" }),
        headerCell({ text: "job Grade" }),
        headerCell({ text: "Komparatif" }),

        headerCell({ text: "Person Grade" }),
        headerCell({ text: "job Grade" }),
        headerCell({ text: "Komparatif" }),
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
    .reduce(
      (acc, curr) => acc.map((v, i) => v + curr[i]),
      createArray(TOTAL_DATA)
    );

  log({ list });
  return rowTotal("Total", list);
};

function getGroupRows(groups) {
  let currentGrade = null;
  let currentSubGrade = null;
  let rowspanGrade = 0;
  let rowspanSubGrade = 0;

  return [
    ...groups.map((item) => {
      const {
        id,
        grade,
        sub_grade,
        level,
        person_grade,
        job_grade,
        comparative,
        person_grade_p,
        job_grade_p,
        comparative_p,
      } = item;

      if (grade.grade !== currentGrade) {
        currentGrade = grade.grade;
        rowspanGrade = 12; // Set rowspan to 4 for the first occurrence of a grade
      } else {
        rowspanGrade = 1; // Set rowspan to 1 for subsequent occurrences of the same grade
      }

      if (sub_grade.sub_grade !== currentSubGrade) {
        currentSubGrade = sub_grade.sub_grade;
        rowspanSubGrade = 3; // Set rowspan to 4 for the first occurrence of a grade
      } else {
        rowspanSubGrade = 1; // Set rowspan to 1 for subsequent occurrences of the same grade
      }

      return {
        rowId: id ?? generateUID(),
        newRow: id === null,
        gradeId: grade.id,
        subGradeId: sub_grade.id,
        levelId: level.id,
        cells: [
          headerCell({ text: grade.grade, rowspan: rowspanGrade }),
          headerCell({ text: sub_grade.sub_grade, rowspan: rowspanSubGrade }),
          headerCell({ text: level.level }),

          numberCell(person_grade ?? 0),
          numberCell(job_grade ?? 0),
          numberCell(comparative ?? 0),

          numberCell(person_grade_p ?? 0),
          numberCell(job_grade_p ?? 0),
          numberCell(comparative_p ?? 0),
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
