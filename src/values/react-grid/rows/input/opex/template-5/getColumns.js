const COL_WIDTH = 110;

export function getColumns() {
  return [
    {
      columnId: "name",
      width: 300,
    },
    {
      columnId: "activity",
      width: 200,
    },
    {
      columnId: "cost_driver",
      width: 200,
    },
    {
      columnId: "unit",
      width: 200,
    },
    {
      columnId: "amount",
      width: 200,
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

    { columnId: "total_quantity", width: COL_WIDTH },
    { columnId: "rates", width: COL_WIDTH },
    { columnId: "grand_total", width: COL_WIDTH },

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
