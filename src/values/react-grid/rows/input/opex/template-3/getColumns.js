const COL_WIDTH = 130;

export function getColumns() {
  return [
    {
      columnId: "name",
      width: 350,
    },
    { columnId: "jan", width: COL_WIDTH },
    { columnId: "feb", width: COL_WIDTH },
    { columnId: "mar", width: COL_WIDTH },
    { columnId: "apr", width: COL_WIDTH },
    { columnId: "mei", width: COL_WIDTH },
    { columnId: "jun", width: COL_WIDTH },
    { columnId: "jul", width: COL_WIDTH },
    { columnId: "agu", width: COL_WIDTH },
    { columnId: "sep", width: COL_WIDTH },
    { columnId: "okt", width: COL_WIDTH },
    { columnId: "nov", width: COL_WIDTH },
    { columnId: "des", width: COL_WIDTH },

    { columnId: "total_qty", width: 120 },
  ];
}
