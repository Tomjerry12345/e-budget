import { Button, Form, Input, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./style.scss";
import { useEffect, useState } from "react";
import MainServices from "services/MainServices";

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

const ModalManagementUser = ({
  open,
  onCancel,
  onOk,
  loading,
  title,
  form,
  isEdit = false,
}) => {
  const [listCompany, setListCompany] = useState([]);

  const [user_group, setUserGroup] = useState("");

  useEffect(() => {
    getListCompany();
  }, []);

  const getListCompany = async () => {
    const { data } = await MainServices.get("company/list-child");

    if (data.responseCode === 200) {
      setListCompany(data.data);
    }
  };

  return (
    <Modal open={open} className="modal-management-user" footer={null} onCancel={onCancel}>
      <Title level={4}>{isEdit ? "Edit" : "Tambah"} user</Title>
      <Form onFinish={onOk} layout="vertical" form={form}>
        <div className="root-content-upload">
          <div className="layout-upload-file">
            <FormItem label="Username" name="username" children={<Input />} />
            {!isEdit ? (
              <FormItem label="Password" name="password" children={<Input />} />
            ) : null}

            <FormItem label="Nama" name="name" children={<Input />} />
            <FormItem
              label="User group"
              name="user_group"
              children={
                <Select
                  // placeholder="User group"
                  onChange={(e) => {
                    form.setFieldsValue({ user_group: e });
                    setUserGroup(e);
                  }}
                  options={[
                    {
                      value: "usersbu",
                      label: "Usersbu",
                    },
                    {
                      value: "reviewer",
                      label: "Reviewer",
                    },
                  ]}
                />
              }
            />
            <FormItem
              label="Akses perusahaan"
              name="code_company"
              children={
                <Select
                  disabled={user_group === "" && !isEdit}
                  mode={user_group === "usersbu" ? null : "multiple"}
                  allowClear
                  onChange={(e) => {
                    form.setFieldsValue({ code_company: e });
                  }}
                  options={listCompany.map((e) => ({
                    value: e.code,
                    label: e.description,
                  }))}
                />
              }
            />
          </div>
          <Form.Item className="footer-custom">
            <Button className="btn-cancel" type="text" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              className="btn-tambah"
              type="primary"
              htmlType="submit"
              // loading={loading}
            >
              {isEdit ? "Edit" : "Tambah"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalManagementUser;
