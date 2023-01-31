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

const TambahDataCoaModal = ({
  open,
  onCancel,
  onFinish,
  inputTambah,
  form,
}) => {
  // const

  const typeForm = (type) => {
    if (type === "input") {
      return <Input />;
    } else if (type === "textarea") {
      return <Input.TextArea rows={4} />;
    }
  };

  // alert(inputTambah.length);
  return (
    <Modal
      open={open}
      className={
        inputTambah.length > 3
          ? "custom-tambah-data-modal-1"
          : "custom-tambah-data-modal"
      }
      // footer={<CustomFooterModal onOk={onOk} onCancel={onCancel} />}
      footer={null}
      onCancel={onCancel}
    >
      <Title level={4}>Tambah Data</Title>

      <Form
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="on"
        layout="vertical"
        form={form}
      >
        <div className="root-content-upload">
          {inputTambah.map((val) => (
            <Form.Item
              label={val.label}
              name={val.name}
              rules={[
                {
                  required: true,
                  message: `${val.label} tidak boleh kosong!`,
                },
              ]}
            >
              {typeForm(val.type)}
              {/* <Input /> */}
            </Form.Item>
          ))}
        </div>
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
    </Modal>
  );
};

export default TambahDataCoaModal;
