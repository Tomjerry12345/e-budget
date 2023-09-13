/* eslint-disable react-hooks/exhaustive-deps */
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

const ModalManagementUser = ({ open, onCancel, onOk, form, isEdit = false }) => {
  const [listCompany, setListCompany] = useState([]);
  const [listLocation, setListLocation] = useState([]);
  const [listDept, setListDept] = useState([]);

  const [user_group, setUserGroup] = useState();

  useEffect(() => {
    getListCompany();
  }, []);

  useEffect(() => {
    const l = form.getFieldsValue();
    setUserGroup(l.user_group);
    if (l.user_group !== undefined && l.user_group === "usersbu") {
      getListLocation(l.code_company);
      getListDept(l.code_company);
    }
  }, [isEdit]);

  const getListCompany = async () => {
    const { data } = await MainServices.get("company/list-child");

    if (data.responseCode === 200) {
      setListCompany(data.data);
    }
  };

  const getListLocation = async (e) => {
    const { data } = await MainServices.get(`location/list-by-com?code_company=${e}`);

    if (data.responseCode === 200) {
      setListLocation(data.data);
    }
  };

  const getListDept = async (e) => {
    const { data } = await MainServices.get(`department/list-dropdown?code_company=${e}`);

    if (data.responseCode === 200) {
      setListDept(data.data);
    }
  };

  return (
    <Modal className="management-user" open={open} footer={null} onCancel={onCancel}>
      <Title level={4}>{isEdit ? "Edit" : "Tambah"} user</Title>
      <Form onFinish={onOk} layout="vertical" form={form}>
        <FormItem label="Username" name="username" children={<Input />} />
        {!isEdit ? <FormItem label="Password" name="password" children={<Input />} /> : null}

        <FormItem label="Nama" name="name" children={<Input />} />
        <FormItem
          label="User group"
          name="user_group"
          children={
            <Select
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
              disabled={user_group === undefined && !isEdit}
              mode={user_group === "usersbu" ? null : "multiple"}
              allowClear
              onChange={(e) => {
                form.setFieldsValue({ code_company: e });
                getListLocation(e);
                getListDept(e);
              }}
              options={listCompany.map((e) => ({
                value: e.code,
                label: e.description,
              }))}
            />
          }
        />

        {user_group === "usersbu" ? (
          <>
            <FormItem
              label="Kode Lokasi"
              name="code_location"
              children={
                <Select
                  allowClear
                  options={listLocation.map((e) => ({
                    value: e.code,
                    label: e.description,
                  }))}
                />
              }
            />
            <FormItem
              label="Kode Department"
              name="code_department"
              children={
                <Select
                  allowClear
                  options={listDept.map((e) => ({
                    value: e.code,
                    label: e.description,
                  }))}
                />
              }
            />
          </>
        ) : null}
        <Form.Item className="footer-custom">
          <Button className="btn-cancel" type="text" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="btn-tambah" type="primary" htmlType="submit">
            {isEdit ? "Edit" : "Tambah"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalManagementUser;
