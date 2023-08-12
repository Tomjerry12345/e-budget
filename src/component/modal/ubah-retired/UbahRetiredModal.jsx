import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, TreeSelect, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { log } from "../../../values/Utilitas";
import "./style.scss";

const { Title, Text } = Typography;

const CustomFooterModal = ({ onOk, onCancel, loading }) => (
  <>
    <Button className="btn-cancel" type="text" onClick={onCancel}>
      Cancel
    </Button>
    <Button className="btn-upload" type="primary" onClick={onOk} loading={loading}>
      Tambah
    </Button>
  </>
);

const bulan = [
  {
    label: "Januari",
    value: "1",
  },
  {
    label: "Februari",
    value: "2",
  },
  {
    label: "Maret",
    value: "3",
  },
  {
    label: "April",
    value: "4",
  },
  {
    label: "Mei",
    value: "5",
  },
  {
    label: "Juni",
    value: "6",
  },
  {
    label: "Juli",
    value: "7",
  },
  {
    label: "Agustus",
    value: "8",
  },
  {
    label: "September",
    value: "9",
  },
  {
    label: "Oktober",
    value: "10",
  },
  {
    label: "November",
    value: "11",
  },
  {
    label: "Desember",
    value: "12",
  },
];

const date = new Date();

const periode = [
  { label: `${date.getFullYear() - 1}`, value: `${date.getFullYear() - 1}` },
  { label: `${date.getFullYear()}`, value: `${date.getFullYear()}` },
  { label: `${date.getFullYear() + 1}`, value: `${date.getFullYear() + 1}` },
  { label: `${date.getFullYear() + 2}`, value: `${date.getFullYear() + 2}` },
];

const UbahRetiredModal = ({ open, onCancel, onFinish, form }) => {
  return (
    <Modal open={open} className={"custom-tambah-data-modal"} footer={null} onCancel={onCancel}>
      <Title level={4}>Tambah Data</Title>

      <Form onFinish={onFinish} layout="horizontal" form={form}>
        <div className="root-content-upload">
          <Form.Item label="Month" name="disposal_month">
            <Select
              defaultValue="1"
              style={{
                width: 120,
              }}
              options={bulan}
            />
          </Form.Item>
          <Form.Item label="Year" name="disposal_year">
            <Select
              defaultValue={`${date.getFullYear()}`}
              style={{
                width: 120,
              }}
              options={periode}
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: `tidak boleh kosong!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item>
          <div className="footer-custom">
            <Button className="btn-cancel" type="text" onClick={onCancel}>
              Cancel
            </Button>
            <Button className="btn-upload" type="primary" htmlType="submit">
              Tambah
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UbahRetiredModal;
