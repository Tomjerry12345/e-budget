import { Table, Form, Button, Select, Spin } from "antd";
import { Card } from "@mui/material";
import React from "react";
import CapexSummaryLogic from "./CapexSummaryLogic";

const CapexSummary = () => {
  const { value, func } = CapexSummaryLogic();

  return (
    <>
      <div className="custom-root-card">
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
                {value.allCodeFilter.code_product?.map((val, i) => (
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

      <div className="custom-root-layout">
        {/* <Button style={{ marginBottom: "16px" }} onClick={func.onTambahData}>
          Tambah Data
        </Button> */}

        {value.dataColumn.length > 0 ? (
          <Table
            rowClassName={() => "editable-row"}
            bordered
            dataSource={value.dataColumn}
            columns={value.tableColumn}
            pagination={false}
            size="small"
            loading={value.loading}
            scroll={{
              y: value.size.y - 313,
            }}
            rowKey="id"
          />
        ) : value.loading === true ? (
          <div className="style-progress">
            <Spin />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CapexSummary;
