export function getColumns() {
  const WIDTH_BULAN = 100;
  return [
    {
      columnId: "account",
      width: 200,
      type: "text",
      title: "Account",
    },
    {
      columnId: "description",
      width: 500,
      type: "text",
      title: "Description",
    },
    {
      columnId: "okt",
      width: WIDTH_BULAN,
      type: "number",
      title: "Oktober",
    },
    {
      columnId: "nov",
      width: WIDTH_BULAN,
      type: "number",
      title: "November",
    },
    {
      columnId: "des",
      width: WIDTH_BULAN,
      type: "number",
      title: "Desember",
    },
    {
      columnId: "beginning_balance_p",
      width: 150,
      format: true,
      type: "number",
      title: "Saldo awal",
    },
    {
      columnId: "jan_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "Januari",
    },
    {
      columnId: "feb_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "Februari",
    },
    {
      columnId: "mar_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "Maret",
    },
    {
      columnId: "apr_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "April",
    },
    {
      columnId: "mei_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "Mei",
    },
    {
      columnId: "jun_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "Juni",
    },
    {
      columnId: "jul_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "Juli",
    },
    {
      columnId: "agu_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "Agustus",
    },
    {
      columnId: "sep_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "September",
    },
    {
      columnId: "okt_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "Oktober",
    },
    {
      columnId: "nov_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "November",
    },
    {
      columnId: "des_p",
      width: WIDTH_BULAN,
      type: "number",
      title: "Desember",
    },
  ];
}
