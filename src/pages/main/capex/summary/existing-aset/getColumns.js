export function getColumns() {
  return [
    {
      columnId: "account",
      width: 430,
      type: "text",
      title: "Account",
    },
    {
      columnId: "description",
      width: 430,
      type: "text",
      title: "Description",
    },
    {
      columnId: "beginning_balance",
      width: 430,
      format: true,
      type: "number",
      title: "Saldo awal",
    },
  ];
}
