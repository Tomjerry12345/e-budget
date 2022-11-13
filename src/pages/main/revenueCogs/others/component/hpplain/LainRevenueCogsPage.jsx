import { Form, Select, Button, Tabs, Typography } from "antd";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";
import ChildRevenueCogsComponent from "../ChildRevenueCogsComponent";
import LainRevenueCogsLogic from "./LainRevenueCogsLogic";

const LainRevenueCogsPage = () => {
  const { value, func } = LainRevenueCogsLogic();

  let params = useParams();

  const itemPage = params.item;

  const data1 = {
    "Revenue & COGS HK": [
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
    "Revenue & COGS KIU": [
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
    "Revenue & COGS BTS": [
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
    "Revenue & COGS KIA": [
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

    "Revenue & COGS BJU": [
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
    "Revenue & COGS BLT": [
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
    "Revenue & COGS BLU": [
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
    "Revenue & COGS BK": [
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
    "Revenue & COGS BSU": [
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
    "Revenue & COGS BSB": [
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
    "Revenue & COGS KIK": [
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
    "Revenue & COGS IKP": [
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
    "Revenue & COGS BAND": [
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
          <Form className="form-filter" layout="vertical" ref={value.ref} onFinish={func.onFinish} form={value.form}>
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
                <Select.Option value={codeCompany.code}>{`${codeCompany.code} (${codeCompany.title})`}</Select.Option>
              </Select>
              {/* <Input placeholder={`${codeCompany.code} (${codeCompany.title})`} disabled value={codeCompany.code} /> */}
              {/* <Input /> */}
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
      {data1[itemPage].map((val) => (
        <>
          <Typography.Text className="title">{val.title}</Typography.Text>
          <ChildRevenueCogsComponent className="child-revenue" value={value} name={val.name} />
        </>
      ))}
    </>
  );
};

export default LainRevenueCogsPage;
