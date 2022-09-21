import {
  Table,
  Form,
  Input,
  Breadcrumb,
  Typography,
  Layout,
  Button,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import CoaInputLogic from "./CoaLogic";
import "./CoaStyle.scss";
import UploadModal from "../../../component/modal/UploadModal";

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

const CoaPage = () => {
  const { value, func } = CoaInputLogic();

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div className="custom-root-layout">
      <div className="top-content">
        <Form className="form-cari" layout="vertical">
          <Form.Item>
            <Input placeholder="Cari data di sini..." />
          </Form.Item>
          <Button className="btn-cari" type="primary">
            Cari
          </Button>
        </Form>

        <div className="layout-btn-action">
          <Button className="btn-clear" type="ghost" disabled>
            Clear Data
          </Button>

          <Button
            className="btn-update"
            type="primary"
            icon={<UploadOutlined className="custom-icon" />}
            onClick={func.onOpenUploadModal}
          >
            Update
          </Button>
        </div>
      </div>

      <Table
        className="table-custom-root"
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
      {/* </Content> */}

      <UploadModal
        open={value.openUploadModal}
        onCancel={func.onCloseUploadModal}
        value={value}
        onOk={func.onUploadFile}
      />
    </div>
  );
};

export default CoaPage;
