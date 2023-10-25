/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable react-hooks/exhaustive-deps */
import { AutoComplete, Button, Form, Input, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./style.scss";
import { useEffect, useState } from "react";
import MainServices from "services/MainServices";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { log } from "values/Utilitas";

const { Title } = Typography;

const FormItem = ({ label, name, children, required = true }) => (
  <Form.Item
    label={label}
    name={name}
    rules={[
      {
        required: required,
        message: `${label} tidak boleh kosong!`,
      },
    ]}
  >
    {children}
  </Form.Item>
);

const ModalManagementUser = ({ open, onCancel, onOk, form, isEdit = false, record }) => {
  const [listCompany, setListCompany] = useState([]);
  const [listLocation, setListLocation] = useState([]);
  const [listDept, setListDept] = useState([]);
  const [userGroup, setUserGroup] = useState();

  const l = form.getFieldsValue();

  useEffect(() => {
    getListCompany();
  }, []);

  useEffect(() => {
    try {
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
    <Modal
      className="management-user"
      open={open}
      footer={null}
      onCancel={() => {
        setUserGroup();
        onCancel();
      }}
    >
      <Title level={4}>{isEdit ? "Edit" : "Tambah"} user</Title>
      <Form
        onFinish={onOk}
        layout="vertical"
        form={form}
        autoComplete="off"
        aria-autocomplete="none"
      >
        <FormItem
          label="NIK"
          name="nik"
          children={<Input autoComplete="off" aria-autocomplete="none" role="presentation" />}
        />
        <FormItem
          label="Email"
          name="inputemail"
          children={<Input autoComplete="off" aria-autocomplete="none" role="presentation" />}
        />

        {!isEdit ? (
          <FormItem
            label="Password"
            name="inputpassword"
            children={
              <Input.Password
                autoComplete="new-password"
                aria-autocomplete="none"
                role="presentation"
                // placeholder="input password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            }
          />
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
        {userGroup === "sbu" || userGroup === "subholding" ? (
          <FormItem
            label="Akses perusahaan"
            name="code_company"
            children={
              // <Select
              //   allowClear
              //   disabled={user_group === undefined && !isEdit}
              //   mode={user_group === "sbu" ? null : "multiple"}
              //   onChange={(e) => {
              //     form.setFieldsValue({ code_company: e });
              //     if (user_group === "sbu") {
              //       getListLocation(e);
              //       getListDept(e);
              //     }
              //   }}
              //   options={listCompany.map((e) => ({
              //     value: e.code,
              //     label: e.description,
              //   }))}
              // />
              <AutoComplete
                options={listCompany.map((e) => ({
                  value: `${e.description}`,
                }))}
                onSelect={(e) => {
                  const code = e.split(" ");
                  form.setFieldsValue({ code_company: e });
                  if (userGroup === "sbu") {
                    getListLocation(code[0]);
                    getListDept(code[0]);
                  }
                }}
                allowClear
                filterOption={(inputValue, option) => {
                  return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
                }}
              />
            }
          />
        ) : null}

        {userGroup === "sbu" ? (
          <>
            <FormItem
              label="Kode Lokasi"
              name="code_location"
              children={
                // <Select
                //   allowClear
                //   options={listLocation.map((e) => ({
                //     value: e.code,
                //     label: e.description,
                //   }))}
                // />
                <AutoComplete
                  options={listLocation.map((e) => ({
                    value: `${e.description}`,
                  }))}
                  allowClear
                  filterOption={(inputValue, option) => {
                    return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
                  }}
                />
              }
            />
            <FormItem
              label="Kode Department"
              name="code_department"
              children={
                // <Select
                //   allowClear
                //   options={listDept.map((e) => ({
                //     value: e.code,
                //     label: e.description,
                //   }))}
                // />
                <AutoComplete
                  options={listDept.map((e) => ({
                    value: `${e.description}`,
                  }))}
                  allowClear
                  filterOption={(inputValue, option) => {
                    return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
                  }}
                />
              }
            />
          </>
        ) : null}
        <Form.Item className="footer-custom">
          <Button
            className="btn-cancel"
            type="text"
            onClick={() => {
              setUserGroup();
              onCancel();
            }}
          >
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
