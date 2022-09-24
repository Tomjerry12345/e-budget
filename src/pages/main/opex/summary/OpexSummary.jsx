import { Table, Form, Button, Select } from "antd";
import { Card } from "@mui/material";
import { Option } from "antd/lib/mentions";
import React from "react";
import OpexSummaryLogic from "./OpexSummaryLogic";
import "../OpexStyle.scss";

const setXColumn = (params) => {
  return params === "Kode perusahaan" ||
    params === "Kode departemen" ||
    params === "Kode akun" ||
    params === "Kode ICP"
    ? null
    : 1600;
};

const OpexSummary = () => {
  const { value, func } = OpexSummaryLogic();

  return (
    <div className="custom-root-layout">
      <Card className="card-style-opex">
        <Form
          className="form-filter-opex"
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
            <Select
              // initialValues="211"
              style={{
                width: 130,
              }}
              // onChange={handleChange}
            >
              <Option value="211">211</Option>
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
            <Select
              style={{
                width: 130,
              }}
              // onChange={handleChange}
            >
              <Option value="107">107</Option>
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
            <Select
            // onChange={handleChange}
            >
              <Option value="110117">110117</Option>
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
            <Select

            // onChange={handleChange}
            >
              <Option value="116">116</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button className="btn-tampilkan" htmlType="submit">
              Tampilkan
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Button style={{ marginBottom: 16 }} onClick={func.onTambahData}>
        Tambah Data
      </Button>

      <Table
        className="table-custom-opex"
        rowClassName={() => "editable-row"}
        bordered
        dataSource={value.dataColumn}
        columns={value.tableColumn}
        pagination={false}
        scroll={{
          x: setXColumn(value.params.item),
          y: value.size.y - 200,
        }}
        rowKey="id"
      />
    </div>
  );
};

export default OpexSummary;
