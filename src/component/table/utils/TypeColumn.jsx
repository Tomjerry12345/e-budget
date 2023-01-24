import { Typography } from "antd";
import "./style.scss";

const columnOutputType1 = (year_1, year_2) => [
  {
    title: "Account",
    dataIndex: "account",
    width: "4%",
    // fixed: "left",
  },
  {
    title: (
      <Typography.Text className="header-title">Description</Typography.Text>
    ),
    dataIndex: "description",
    width: "30%",
  },
  {
    title: `Year ${year_1}`,
    dataIndex: "value_1",
    width: "4%",
    // fixed: "right",
    align: "right",
  },
  {
    title: `Year ${year_2}`,
    dataIndex: "value_2",
    width: "4%",
    // fixed: "right",
    align: "right",
  },
];

export { columnOutputType1 };
