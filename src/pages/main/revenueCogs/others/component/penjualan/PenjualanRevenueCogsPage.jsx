import { Form, Select, Button, Tabs, Typography } from "antd";
import { Card } from "@mui/material";
// import ChildRevenueCogsComponent from "./ChildRevenueCogsComponent";
import { useParams } from "react-router-dom";
// import { Input } from "antd";
import PenjualanRevenueCogsLogic from "./PenjualanRevenueCogsLogic";
import ChildRevenueCogsComponent from "../ChildRevenueCogsComponent";

const PenjualanRevenueCogsPage = ({ tabsKey }) => {
  const { value, func } = PenjualanRevenueCogsLogic({ tabsKey });

  let params = useParams();

  const itemPage = params.item;

  const data1 = {
    "Revenue & COGS HK": [
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
    "Revenue & COGS KIU": [
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
        name: "listDisc",
      },
    ],
    "Revenue & COGS BTS": [
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
    "Revenue & COGS KIA": [
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
    "Revenue & COGS BJU": [
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
    "Revenue & COGS BLT": [
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
        data: "listVolume",
      },
    ],
    "Revenue & COGS BLU": [
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
        data: "listVolume",
      },
    ],
    "Revenue & COGS BK": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
    ],
    "Revenue & COGS BSU": [
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
    "Revenue & COGS BSB": [
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
    "Revenue & COGS KIK": [
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
    "Revenue & COGS IKP": [
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
    "Revenue & COGS BAND": [
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
  };

  const codeCompany = value.filterCompany;

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
              <Select>
                <Select.Option
                  value={codeCompany.code}
                >{`${codeCompany.code} (${codeCompany.title})`}</Select.Option>
              </Select>
            </Form.Item>

            {itemPage === "Revenue & COGS BJU" ? (
              <Form.Item
                label="Kode Project"
                name="code_project"
                rules={[
                  {
                    required: true,
                    message: "tidak boleh kosong!",
                  },
                ]}
              >
                <Select>
                  {/* {value.codeProject.length > 0
                    ? value.codeProject.map((val, i) => (
                        <Select.Option key={val.code} value={val.title}>
                          {`${val.code} (${val.title})`}
                        </Select.Option>
                      ))
                    : null} */}
                  {value.allCodeFilter.code_project &&
                    value.allCodeFilter.code_project.map((val, i) => (
                      <Select.Option key={i} value={val.code}>
                        {`${val.code} (${val.description})`}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            ) : null}

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
      {data1[itemPage].map((val) => (
        <>
          <Typography.Text className="title">{val.title}</Typography.Text>
          <ChildRevenueCogsComponent
            className="child-revenue"
            value={value}
            name={val.name}
          />
        </>
      ))}
    </>
  );
};

export default PenjualanRevenueCogsPage;
