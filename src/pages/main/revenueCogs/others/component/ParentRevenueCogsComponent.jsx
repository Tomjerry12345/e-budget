import { Form, Select, Button, Tabs, Typography } from "antd";
import { Card } from "@mui/material";
import ChildRevenueCogsComponent from "./ChildRevenueCogsComponent";
import { useParams } from "react-router-dom";

const ParentRevenueCogsComponent = ({ value, func, child, data, tab }) => {
  let params = useParams();

  const itemPage = params.item;

  const data1 = {
    "Revenue & COGS HK": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Harga",
          data: data.listHarga,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
      ],
      [
        {
          title: "List Pendapatan Lain",
          data: data.listPendapatanLain,
        },
        {
          title: "List Hpp Variable",
          data: data.listHppVariable,
        },
        {
          title: "List Hpp Lain",
          data: data.listHppLain,
        },
      ],
    ],
    "Revenue & COGS KIU": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Harga",
          data: data.listHarga,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
        {
          title: "List Disc",
          data: data.listDisc,
        },
      ],
      [
        {
          title: "List Pendapatan Lain",
          data: data.listPendapatanLain,
        },
        {
          title: "List Hpp Variable",
          data: data.listHppVariable,
        },
        {
          title: "List Hpp Lain",
          data: data.listHppLain,
        },
      ],
    ],
    "Revenue & COGS BTS": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Harga",
          data: data.listHarga,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
      ],
      [
        {
          title: "List Pendapatan Lain",
          data: data.listPendapatanLain,
        },
        {
          title: "List Hpp Variable",
          data: data.listHppVariable,
        },
        {
          title: "List Hpp Lain",
          data: data.listHppLain,
        },
      ],
    ],
    "Revenue & COGS KIA": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Harga",
          data: data.listHarga,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
      ],
      [
        {
          title: "List Pendapatan Lain",
          data: data.listPendapatanLain,
        },
        {
          title: "List Hpp Variable",
          data: data.listHppVariable,
        },
        {
          title: "List Hpp Lain",
          data: data.listHppLain,
        },
      ],
    ],
    "Revenue & COGS BJU": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Harga",
          data: data.listHarga,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
      ],
      [
        // {
        //   title: "List Pendapatan Lain",
        //   data: data.listPendapatanLain,
        // },
        // {
        //   title: "List Hpp Variable",
        //   data: data.listHppVariable,
        // },
        // {
        //   title: "List Hpp Lain",
        //   data: data.listHppLain,
        // },
      ],
    ],
    "Revenue & COGS BLT": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Harga",
          data: data.listHarga,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
        {
          title: "List Volume",
          data: data.listVolume,
        },
      ],
      [
        // {
        //   title: "List Pendapatan Lain",
        //   data: data.listPendapatanLain,
        // },
        // {
        //   title: "List Hpp Variable",
        //   data: data.listHppVariable,
        // },
        // {
        //   title: "List Hpp Lain",
        //   data: data.listHppLain,
        // },
      ],
    ],
    "Revenue & COGS BLU": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Harga",
          data: data.listHarga,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
        {
          title: "List Volume",
          data: data.listVolume,
        },
      ],
      [
        {
          title: "List Pendapatan Lain",
          data: data.listPendapatanLain,
        },
        {
          title: "List Hpp Variable",
          data: data.listHppVariable,
        },
        {
          title: "List Hpp Lain",
          data: data.listHppLain,
        },
      ],
    ],
    "Revenue & COGS BK": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
      ],
      [
        // {
        //   title: "List Pendapatan Lain",
        //   data: data.listPendapatanLain,
        // },
        // {
        //   title: "List Hpp Variable",
        //   data: data.listHppVariable,
        // },
        // {
        //   title: "List Hpp Lain",
        //   data: data.listHppLain,
        // },
      ],
    ],
    "Revenue & COGS BSU": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
      ],
      [
        {
          title: "List Pendapatan Lain",
          data: data.listPendapatanLain,
        },
        {
          title: "List Hpp Variable",
          data: data.listHppVariable,
        },
        {
          title: "List Hpp Lain",
          data: data.listHppLain,
        },
      ],
    ],
    "Revenue & COGS BSB": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Harga",
          data: data.listHarga,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
      ],
      [
        // {
        //   title: "List Pendapatan Lain",
        //   data: data.listPendapatanLain,
        // },
        // {
        //   title: "List Hpp Variable",
        //   data: data.listHppVariable,
        // },
        // {
        //   title: "List Hpp Lain",
        //   data: data.listHppLain,
        // },
      ],
    ],
    "Revenue & COGS KIK": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Harga",
          data: data.listHarga,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
      ],
      [
        // {
        //   title: "List Pendapatan Lain",
        //   data: data.listPendapatanLain,
        // },
        // {
        //   title: "List Hpp Variable",
        //   data: data.listHppVariable,
        // },
        // {
        //   title: "List Hpp Lain",
        //   data: data.listHppLain,
        // },
      ],
    ],
    "Revenue & COGS IKP": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Harga",
          data: data.listHarga,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
      ],
      [
        {
          title: "List Pendapatan Lain",
          data: data.listPendapatanLain,
        },
        {
          title: "List Hpp Variable",
          data: data.listHppVariable,
        },
        {
          title: "List Hpp Lain",
          data: data.listHppLain,
        },
      ],
    ],
    "Revenue & COGS BAND": [
      [
        {
          title: "List Asumsi",
          data: data.listAsumsi,
        },
        {
          title: "List Harga",
          data: data.listHarga,
        },
        {
          title: "List Penjualan",
          data: data.listPenjualan,
        },
        {
          title: "List Potongan",
          data: data.listPotongan,
        },
      ],
      [
        //   {
        //     title: "List Pendapatan Lain",
        //     data: data.listPendapatanLain,
        //   },
        //   {
        //     title: "List Hpp Variable",
        //     data: data.listHppVariable,
        //   },
        //   {
        //     title: "List Hpp Lain",
        //     data: data.listHppLain,
        //   },
      ],
    ],
  };
  return (
    <>
      <div
        className="custom-root-card"
        style={{
          padding: "0px",
          marginTop: "8px",
          marginBottom: "16px",
        }}
      >
        <Card className="card-style">
          <Form className="form-filter" layout="vertical" ref={value.ref} onFinish={func.onFinish} form={value.form}>
            {}
            <Form.Item
              label="Kode Perusahaan"
              name="code_company"
              rules={[
                {
                  required: true,
                  message: "tidak boleh kosong!",
                },
              ]}
            >
              <Select onChange={func.onChange}>
                {value.allCodeFilter.code_company.map((val, i) => (
                  <Select.Option key={i} value={val.code}>
                    {`${val.code} (${val.title})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Kode Produk"
              name="code_product"
              rules={[
                {
                  required: true,
                  message: "tidak boleh kosong!",
                },
              ]}
            >
              <Select>
                {value.allCodeFilter.code_product.map((val, i) => (
                  <Select.Option key={i} value={val.code_product}>
                    {`${val.code_product} (${val.description})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Kode Lokasi"
              name="code_location"
              rules={[
                {
                  required: true,
                  message: "tidak boleh kosong!",
                },
              ]}
            >
              <Select>
                {value.allCodeFilter.code_location.map((val, i) => (
                  <Select.Option key={i} value={val.code_location}>
                    {`${val.code_location} (${val.description})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Kode Dept"
              name="code_dept"
              rules={[
                {
                  required: true,
                  message: "tidak boleh kosong!",
                },
              ]}
            >
              <Select>
                {value.allCodeFilter.code_dept.map((val, i) => (
                  <Select.Option key={i} value={val.code_dept}>
                    {`${val.code_dept} (${val.description})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button className="btn-tampilkan" htmlType="submit">
                Tampilkan
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      {/* <div className="custom-root-layout"> */}
      {/* <Tabs
        defaultActiveKey="1"
        type="card"
        // size={size}
        items={child}
      /> */}

      {tab === "penjualan"
        ? data1[itemPage][0].map((val) => (
            <>
              <Typography.Text className="title">{val.title}</Typography.Text>
              <ChildRevenueCogsComponent className="child-revenue" value={value} data={val.data} />
            </>
          ))
        : data1[itemPage][1].map((val) => (
            <>
              <Typography.Text className="title">{val.title}</Typography.Text>
              <ChildRevenueCogsComponent className="child-revenue" value={value} data={val.data} />
            </>
          ))}

      {/* {data.map((val) => logS("hhhh", val))} */}

      {/* </div> */}
    </>
  );
};

export default ParentRevenueCogsComponent;
