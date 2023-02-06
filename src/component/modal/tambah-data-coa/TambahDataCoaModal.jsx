import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  TreeSelect,
  Typography,
} from "antd";
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

const TambahDataCoaModal = ({
  open,
  onCancel,
  onFinish,
  inputTambah,
  form,
  valueTreeData
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = (e) => {
    log("checked", e.target.checked);
    setIsChecked(e.target.checked);
  };

  const typeForm = (type) => {
    if (type === "input") {
      return <Input />;
    } else if (type === "textarea") {
      return <Input.TextArea rows={2} />;
    } else if (type === "checkbox") {
      return <Checkbox onChange={onChange} />;
    } else if (type === "select") {
      return (
        <Select
          defaultValue="Neraca"
          style={{
            width: 120,
          }}
          options={typeAkun}
        />
      );
    } else if (type === "tree-select") {
      return (
        <TreeSelect
          showSearch
          style={{
            width: "100%",
          }}
          dropdownStyle={{
            maxHeight: 400,
            overflow: "auto",
          }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          treeData={valueTreeData}
        />
      );
    }
  };

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
          {inputTambah.map((val) => {
            let component;
            if (isChecked) {
              component = (
                <Form.Item
                  label={val.label}
                  name={val.name}
                  rules={[
                    {
                      required: val.required,
                      message: `${val.label} tidak boleh kosong!`,
                    },
                  ]}
                  labelCol={val.type !== "checkbox" && val.type !== "select" ? { span: 24 } : null}
                  wrapperCol={val.type !== "checkbox" && val.type !== "select" ? { span: 24 } : null}
                >
                  {typeForm(val.type)}
                  {/* <Input /> */}
                </Form.Item>
              );
            } else {
              if (val.name !== "code_parent") {
                component = (
                  <Form.Item
                    label={val.label}
                    name={val.name}
                    rules={[
                      {
                        required: val.required,
                        message: `${val.label} tidak boleh kosong!`,
                      },
                    ]}
                    labelCol={val.type !== "checkbox" && val.type !== "select" ? { span: 24 } : null}
                    wrapperCol={val.type !== "checkbox" && val.type !== "select" ? { span: 24 } : null}
                  >
                    {typeForm(val.type)}
                    {/* <Input /> */}
                  </Form.Item>
                );
              }
            }
            return component;
          })}
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
