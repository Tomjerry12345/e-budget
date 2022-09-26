import { Card } from "@mui/material";
import { Table, Form, Input, Select, Button } from "antd";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { areEqual, log } from "../../../../values/Utilitas";
import OpexInputLogic from "./OpexInputLogic";
import "./OpexInputStyle.scss";

const EditableContext = createContext(null);

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
  keyNotEditTable,
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
    let notEditing = areEqual(keyNotEditTable, record);
    log(`keyNotEditTable => ${notEditing}`);

    if (!notEditing) {
      setEditing(!editing);

      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    }
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
        <Input ref={inputRef} onPressEnter={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={
          {
            // paddingRight: 24,
            // fontWeight: 600,
          }
        }
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
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
      <Card
        className="card-style-opex"
        // style={{ marginBottom: 16, height: 120 }}
      >
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
            <Select>
              {value.allCodeFilter.code_company.map((val, i) => (
                <Select.Option key={i} value={val.code_company}>
                  {val.code_company}
                </Select.Option>
              ))}
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
            <Select>
              {value.allCodeFilter.code_product.map((val, i) => (
                <Select.Option key={i} value={val.code_product}>
                  {val.code_product}
                </Select.Option>
              ))}
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
            <Select>
              {value.allCodeFilter.code_location.map((val, i) => (
                <Select.Option key={i} value={val.code_location}>
                  {val.code_location}
                </Select.Option>
              ))}
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
            <Select>
              {value.allCodeFilter.code_dept.map((val, i) => (
                <Select.Option key={i} value={val.code_dept}>
                  {val.code_dept}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button className="btn-tampilkan" htmlType="submit">
              Tampilkan
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Form form={value.form} component={false}>
        <Table
          components={components}
          rowClassName={(record, index) =>
            areEqual(value.listKeyParent, record) ? "parent" : "child"
          }
          bordered
          dataSource={value.dataColumnInput}
          columns={value.tableColumn}
          pagination={false}
          size="small"
          scroll={{
            x: 2900,
            y: value.size.y,
          }}
        />
      </Form>
    </div>
  );
};

export default OpexInputPage;
