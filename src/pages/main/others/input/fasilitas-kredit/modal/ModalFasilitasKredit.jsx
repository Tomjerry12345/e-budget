/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./style.scss";

const { Title } = Typography;

const FormItem = ({ label, name, children }) => (
  <Form.Item
    label={label}
    name={name}
    // rules={[
    //   {
    //     required: true,
    //     message: `${name} tidak boleh kosong!`,
    //   },
    // ]}
  >
    {children}
  </Form.Item>
);

const ModalFasilitasKredit = ({ open, onCancel, onOk, form }) => {
  return (
    <Modal className="management-user" open={open} footer={null} onCancel={onCancel}>
      <Title level={4}>Tambah Fasilitas Kredit</Title>
      <Form onFinish={onOk} layout="vertical" form={form} autoComplete="off">
        <FormItem label="NIK" name="nik" children={<Input />} />

        <Form.Item className="footer-custom">
          <Button className="btn-cancel" type="text" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="btn-tambah"
            type="primary"
            htmlType="submit"
          >
            Tambah
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFasilitasKredit;
