const COL_WIDTH = 110;

export function getColumns() {
  return [
    {
      columnId: "description",
      width: 300,
    },
    { columnId: "jan_actual", width: COL_WIDTH },
    { columnId: "feb_actual", width: COL_WIDTH },
    { columnId: "mar_actual", width: COL_WIDTH },
    { columnId: "apr_actual", width: COL_WIDTH },
    { columnId: "mei_actual", width: COL_WIDTH },
    { columnId: "jun_actual", width: COL_WIDTH },
    { columnId: "jul_actual", width: COL_WIDTH },
    { columnId: "agu_actual", width: COL_WIDTH },
    { columnId: "sep_actual", width: COL_WIDTH },
    { columnId: "okt_actual", width: COL_WIDTH },
    { columnId: "nov_forecast", width: COL_WIDTH },
    { columnId: "des_forecast", width: COL_WIDTH },

    { columnId: "total", width: COL_WIDTH },
  ];
}
