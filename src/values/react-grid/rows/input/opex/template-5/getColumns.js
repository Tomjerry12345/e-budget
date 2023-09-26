const COL_WIDTH = 120;

export function getColumns() {
  return [
    {
      columnId: "name",
      width: 200,
    },
    {
      columnId: "activity",
      width: 200,
    },
    {
      columnId: "cost_driver",
      width: 120,
    },
    {
      columnId: "unit",
      width: 70,
    },
    {
      columnId: "amount",
      width: 120,
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

    { columnId: "total_quantity", width: 120 },
    { columnId: "rates", width: 120 },
    { columnId: "grand_total", width: 120 },

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
