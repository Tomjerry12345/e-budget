/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, Select, Typography, Spin } from "antd";
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

const ModalManagementUser = ({
  open,
  onCancel,
  onOk,
  form,
  isEdit,
  record,
}) => {
  const [listCompany, setListCompany] = useState([]);
  const [listLocation, setListLocation] = useState([]);
  const [listDept, setListDept] = useState([]);
  const [userGroup, setUserGroup] = useState();

  useEffect(() => {
    getListCompany();
  }, []);

  useEffect(() => {
    try {
      log({ isEdit });
      log({ record });

      if (record !== undefined) {
        const rUserGroup = record.user_group;
        setUserGroup(record.user_group);
        if (rUserGroup === "sbu") {
          getListLocation(record.code_company);
          getListDept(record.code_company);
        }
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
    const { data } = await MainServices.get(
      `location/list-by-com?code_company=${e}`
    );

    if (data.responseCode === 200) {
      const d = data.data.filter((item) => item.code !== "all");
      setListLocation(d);
    }
  };

  const getListDept = async (e) => {
    const { data } = await MainServices.get(
      `department/list-dropdown?code_company=${e}`
    );

    if (data.responseCode === 200) {
      const d = data.data.filter((item) => item.code !== "all");
      setListDept(d);
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
        onFinish={(values) => {
          onOk(values);
          setUserGroup();
        }}
        layout="vertical"
        form={form}
        autoComplete="off"
        aria-autocomplete="none"
      >
        <FormItem
          label="NIK"
          name="nik"
          children={
            <Input
              autoComplete="off"
              aria-autocomplete="none"
              role="presentation"
            />
          }
        />
        <FormItem
          label="Email"
          name="inputemail"
          children={
            <Input
              autoComplete="off"
              aria-autocomplete="none"
              role="presentation"
            />
          }
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
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
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
                form.setFieldsValue({
                  user_group: e,
                  code_company: undefined,
                  code_location: undefined,
                  code_department: undefined,
                });
                setUserGroup(e);
              }}
              options={[
                {
                  value: "sbu",
                  label: "SBU",
                },
                {
                  value: "subholding",
                  label: "Sub Holding",
                },
                {
                  value: "hc",
                  label: "HC",
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
              <Select
                showSearch
                mode={userGroup === "sbu" ? null : "multiple"}
                onSelect={
                  userGroup === "sbu"
                    ? (e) => {
                        const code = e.split(" ");
                        form.setFieldsValue({ code_company: e });
                        if (userGroup === "sbu") {
                          getListLocation(code[0]);
                          getListDept(code[0]);
                        }
                      }
                    : null
                }
                allowClear
                filterOption={(inputValue, option) => {
                  return (
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  );
                }}
                options={listCompany.map((e) => ({
                  value: e.code,
                  label: e.description,
                }))}
              />
            }
          />
        ) : null}

        {userGroup === "sbu" ? (
          <>
            <FormItem
              label="Kode Lokasi"
              name="code_location"
              required={false}
              children={
                <Select
                  mode="multiple"
                  allowClear
                  filterOption={(inputValue, option) => {
                    return (
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    );
                  }}
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
              required={false}
              children={
                <Select
                  mode="multiple"
                  allowClear
                  filterOption={(inputValue, option) => {
                    return (
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    );
                  }}
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
