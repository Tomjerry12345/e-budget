/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./style.scss";
import { useEffect, useState } from "react";
import MainServices from "services/MainServices";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { log } from "values/Utilitas";

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

const ModalManagementUser = ({ open, onCancel, onOk, form, isEdit = false, record }) => {
  const [listCompany, setListCompany] = useState([]);
  const [listLocation, setListLocation] = useState([]);
  const [listDept, setListDept] = useState([]);

  const [user_group, setUserGroup] = useState();

  useEffect(() => {
    getListCompany();
  }, []);

  useEffect(() => {
    try {
      const l = form.getFieldsValue();
      setUserGroup(l.user_group);
      if (l.user_group !== undefined && l.user_group === "sbu") {
        getListLocation(record.code_company);
        getListDept(record.code_company);
      }
    } catch (e) {
      log({ e });
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
      <Form onFinish={onOk} layout="vertical" form={form} autoComplete="off">
        <FormItem label="NIK" name="nik" children={<Input />} />
        <FormItem
          label="Email"
          name="inputemail"
          children={<Input />}
        />
        {!isEdit ? (
          <Form.Item name="inputpassword" label="Password">
            <Input.Password
              // placeholder="input password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
        ) : null}

        <FormItem label="Nama" name="name" children={<Input />} />
        <FormItem
          label="User group"
          name="user_group"
          children={
            <Select
              allowClear
              onChange={(e) => {
                form.setFieldsValue({ user_group: e });
                setUserGroup(e);
              }}
              options={[
                {
                  value: "sbu",
                  label: "Sbu",
                },
                {
                  value: "subholding",
                  label: "Subholding",
                },
                {
                  value: "hc",
                  label: "Hc",
                },
                {
                  value: "holding",
                  label: "Holding",
                },
              ]}
            />
          }
        />
        {user_group === "sbu" || user_group === "subholding" ? (
          <FormItem
            label="Akses perusahaan"
            name="code_company"
            children={
              <Select
                allowClear
                disabled={user_group === undefined && !isEdit}
                mode={user_group === "sbu" ? null : "multiple"}
                onChange={(e) => {
                  form.setFieldsValue({ code_company: e });
                  if (user_group === "sbu") {
                    getListLocation(e);
                    getListDept(e);
                  }
                }}
                options={listCompany.map((e) => ({
                  value: e.code,
                  label: e.description,
                }))}
              />
            }
          />
        ) : null}

        {user_group === "sbu" ? (
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
          <Button
            className="btn-tambah"
            type="primary"
            htmlType="submit"
            // disabled={user_group === undefined && !isEdit}
          >
            {isEdit ? "Save" : "Tambah"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalManagementUser;
