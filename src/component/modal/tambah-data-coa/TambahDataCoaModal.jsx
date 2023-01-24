import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect } from "react";
import "./style.scss";

const { Title, Text } = Typography;

const CustomFooterModal = ({ onOk, onCancel, loading }) => (
  <>
    <Button className="btn-cancel" type="text" onClick={onCancel}>
      Cancel
    </Button>
    <Button
      className="btn-upload"
      type="primary"
      onClick={onOk}
      loading={loading}
    >
      Tambah
    </Button>
  </>
);

const TambahDataCoaModal = ({ open, onCancel, onFinish }) => {
  // const
  return (
    <Modal
      open={open}
      className="custom-tambah-data-modal"
      // footer={<CustomFooterModal onOk={onOk} onCancel={onCancel} />}
      footer={null}
      onCancel={onCancel}
    >
      <Title level={4}>Tambah Data</Title>
      <div className="root-content-upload">
        <Form
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="on"
          layout="vertical"
        >
          <Form.Item
            label="Code Company"
            name="code_company"
            rules={[
              {
                required: true,
                message: "Code company tidak boleh kosong!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Code Parent"
            name="code_parent"
            rules={[
              {
                required: true,
                message: "Code parent tidak boleh kosong!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Description tidak boleh kosong!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <div className="footer-custom">
              <Button className="btn-cancel" type="text" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                className="btn-upload"
                type="primary"
                htmlType="submit"
                // onClick={onOk}
                // loading={loading}
              >
                Tambah
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default TambahDataCoaModal;
