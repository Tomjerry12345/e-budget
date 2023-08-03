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
      columnId: "beginning_balance",
      width: 300,
      format: true,
      type: "number",
      title: "Saldo awal",
    },
    {
      columnId: "jan",
      width: WIDTH_BULAN,
      type: "number",
      title: "Januari",
    },
    {
      columnId: "feb",
      width: WIDTH_BULAN,
      type: "number",
      title: "Februari",
    },
    {
      columnId: "mar",
      width: WIDTH_BULAN,
      type: "number",
      title: "Maret",
    },
    {
      columnId: "apr",
      width: WIDTH_BULAN,
      type: "number",
      title: "April",
    },
    {
      columnId: "mei",
      width: WIDTH_BULAN,
      type: "number",
      title: "Mei",
    },
    {
      columnId: "jun",
      width: WIDTH_BULAN,
      type: "number",
      title: "Juni",
    },
    {
      columnId: "jul",
      width: WIDTH_BULAN,
      type: "number",
      title: "Juli",
    },
    {
      columnId: "agu",
      width: WIDTH_BULAN,
      type: "number",
      title: "Agustus",
    },
    {
      columnId: "sep",
      width: WIDTH_BULAN,
      type: "number",
      title: "September",
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
  ];
}
