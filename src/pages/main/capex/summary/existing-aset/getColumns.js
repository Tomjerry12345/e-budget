export function getColumns() {
  return [
    {
      columnId: "account",
      width: 80,
      type: "text",
      title: "Account",
    },
    {
      columnId: "description",
      width: 750,
      type: "text",
      title: "Description",
    },
    {
      columnId: "beginning_balance_p",
      width: 250,
      format: true,
      type: "number",
      title: "Saldo awal",
    },
  ];
}
