import { Typography, Form } from "antd";
import { createRef, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getSizeScreen, log } from "../../../../../../values/Utilitas";
import MainServices from "../../../../../../services/MainServices";

const menuReveneue = {
  parentUrl: "bju",
  childUrl: [
    {
      name: "listAsumsi",
      endPoint: "listasumsi",
      update: "update",
    },
    {
      name: "listHarga",
      endPoint: "listharga",
      update: "updateharga",
    },
    {
      name: "listPenjualan",
      endPoint: "listpenjualan",
    },
    {
      name: "listPotongan",
      endPoint: "listpotongan",
      update: "updatepotongan",
    },
  ],
};

const PenjualanBjuLogic = () => {
  const [form] = Form.useForm();
  let params = useParams();
  const { state } = useLocation();

  const singleRevenue = menuReveneue;

  const ref = createRef();

  const [dataColumnInput, setDataColumnInput] = useState({
    listAsumsi: [],
    listHarga: [],
    listPenjualan: [],
    listPotongan: [],
  });

  const [codeFilter, setCodeFilter] = useState(null);
  const [loading, setLoading] = useState(false);

  const constantTableColums = {
    listAsumsi: [
      {
        title: "Kode",
        dataIndex: "code",
        width: "10%",
        fixed: "left",
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "30%",
        fixed: "left",
      },
      {
        title: `Year 2022`,
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
            dataIndex: "jan_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Feb.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "feb_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "mar_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Apr.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "apr_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>May.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mei_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Jun.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jun_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Jul.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jul_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Aug.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "aug_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Sep.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "sep_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Okt.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "okt_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Nov.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "nov_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Des.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "des_1",
            editable: true,
          },
        ],
      },
      {
        title: "Year total",
        dataIndex: "year_total_1",
        width: "14%",
      },
      {
        title: `Year 2023`,
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
            dataIndex: "jan_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Feb.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "feb_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mar_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "apr_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>May.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mei_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Jun.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jun_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Jul.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jul_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Aug.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "aug_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Sep.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "sep_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Okt.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "okt_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Nov.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "nov_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Des.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "des_2",
            editable: true,
          },
        ],
      },
      {
        title: "Year total",
        dataIndex: "year_total_2",
        width: "14%",
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
    ],
    listHarga: [
      {
        title: "Kode",
        dataIndex: "code",
        width: "10%",
        fixed: "left",
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "30%",
        fixed: "left",
      },
      {
        title: `Year 2022`,
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
            dataIndex: "jan_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Feb.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "feb_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "mar_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Apr.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "apr_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>May.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mei_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Jun.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jun_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Jul.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jul_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Aug.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "aug_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Sep.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "sep_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Okt.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "okt_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Nov.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "nov_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Des.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "des_1",
            editable: true,
          },
        ],
      },
      {
        title: "Year total",
        dataIndex: "year_total_1",
        width: "14%",
      },
      {
        title: `Year 2022`,
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
            dataIndex: "jan_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Feb.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "feb_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mar_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "apr_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>May.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mei_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Jun.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jun_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Jul.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jul_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Aug.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "aug_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Sep.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "sep_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Okt.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "okt_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Nov.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "nov_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Des.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "des_2",
            editable: true,
          },
        ],
      },
      {
        title: "Year total",
        dataIndex: "year_total_2",
        width: "14%",
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
    ],
    listPenjualan: [
      {
        title: "Kode",
        dataIndex: "code",
        width: "10%",
        fixed: "left",
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "30%",
        fixed: "left",
      },
      {
        title: `Year 2022`,
        editable: false,
        children: [
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Jan.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jan_1",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Feb.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "feb_1",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "mar_1",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Apr.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "apr_1",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>May.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mei_1",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Jun.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jun_1",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Jul.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jul_1",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Aug.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "aug_1",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Sep.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "sep_1",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Okt.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "okt_1",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Nov.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "nov_1",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Des.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "des_1",
            editable: false,
          },
        ],
      },
      {
        title: "Year total",
        dataIndex: "year_total_1",
        width: "14%",
      },
      {
        title: `Year 2023`,
        children: [
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Jan.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jan_2",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Feb.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "feb_2",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mar_2",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "apr_2",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>May.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mei_2",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Jun.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jun_2",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Jul.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jul_2",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Aug.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "aug_2",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Sep.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "sep_2",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Okt.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "okt_2",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Nov.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "nov_2",
            editable: false,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Des.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "des_2",
            editable: false,
          },
        ],
      },
      {
        title: "Year total",
        dataIndex: "year_total_2",
        width: "14%",
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
    ],
    listPotongan: [
      {
        title: "Potongan",
        dataIndex: "potongan",
        width: "20%",
        fixed: "left",
        editable: true,
      },
      {
        title: "Kode",
        dataIndex: "code",
        width: "15%",
        fixed: "left",
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "30%",
        fixed: "left",
      },
      {
        title: `Year 2022`,
        editable: false,
        children: [
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Jan.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jan_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Feb.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "feb_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "mar_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Apr.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "apr_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>May.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mei_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Jun.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jun_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Jul.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jul_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Aug.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "aug_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="act-styles">Actual</Typography.Text>
                <Typography.Text>Sep.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "sep_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Okt.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "okt_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Nov.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "nov_1",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="for-styles">
                  Forecast
                </Typography.Text>
                <Typography.Text>Des.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "des_1",
            editable: true,
          },
        ],
      },
      {
        title: "Year total",
        dataIndex: "year_total_1",
        width: "14%",
      },
      {
        title: `Year 2023`,
        children: [
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Jan.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jan_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Feb.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "feb_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mar_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Mar.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "apr_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>May.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "mei_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Jun.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jun_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Jul.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "jul_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Aug.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "aug_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Sep.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "sep_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Okt.</Typography.Text>
              </div>
            ),
            width: 100,
            dataIndex: "okt_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Nov.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "nov_2",
            editable: true,
          },
          {
            title: (
              <div className="title-table">
                <Typography.Text className="ebu-styles">Budget</Typography.Text>
                <Typography.Text>Des.</Typography.Text>
              </div>
            ),
            width: 110,
            dataIndex: "des_2",
            editable: true,
          },
        ],
      },
      {
        title: "Year total",
        dataIndex: "year_total_2",
        width: "14%",
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
    ],
  };

  const onSetColumn = (constColumns) => {
    const columns = constColumns.map((col) => {
      // console.log(`col => ${JSON.stringify(col)}`);
      if (!col.editable) {
        return col;
      }

      let newCol = {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };

      if (col.children) {
        newCol.children = col.children.map((t) => {
          return {
            ...t,
            onCell: (record) => ({
              record,
              editable: t.editable,
              dataIndex: t.dataIndex,
              title: t.title,
              handleSave,
            }),
          };
        });
      }

      return newCol;
    });
    return columns;
  };

  const tableColumn = {
    listAsumsi: onSetColumn(constantTableColums["listAsumsi"]),
    listHarga: onSetColumn(constantTableColums["listHarga"]),
    listPenjualan: onSetColumn(constantTableColums["listPenjualan"]),
    listPotongan: onSetColumn(constantTableColums["listPotongan"]),
  };

  useEffect(() => {
    log("codeFilter effect", state);
    if (state !== null) {
      onFinish(state);
      window.history.replaceState({}, document.title);
    }
  }, [state]);

  const onFinish = (values) => {
    setLoading(true);
    onSetDataTable(values);
  };

  const onSetDataTable = async (values) => {
    const { code_company, code_dept, code_location } = values;

    // let fCodeCompany = code_company.replace(/[^0-9]/g, "");
    // let fCodeLocation = code_location.replace(/[^0-9]/g, "");
    // let fCodeDept = code_dept.replace(/[^0-9]/g, "");

    let fCodeCompany = code_company;
    let fCodeLocation = code_dept;
    let fCodeDept = code_location;

    log("fCodeCompany", fCodeCompany);

    const childUrl = singleRevenue.childUrl;

    const resListAsumsi = await getData(
      fCodeCompany,
      fCodeLocation,
      fCodeDept,
      childUrl[0].endPoint,
      childUrl[0].update
    );
    const resListHarga = await getData(
      fCodeCompany,
      fCodeLocation,
      fCodeDept,
      childUrl[1].endPoint,
      childUrl[1].update
    );
    const resListPenjualan = await getData(
      fCodeCompany,
      fCodeLocation,
      fCodeDept,
      childUrl[2].endPoint,
      childUrl[2].update
    );
    const resListPotongan = await getData(
      fCodeCompany,
      fCodeLocation,
      fCodeDept,
      childUrl[3].endPoint,
      childUrl[3].update
    );

    setDataColumnInput({
      ...dataColumnInput,
      [childUrl[0].name]: resListAsumsi,
      [childUrl[1].name]: resListHarga,
      [childUrl[2].name]: resListPenjualan,
      [childUrl[3].name]: resListPotongan,
    });
    // setTableColumn({ ...tableColumn, [childUrl[0].name]: resListAsumsi.column, [childUrl[1].name]: resListHarga.column, [childUrl[2].name]: resListPenjualan.column, [childUrl[3].name]: resListPotongan.column });

    setCodeFilter({
      code_company: fCodeCompany,
      code_dept: fCodeDept,
      code_location: fCodeLocation,
    });

    // dispatch(getAsync(url, "get-data"));
  };

  const getData = async (
    codeCompany,
    codeLocation,
    codeDept,
    endPoint,
    update
  ) => {
    const url = `${menuReveneue.parentUrl}/${endPoint}?code_company=${codeCompany}&code_location=${codeLocation}&code_dept=${codeDept}`;

    const { data } = await MainServices.get(url);

    log("data", data);

    const list = getDataTable(data, update);

    setLoading(false);

    return list;
  };

  const getDataTable = (response, e) => {
    const { data } = response;
    let list = [];
    let year_1 = 0;
    let year_2 = 0;
    let year_total_1 = "";
    let year_total_2 = "";

    data?.list?.forEach((val, i) => {
      if (val.detail !== null) {
        year_1 = val.detail[0].year;
        year_2 = val.detail[1].year;

        year_total_1 = 0;
        year_total_2 = 0;

        const potongan = val.potongan;
        const code = `${val.code}`;
        const description = val.description;
        const uuid = val.uuid;

        const listYear1 = [];
        const listYear2 = [];

        val.detail[0].list_month?.forEach((month) => {
          listYear1.push(month);
          year_total_1 += month.value;
        });

        val.detail[1].list_month?.forEach((month) => {
          listYear2.push(month);
          year_total_2 += month.value;
        });

        list.push({
          key: i,
          uuid: uuid,
          potongan: potongan,
          code: code,
          description: description,
          endpoint: e,
          jan_1: listYear1[0]?.value,
          jan_1_uuid: listYear1[0]?.uuid,
          jan_1_month: listYear1[0]?.month,
          jan_1_year: year_1,
          feb_1: listYear1[1]?.value,
          feb_1_uuid: listYear1[1]?.uuid,
          feb_1_month: listYear1[1]?.month,
          feb_1_year: year_1,
          mar_1: listYear1[2]?.value,
          mar_1_uuid: listYear1[2]?.uuid,
          mar_1_month: listYear1[2]?.month,
          mar_1_year: year_1,
          apr_1: listYear1[3]?.value,
          apr_1_uuid: listYear1[3]?.uuid,
          apr_1_month: listYear1[3]?.month,
          apr_1_year: year_1,
          mei_1: listYear1[4]?.value,
          mei_1_uuid: listYear1[4]?.uuid,
          mei_1_month: listYear1[4]?.month,
          mei_1_year: year_1,
          jun_1: listYear1[5]?.value,
          jun_1_uuid: listYear1[5]?.uuid,
          jun_1_month: listYear1[5]?.month,
          jun_1_year: year_1,
          jul_1: listYear1[6]?.value,
          jul_1_uuid: listYear1[6]?.uuid,
          jul_1_month: listYear1[6]?.month,
          jul_1_year: year_1,
          aug_1: listYear1[7]?.value,
          aug_1_uuid: listYear1[7]?.uuid,
          aug_1_month: listYear1[7]?.month,
          aug_1_year: year_1,
          sep_1: listYear1[8]?.value,
          sep_1_uuid: listYear1[8]?.uuid,
          sep_1_month: listYear1[8]?.month,
          sep_1_year: year_1,
          okt_1: listYear1[9]?.value,
          okt_1_uuid: listYear1[9]?.uuid,
          okt_1_month: listYear1[9]?.month,
          okt_1_year: year_1,
          nov_1: listYear1[10]?.value,
          nov_1_uuid: listYear1[10]?.uuid,
          nov_1_month: listYear1[10]?.month,
          nov_1_year: year_1,
          des_1: listYear1[11]?.value,
          des_1_uuid: listYear1[11]?.uuid,
          des_1_month: listYear1[11]?.month,
          des_1_year: year_1,
          year_total_1: year_total_1,
          jan_2: listYear2[0]?.value,
          jan_2_uuid: listYear2[0]?.uuid,
          jan_2_month: listYear2[0]?.month,
          jan_2_year: year_2,
          feb_2: listYear2[1]?.value,
          feb_2_uuid: listYear2[1]?.uuid,
          feb_2_month: listYear2[1]?.month,
          feb_2_year: year_2,
          mar_2: listYear2[2]?.value,
          mar_2_uuid: listYear2[2]?.uuid,
          mar_2_month: listYear2[2]?.month,
          mar_2_year: year_2,
          apr_2: listYear2[3]?.value,
          apr_2_uuid: listYear2[3]?.uuid,
          apr_2_month: listYear2[3]?.month,
          apr_2_year: year_2,
          mei_2: listYear2[4]?.value,
          mei_2_uuid: listYear2[4]?.uuid,
          mei_2_month: listYear2[4]?.month,
          mei_2_year: year_2,
          jun_2: listYear2[5]?.value,
          jun_2_uuid: listYear2[5]?.uuid,
          jun_2_month: listYear2[5]?.month,
          jun_2_year: year_2,
          jul_2: listYear2[6]?.value,
          jul_2_uuid: listYear2[6]?.uuid,
          jul_2_month: listYear2[6]?.month,
          jul_2_year: year_2,
          aug_2: listYear2[7]?.value,
          aug_2_uuid: listYear2[7]?.uuid,
          aug_2_month: listYear2[7]?.month,
          aug_2_year: year_2,
          sep_2: listYear2[8]?.value,
          sep_2_uuid: listYear2[8]?.uuid,
          sep_2_month: listYear2[8]?.month,
          sep_2_year: year_2,
          okt_2: listYear2[9]?.value,
          okt_2_uuid: listYear2[9]?.uuid,
          okt_2_month: listYear2[9]?.month,
          okt_2_year: year_2,
          nov_2: listYear2[10]?.value,
          nov_2_uuid: listYear2[10]?.uuid,
          nov_2_month: listYear2[10]?.month,
          nov_2_year: year_2,
          des_2: listYear2[11]?.value,
          des_2_uuid: listYear2[11]?.uuid,
          des_2_month: listYear2[11]?.month,
          des_2_year: year_2,
          year_total_2: year_total_2,
        });
      }
    });

    return list;
  };

  const handleSave = async (row, keysEdit, valuesEdit) => {
    let formData = new FormData();
    const { code_company, code_dept, code_location } = codeFilter;
    const code = row.code;

    let year, month, uuid;

    if (keysEdit[0] === "potongan") {
      uuid = row[`uuid`];
      year = "2022";
      month = "Januari";
    } else {
      year = row[`${keysEdit}_year`];
      month = row[`${keysEdit}_month`];
      uuid = row[`${keysEdit}_uuid`];
    }

    let e = row["endpoint"];

    if (uuid === null) {
      formData.append("code", code);
      formData.append("code_company", code_company);
      // formData.append("code_product", code_product);
      formData.append("code_location", code_location);
      formData.append("code_dept", code_dept);
      formData.append("month", month);
      formData.append("year", year);
    } else {
      formData.append("uuid", uuid);
    }

    formData.append("value", valuesEdit);

    const response = await MainServices.post(
      `${singleRevenue.parentUrl}/${e}`,
      formData
    );

    log("response-update", response);

    onSetDataTable(codeFilter);
  };

  return {
    value: {
      dataColumnInput,
      tableColumn,
      params,
      ref,
      loading,
      form,
    },
    func: {
      onFinish,
    },
  };
};

export default PenjualanBjuLogic;
