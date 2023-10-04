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
      width: 1050,
      type: "text",
      title: "Description",
    },
    {
      columnId: "beginning_balance",
      width: 250,
      format: true,
      type: "number",
      title: "Saldo awal",
    },
  ];
}
