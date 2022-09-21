import { Card } from "@mui/material";
import {
  Table,
  Form,
  Input,
  Breadcrumb,
  Typography,
  Layout,
  InputNumber,
  Row,
  Col,
  Select,
  Button,
} from "antd";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import OpexInputLogic from "./OpexInputLogic";

const { Header, Content } = Layout;
const { Text } = Typography;

const EditableContext = createContext(null);

// const EditableCellModel1 = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

// const EditableCell1 = ({
//   editable,
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   handleSave,
//   children,
//   mode,
//   form,
//   ...restProps
// }) => (
//   <EditableCellModel1
//     editing={editing}
//     dataIndex={dataIndex}
//     title={title}
//     inputType={inputType}
//     record={record}
//     children={children}
//     {...restProps}
//   />
// );

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
      const keysEdit = Object.keys(values);
      const valuesEdit = values[keysEdit];
      console.log(`values => ${JSON.stringify(values)}`);
      console.log(`values => ${keysEdit}`);
      // console.log(`record => ${JSON.stringify(record)}`);
      handleSave({ ...record, ...values }, keysEdit, valuesEdit);
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
  return params === "Opex Direct" ? null : 1600;
};

const OpexInputPage = () => {
  const { value, func } = OpexInputLogic();

  const components = {
    body: {
      cell: EditableCell,
      row: EditableRow,
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
              <Select.Option value="211">211</Select.Option>
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
              <Select.Option value="107">107</Select.Option>
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
              <Select.Option value="110117">110117</Select.Option>
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
              <Select.Option value="116">116</Select.Option>
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

      <Form form={value.form} component={false}>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={value.dataColumnInput}
          columns={value.tableColumn}
          pagination={false}
          scroll={{
            x: 2800,
            y: value.size.y - 200,
          }}
        />
      </Form>
    </div>
  );
};

export default OpexInputPage;
