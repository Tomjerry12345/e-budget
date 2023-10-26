/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./style.scss";
import MainServices from "services/MainServices";
import { useState } from "react";
import { useEffect } from "react";

const { Title } = Typography;

const FormItem = ({ label, name, children }) => (
  <Form.Item
    label={label}
    name={name}
    rules={[
      {
        required: true,
        message: `${label} tidak boleh kosong!`,
      },
    ]}
  >
    {children}
  </Form.Item>
);

const ModalFasilitasKredit = ({ open, onCancel, onOk, form }) => {
  const [listBank, setListBank] = useState([]);
  const [listAccount, setListAccount] = useState([]);
  const [params, setParams] = useState({
    nama_bank: "",
    type: "",
    account: "",
  });

  const listType = [
    {
      value: "long",
      label: "Long",
    },
    {
      value: "short",
      label: "Short",
    },
  ];

  useEffect(() => {
    getListNamaBank();
  }, []);

  useEffect(() => {
    if (params.nama_bank !== "" && params.type !== "") {
      getListAccount();
    }
  }, [params]);

  const getListNamaBank = async () => {
    try {
      const { data } = await MainServices.get("config/credit-facility/names");

      setListBank(data.data);
    } catch (e) {}
  };

  const getListAccount = async () => {
    try {
      const { data } = await MainServices.get(
        `config/credit-facility/accounts/${params.nama_bank}?type=${params.type}`
      );

      setListAccount(data.data);
    } catch (e) {}
  };

  return (
    <Modal className="management-user" open={open} footer={null} onCancel={onCancel}>
      <Title level={4}>Tambah Fasilitas Kredit</Title>
      <Form onFinish={onOk} layout="vertical" form={form} autoComplete="off">
        <FormItem
          label="Nama Bank"
          name="nama_bank"
          children={
            <Select
              allowClear
              onChange={(e) => {
                setParams({
                  ...params,
                  nama_bank: e,
                });
                form.setFieldsValue({ nama_bank: e });
              }}
              options={listBank.map((e) => ({
                value: e.slug,
                label: e.name,
              }))}
            />
          }
        />
        <FormItem
          label="Type"
          name="type"
          children={
            <Select
              allowClear
              onChange={(e) => {
                setParams({
                  ...params,
                  type: e,
                });
                form.setFieldsValue({ type: e });
              }}
              options={listType}
            />
          }
        />
        <FormItem
          label="Code Account"
          name="code_account"
          children={
            <Select
              allowClear
              onChange={(e) => {
                setParams({
                  ...params,
                  code_account: e,
                });
                form.setFieldsValue({ code_account: e });
              }}
              options={listAccount.map((e) => ({
                value: e.account,
                label: `${e.account} - ${e.description}`,
              }))}
            />
          }
        />

        <Form.Item className="footer-custom">
          <Button className="btn-cancel" type="text" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="btn-tambah" type="primary" htmlType="submit">
            Tambah
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFasilitasKredit;
