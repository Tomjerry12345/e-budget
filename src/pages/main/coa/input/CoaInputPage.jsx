import { Table, Form, Input, Popconfirm, Breadcrumb, Row, Col, Typography, Card, Layout } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CoaInputLogic from "./CoaInputLogic";

const { Header, Content, Footer, Sider } = Layout;
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

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
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
  return params === "Kode perusahaan" || params === "Kode departemen" || params === "Kode akun" || params === "Kode ICP" ? null : 1600;
};

const CoaInputPage = () => {
  const { value } = CoaInputLogic();

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
          // minHeight: 300,
          minHeight: 100,
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
        />
      </Content>
    </Layout>
  );
};

export default CoaInputPage;
