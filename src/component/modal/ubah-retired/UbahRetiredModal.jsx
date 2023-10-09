import { Button, Form, Input, InputNumber, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./style.scss";

const { Title } = Typography;

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

const UbahRetiredModal = ({ open, onCancel, onFinish, form }) => {
  return (
    <Modal
      open={open}
      className={"custom-tambah-data-modal"}
      footer={null}
      onCancel={onCancel}
    >
      <Title level={4}>Tambah Data</Title>

      <Form onFinish={onFinish} layout="vertical" form={form}>
        <div className="root-content-upload">
          <Form.Item label="Month" name="disposal_month">
            <Select
              style={{
                width: 120,
              }}
              options={bulan}
            />
          </Form.Item>
          <Form.Item label="Year" name="disposal_year">
            <Input
              style={{
                width: 120,
              }}
              disabled
            />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: `tidak boleh kosong!`,
              },
            ]}
          >
            <InputNumber
              style={{
                width: 300,
              }}
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
            <InputNumber
              style={{
                width: 300,
              }}
            />
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
