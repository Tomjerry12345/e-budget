const Logic = () => {
  const dataSource = [
    {
      key: "1",
      no: "1",
      sbu: "PT. Hadji Kalla",
      revenue: "7.000.000.000.000",
    },
    {
      key: "2",
      no: "2",
      sbu: "PT. Gowa Modern Motor",
      revenue: "7.000.000.000",
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "SBU",
      dataIndex: "sbu",
      key: "sbu",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
  ];

  return {
    value: {
      columns,
      dataSource,
    },
    func: {},
  };
};

export default Logic;
