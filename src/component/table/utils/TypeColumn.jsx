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
    dataIndex: "year1",
    width: "4%",
    // fixed: "right",
    align: "right",
  },
  {
    title: `Year ${year_2}`,
    dataIndex: "year2",
    width: "4%",
    // fixed: "right",
    align: "right",
  },
];

const columnOutputType2 = (year_1, year_2) => [
  {
    title: "Code",
    dataIndex: "code",
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
    dataIndex: "year1",
    width: "4%",
    // fixed: "right",
    align: "right",
  },
  {
    title: `Year ${year_2}`,
    dataIndex: "year2",
    width: "4%",
    // fixed: "right",
    align: "right",
  },
];

const columnInputType1 = (year_1, year_2) => [
  {
    title: "Account",
    dataIndex: "account",
    width: "18%",
    fixed: "left",
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "30%",
    fixed: "left",
  },
  {
    title: `Year ${year_1}`,
    editable: true,
    children: [
      {
        title: (
          <div className="title-table">
            <Typography.Text className="act-styles">Actual</Typography.Text>
            <Typography.Text>Jan.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "jan1",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="act-styles">Actual</Typography.Text>
            <Typography.Text>Feb.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "feb1",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="act-styles">Actual</Typography.Text>
            <Typography.Text>Mar.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "mar1",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="act-styles">Actual</Typography.Text>
            <Typography.Text>Apr.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "apr1",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="act-styles">Actual</Typography.Text>
            <Typography.Text>May.</Typography.Text>
          </div>
        ),
        width: 110,
        dataIndex: "mei1",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="act-styles">Actual</Typography.Text>
            <Typography.Text>Jun.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "jun1",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="act-styles">Actual</Typography.Text>
            <Typography.Text>Jul.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "jul1",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="act-styles">Actual</Typography.Text>
            <Typography.Text>Aug.</Typography.Text>
          </div>
        ),
        width: 110,
        dataIndex: "agu1",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="act-styles">Actual</Typography.Text>
            <Typography.Text>Sep.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "sep1",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="for-styles">Forecast</Typography.Text>
            <Typography.Text>Okt.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "okt1",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="for-styles">Forecast</Typography.Text>
            <Typography.Text>Nov.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "nov1",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="for-styles">Forecast</Typography.Text>
            <Typography.Text>Des.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "des1",
        editable: true,
        align: "right"
      },
    ],
  },
  {
    title: "Year total",
    dataIndex: "year1",
    width: "14%",
    align: "right"
  },
  {
    title: `Year ${year_2}`,
    editable: true,
    children: [
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>Jan.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "jan2",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>Feb.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "feb2",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>Mar.</Typography.Text>
          </div>
        ),
        width: 110,
        dataIndex: "mar2",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>Apr.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "apr2",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>May.</Typography.Text>
          </div>
        ),
        width: 110,
        dataIndex: "mei2",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>Jun.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "jun2",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>Jul.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "jul2",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>Aug.</Typography.Text>
          </div>
        ),
        width: 110,
        dataIndex: "agu2",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>Sep.</Typography.Text>
          </div>
        ),
        width: 110,
        dataIndex: "sep2",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>Okt.</Typography.Text>
          </div>
        ),
        width: 100,
        dataIndex: "okt2",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>Nov.</Typography.Text>
          </div>
        ),
        width: 110,
        dataIndex: "nov2",
        editable: true,
        align: "right"
      },
      {
        title: (
          <div className="title-table">
            <Typography.Text className="ebu-styles">Budget</Typography.Text>
            <Typography.Text>Des.</Typography.Text>
          </div>
        ),
        width: 110,
        dataIndex: "des2",
        editable: true,
        align: "right"
      },
    ],
  },
  {
    title: "Year total",
    dataIndex: "year2",
    width: "14%",
    align: "right"
  },
  // {
  //   dataIndex: "operation",
  //   fixed: "right",
  //   width: "5%",
  //   render: (_, record) =>
  //     dataColumn.length >= 1 ? (
  //       <Dropdown overlay={menu} placement="bottom">
  //         <Button icon={<MoreVertIcon />}></Button>
  //       </Dropdown>
  //     ) : null,
  // },
];

export { columnOutputType1, columnOutputType2, columnInputType1 };
