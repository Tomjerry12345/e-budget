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
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Harga Jual Per Unit",
          name: "listHarga",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
      ],
      [
        {
          title: "Pendapatan Operasional Lainnya",
          name: "listPendapatanLain",
        },
        {
          title: "HPP Variable",
          name: "listHppVariable",
        },
        {
          title: "Hpp Lainnya",
          name: "listHppLain",
        },
      ],
    ],
    "Revenue & COGS KIU": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Harga Jual Per Unit",
          name: "listHarga",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
        {
          title: "List Disc",
          data: data.listDisc,
        },
      ],
      [
        {
          title: "Pendapatan Operasional Lainnya",
          name: "listPendapatanLain",
        },
        {
          title: "HPP Variable",
          name: "listHppVariable",
        },
        {
          title: "Hpp Lainnya",
          name: "listHppLain",
        },
      ],
    ],
    "Revenue & COGS BTS": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Harga Jual Per Unit",
          name: "listHarga",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
      ],
      [
        {
          title: "Pendapatan Operasional Lainnya",
          name: "listPendapatanLain",
        },
        {
          title: "HPP Variable",
          name: "listHppVariable",
        },
        {
          title: "Hpp Lainnya",
          name: "listHppLain",
        },
      ],
    ],
    "Revenue & COGS KIA": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Harga Jual Per Unit",
          name: "listHarga",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
      ],
      [
        {
          title: "Pendapatan Operasional Lainnya",
          name: "listPendapatanLain",
        },
        {
          title: "HPP Variable",
          name: "listHppVariable",
        },
        {
          title: "Hpp Lainnya",
          name: "listHppLain",
        },
      ],
    ],

    "Revenue & COGS BJU": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Harga Jual Per Unit",
          name: "listHarga",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
      ],
      [
        // {
        //   title: "Pendapatan Operasional Lainnya",
        //   name: "listPendapatanLain",
        // },
        // {
        //   title: "HPP Variable",
        //   name: "listHppVariable",
        // },
        // {
        //   title: "Hpp Lainnya",
        //   name: "listHppLain",
        // },
      ],
    ],
    "Revenue & COGS BLT": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Harga Jual Per Unit",
          name: "listHarga",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
        {
          title: "List Volume",
          data: data.listVolume,
        },
      ],
      [
        // {
        //   title: "Pendapatan Operasional Lainnya",
        //   name: "listPendapatanLain",
        // },
        // {
        //   title: "HPP Variable",
        //   name: "listHppVariable",
        // },
        // {
        //   title: "Hpp Lainnya",
        //   name: "listHppLain",
        // },
      ],
    ],
    "Revenue & COGS BLU": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Harga Jual Per Unit",
          name: "listHarga",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
        {
          title: "List Volume",
          data: data.listVolume,
        },
      ],
      [
        {
          title: "Pendapatan Operasional Lainnya",
          name: "listPendapatanLain",
        },
        {
          title: "HPP Variable",
          name: "listHppVariable",
        },
        {
          title: "Hpp Lainnya",
          name: "listHppLain",
        },
      ],
    ],
    "Revenue & COGS BK": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
      ],
      [
        // {
        //   title: "Pendapatan Operasional Lainnya",
        //   name: "listPendapatanLain",
        // },
        // {
        //   title: "HPP Variable",
        //   name: "listHppVariable",
        // },
        // {
        //   title: "Hpp Lainnya",
        //   name: "listHppLain",
        // },
      ],
    ],
    "Revenue & COGS BSU": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
      ],
      [
        {
          title: "Pendapatan Operasional Lainnya",
          name: "listPendapatanLain",
        },
        {
          title: "HPP Variable",
          name: "listHppVariable",
        },
        {
          title: "Hpp Lainnya",
          name: "listHppLain",
        },
      ],
    ],
    "Revenue & COGS BSB": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Harga Jual Per Unit",
          name: "listHarga",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
      ],
      [
        // {
        //   title: "Pendapatan Operasional Lainnya",
        //   name: "listPendapatanLain",
        // },
        // {
        //   title: "HPP Variable",
        //   name: "listHppVariable",
        // },
        // {
        //   title: "Hpp Lainnya",
        //   name: "listHppLain",
        // },
      ],
    ],
    "Revenue & COGS KIK": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Harga Jual Per Unit",
          name: "listHarga",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
      ],
      [
        // {
        //   title: "Pendapatan Operasional Lainnya",
        //   name: "listPendapatanLain",
        // },
        // {
        //   title: "HPP Variable",
        //   name: "listHppVariable",
        // },
        // {
        //   title: "Hpp Lainnya",
        //   name: "listHppLain",
        // },
      ],
    ],
    "Revenue & COGS IKP": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Harga Jual Per Unit",
          name: "listHarga",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
      ],
      [
        {
          title: "Pendapatan Operasional Lainnya",
          name: "listPendapatanLain",
        },
        {
          title: "HPP Variable",
          name: "listHppVariable",
        },
        {
          title: "Hpp Lainnya",
          name: "listHppLain",
        },
      ],
    ],
    "Revenue & COGS BAND": [
      [
        {
          title: "Asumsi Unit Jual",
          name: "listAsumsi",
        },
        {
          title: "Harga Jual Per Unit",
          name: "listHarga",
        },
        {
          title: "Penjualan",
          name: "listPenjualan",
        },
        {
          title: "Potongan Penjualan",
          name: "listPotongan",
        },
      ],
      [
        //   {
        //     title: "Pendapatan Operasional Lainnya",
        //     name: "listPendapatanLain",
        //   },
        //   {
        //     title: "HPP Variable",
        //     name: "listHppVariable",
        //   },
        //   {
        //     title: "Hpp Lainnya",
        //     name: "listHppLain",
        //   },
      ],
    ],
  };

  const codeCompany = value.allCodeFilter.code_company;

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
          <Form
            className="form-filter"
            layout="vertical"
            ref={value.ref}
            onFinish={func.onFinish}
            form={value.form}
          >
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
              <Select defaultValue={codeCompany.code}>
                <Select.Option
                  selected
                  key={codeCompany.code}
                  value={codeCompany.code}
                >
                  {`${codeCompany.code} (${codeCompany.title})`}
                </Select.Option>
                {/* {value.allCodeFilter.code_company.map((val, i) => (
                  <Select.Option key={i} value={val.code}>
                    {`${val.code} (${val.title})`}
                  </Select.Option>
                ))} */}
              </Select>
            </Form.Item>

            {/* <Form.Item
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
            </Form.Item> */}

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
              <ChildRevenueCogsComponent
                className="child-revenue"
                value={value}
                name={val.name}
              />
            </>
          ))
        : data1[itemPage][1].map((val) => (
            <>
              <Typography.Text className="title">{val.title}</Typography.Text>
              <ChildRevenueCogsComponent
                className="child-revenue"
                value={value}
                name={val.name}
              />
            </>
          ))}

      {/* {data.map((val) => logS("hhhh", val))} */}

      {/* </div> */}
    </>
  );
};

export default ParentRevenueCogsComponent;
