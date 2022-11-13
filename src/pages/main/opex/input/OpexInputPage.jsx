import { Card } from "@mui/material";
import { Table, Form, Input, Select, Button, Spin } from "antd";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { areEqual, log } from "../../../../values/Utilitas";
import OpexInputLogic from "./OpexInputLogic";

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

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, keyNotEditTable, ...restProps }) => {
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
      log("values", values);
      log("dataColumnInput", keysEdit);
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
        style={
          {
            // paddingRight: 24,
            // fontWeight: 600,
          }
        }
        onClick={toggleEdit}
      >
        {parseInt(children[1]).format(0, 3, ".", ",")}
      </div>
    );
  } else {
    childNode = (
      <div
        className="editable-cell-value-wrap"
        style={
          {
            // paddingRight: 24,
            // fontWeight: 600,
          }
        }
        // onClick={toggleEdit}
      >
        {typeof children[1] === "string" ? children[1] : parseInt(children[1]).format(0, 3, ".", ",")}
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
    <>
      <div className="custom-root-card">
        <Card
          className="card-style"
          // style={{ marginBottom: 16, height: 120 }}
        >
          <Form className="form-filter" layout="vertical" ref={value.ref} onFinish={func.onFinish} form={value.form}>
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
              <Select onChange={func.onChange}>
                {value.allCodeFilter.code_company.map((val, i) => (
                  <Select.Option key={i} value={val.code}>
                    {`${val.code} (${val.title})`}
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
                    {`${val.code_product} (${val.description})`}
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
                    {`${val.code_location} (${val.description})`}
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
                    {`${val.code_dept} (${val.description})`}
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
      </div>

      <div className="custom-root-layout">
        {value.dataColumnInput.length > 1 ? (
          <Table
            components={components}
            rowClassName={(record, index) => (areEqual(value.listKeyParent, record) ? "parent" : "child")}
            bordered
            dataSource={value.dataColumnInput}
            columns={value.tableColumn}
            pagination={false}
            loading={value.loading}
            size="small"
            scroll={{
              x: 2900,
              y: value.size.y - 352,
            }}
          />
        ) : value.loading === true ? (
          <div className="style-progress">
            <Spin />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default OpexInputPage;
