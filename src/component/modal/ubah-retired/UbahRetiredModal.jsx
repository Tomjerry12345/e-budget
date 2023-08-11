import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, TreeSelect, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { log } from "../../../values/Utilitas";
import "./style.scss";

const { Title, Text } = Typography;

const CustomFooterModal = ({ onOk, onCancel, loading }) => (
  <>
    <Button className="btn-cancel" type="text" onClick={onCancel}>
      Cancel
    </Button>
    <Button className="btn-upload" type="primary" onClick={onOk} loading={loading}>
      Tambah
    </Button>
  </>
);

// const treeData = [
//   {
//     value: "100",
//     title: "100",
//     children: [
//       {
//         value: "200",
//         title: "200",
//         children: [
//           {
//             value: "210",
//             title: "210",
//           },
//           {
//             value: "230",
//             title: "230",
//           },
//           {
//             value: "240",
//             title: "240",
//           },

//         ],
//       },
//     ],
//   },
// ];

const typeAkun = [
  {
    value: "Neraca",
    label: "Neraca",
  },
  {
    value: "CAPEX Aset",
    label: "CAPEX Aset",
  },
  {
    value: "CAPEX Penyusutan",
    label: "CAPEX Penyusutan",
  },
  {
    value: "CAPEX Akumulasi Penyusutan",
    label: "CAPEX Akumulasi Penyusutan",
  },
  {
    value: "Revenue & COGS",
    label: "Revenue & COGS",
  },
  {
    value: "MPP",
    label: "MPP",
  },
  {
    value: "OPEX",
    label: "OPEX",
  },
  {
    value: "Others PNO",
    label: "Others PNO",
  },
  {
    value: "Others BNO",
    label: "Others BNO",
  },
  {
    value: "Aset",
    label: "Aset",
  },
];

const UbahRetiredModal = ({ open, onCancel, onFinish, form }) => {
  // alert(inputTambah.length);
  return (
    <Modal
      open={open}
      className={
        // inputTambah.length > 3
        //   ? "custom-tambah-data-modal-1"
        "custom-tambah-data-modal"
      }
      // footer={<CustomFooterModal onOk={onOk} onCancel={onCancel} />}
      footer={null}
      onCancel={onCancel}
    >
      <Title level={4}>Tambah Data</Title>

      <Form
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}

        layout="horizontal"
        form={form}
      >
        <div className="root-content-upload">
          <Form.Item
            label=""
            name=""
            rules={[
              {
                required: true,
                message: `tidak boleh kosong!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
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

export default UbahRetiredModal;
