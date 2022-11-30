const columnOutputType1 = (year_1, year_2) => [
  {
    title: "Account",
    dataIndex: "account",
    width: "4%",
    fixed: "left",
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "30%",
  },
  {
    title: `Year ${year_1}`,
    dataIndex: "value_1",
    width: "4%",
    fixed: "right",
  },
  {
    title: `Year ${year_2}`,
    dataIndex: "value_2",
    width: "4%",
    fixed: "right",
  },
];

export { columnOutputType1 };
