const COL_WIDTH = 110;

export function getColumns() {
  return [
    {
      columnId: "name",
      width: 300,
    },
    {
      columnId: "total",
      width: 200,
    },
    { columnId: "jan_rates", width: COL_WIDTH },
    { columnId: "feb_rates", width: COL_WIDTH },
    { columnId: "mar_rates", width: COL_WIDTH },
    { columnId: "apr_rates", width: COL_WIDTH },
    { columnId: "mei_rates", width: COL_WIDTH },
    { columnId: "jun_rates", width: COL_WIDTH },
    { columnId: "jul_rates", width: COL_WIDTH },
    { columnId: "agu_rates", width: COL_WIDTH },
    { columnId: "sep_rates", width: COL_WIDTH },
    { columnId: "okt_rates", width: COL_WIDTH },
    { columnId: "nov_rates", width: COL_WIDTH },
    { columnId: "des_rates", width: COL_WIDTH },
  ];
}
