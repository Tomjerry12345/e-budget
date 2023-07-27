const COL_WIDTH = 110;

export function getColumns() {
  return [
    { columnId: "grade", width: 150 },
    { columnId: "sub_grade", width: 150 },
    { columnId: "level", width: 150 },

    { columnId: "person_grade", width: 150 },
    { columnId: "job_grade", width: 150 },
    { columnId: "comparative", width: 150 },

    { columnId: "person_grade_p", width: 150 },
    { columnId: "job_grade_p", width: 150 },
    { columnId: "comparative_p", width: 150 },
  ];
}
