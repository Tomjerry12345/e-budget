import { Card } from "@mui/material";
import { Table, Form, Input, Select, Button, Spin } from "antd";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { areEqual, log } from "../../../../values/Utilitas";
import OthersInputLogic from "./OthersInputLogic";
import { useParams } from "react-router-dom";
import FilterComponent from "../../../../component/filter/FilterComponent";
import TableComponent from "../../../../component/table/TableComponent";
import { UploadOutlined } from "@ant-design/icons";
import UploadModal from "../../../../component/modal/UploadModal";

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
  let params = useParams();
  const itemPage = params.item;

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    let notEditing = record.parent;

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
        {itemPage === "Input Asumsi" ? children[1] : parseInt(children[1]).format(0, 3, ".", ",")}
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

const othersInputPage = () => {
  const { value, func } = OthersInputLogic();

  const components = {
    body: {
      cell: EditableCell,
      row: EditableRow,
    },
  };

  return (
    <>
      <FilterComponent type={2} isCodeProduct={true} form={value.form} onFinish={func.onFinish} />

      <div className="custom-root-layout">
        {value.dataColumnInput.length > 1 ? (
          <div className="layout-btn-action">
            <Button className="btn-update" type="primary" icon={<UploadOutlined className="custom-icon" />} onClick={func.onOpenUploadModal}>
              Update
            </Button>
          </div>
        ) : null}
        <TableComponent variant="input" dataSource={value.dataColumnInput} columns={value.columns} loading={value.loading} listKeyParent={value.listKeyParent} />
      </div>
      <UploadModal open={value.openUploadModal} onCancel={func.onCloseUploadModal} value={value} onOk={func.onUploadFile} file={`file/${value.endPFile}`} />
    </>
  );
};

export default othersInputPage;
