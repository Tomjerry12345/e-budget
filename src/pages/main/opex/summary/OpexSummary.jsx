import {
  Table,
  Form,
  Input,
  Breadcrumb,
  Typography,
  Layout,
  Button,
  Row,
  Col,
  Select,
} from "antd";
import { Card } from "@mui/material";
import { Option } from "antd/lib/mentions";
import React, { useContext, useEffect, useRef, useState } from "react";
import OpexSummaryLogic from "./OpexSummaryLogic";
import "../OpexStyle.scss";

const { Header, Content } = Layout;
const { Text } = Typography;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const setXColumn = (params) => {
  return params === "Kode perusahaan" ||
    params === "Kode departemen" ||
    params === "Kode akun" ||
    params === "Kode ICP"
    ? null
    : 1600;
};

const OpexSummary = () => {
  const { value, func } = OpexSummaryLogic();

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div className="custom-root-layout">
      <Card style={{ marginBottom: 16, height: 120 }}>
        <Form
          className="form-filter-opex"
          layout="vertical"
          ref={value.ref}
          onFinish={func.onFinish}
        >
          <Form.Item
            label="Kode Perusahaan"
            name="code_company"
            rules={[
              {
                required: true,
                message: "tidak boleh kosong!",
              },
            ]}
          >
            <Select
              // initialValues="211"
              style={{
                width: 130,
              }}
              // onChange={handleChange}
            >
              <Option value="211">211</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Kode Produk"
            name="code_product"
            rules={[
              {
                required: true,
                message: "tidak boleh kosong!",
              },
            ]}
          >
            <Select
              style={{
                width: 130,
              }}
              // onChange={handleChange}
            >
              <Option value="107">107</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Kode Lokasi"
            name="code_location"
            rules={[
              {
                required: true,
                message: "tidak boleh kosong!",
              },
            ]}
          >
            <Select
            // onChange={handleChange}
            >
              <Option value="110117">110117</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Kode Dept"
            name="code_dept"
            rules={[
              {
                required: true,
                message: "tidak boleh kosong!",
              },
            ]}
          >
            <Select

            // onChange={handleChange}
            >
              <Option value="116">116</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              style={{
                width: "100%",
                backgroundColor: "#008041",
                color: "white",
                borderRadius: "8px",
                marginTop: "24px",
                height: "40px",
              }}
              htmlType="submit"
            >
              Set
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Button style={{ marginBottom: 16 }} onClick={func.onTambahData}>
        Tambah Data
      </Button>

      {value.tableColumn !== null ? (
        <Table
          className="table-custom-opex"
          // components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={value.dataColumn}
          columns={value.tableColumn}
          pagination={false}
          scroll={{
            x: setXColumn(value.params.item),
            y: value.size.y - 200,
          }}
          rowKey="id"
        />
      ) : null}
    </div>
  );
};

export default OpexSummary;
