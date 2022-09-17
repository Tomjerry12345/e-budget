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
import CoaInputLogic from "./CoaInputLogic";
import "./CoaInput.scss";
import UploadModal from "../../../../component/modal/UploadModal";

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

const CoaInputPage = () => {
  const { value, func } = CoaInputLogic();

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <Layout>
      <Header
        className="site-layout-background"
        style={{
          padding: 20,
          backgroundColor: "#fafafa",
          minHeight: 100,
          // minHeight: 300,
        }}
      >
        <Breadcrumb
        // style={{
        //   margin: "16px 0",
        // }}
        >
          <Breadcrumb.Item>COA</Breadcrumb.Item>
          <Breadcrumb.Item>{value.params.item}</Breadcrumb.Item>
        </Breadcrumb>
        <Text strong>Input {value.params.item}</Text>

        {/* <Card>
          <Form layout="vertical">
            <Row>
              <Col span={5}>
                <Form.Item label="Field A">
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Field A">
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Field A">
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Field A">
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Field A">
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card> */}
      </Header>
      <Content
        style={{
          padding: 24,
          backgroundColor: "white",
        }}
      >
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
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={value.dataColumn}
          columns={value.tableColumn}
          pagination={false}
          scroll={{
            x: setXColumn(value.params.item),
            y: 300,
          }}
          rowKey="id"
        />
      </Content>

      <UploadModal
        open={value.openUploadModal}
        onCancel={func.onCloseUploadModal}
        value={value}
        onOk={func.onUploadFile}
      />
    </Layout>
  );
};

export default CoaInputPage;
