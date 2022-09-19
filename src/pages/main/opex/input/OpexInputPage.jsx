import { Card } from "@mui/material";
import { Table, Form, Input, Breadcrumb, Typography, Layout, InputNumber, Row, Col } from "antd";
import React from "react";
import OpexInputLogic from "./OpexInputLogic";

const { Header, Content } = Layout;
const { Text } = Typography;

const EditableCellModel1 = ({ editing, dataIndex, title, inputType, record, children, ...restProps }) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableCell1 = ({ editable, editing, dataIndex, title, inputType, record, handleSave, children, mode, form, ...restProps }) => (
  <EditableCellModel1 editing={editing} dataIndex={dataIndex} title={title} inputType={inputType} record={record} children={children} {...restProps} />
);

const setXColumn = (params) => {
  return params === "Opex Direct" ? null : 1600;
};

const OpexInputPage = () => {
  const { value } = OpexInputLogic();

  const components = {
    body: {
      cell: EditableCell1,
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
          minHeight: 250,
        }}
      >
        <Breadcrumb
        // style={{
        //   margin: "16px 0",
        // }}
        >
          <Breadcrumb.Item>Opex</Breadcrumb.Item>
          <Breadcrumb.Item>{value.params.item}</Breadcrumb.Item>
        </Breadcrumb>
        <Text strong>Summary {value.params.item}</Text>
        <div>
          {/* <Select
            value={value.mode}
            onChange={(e) => func.onChangeMode(e)}
            options={[
              {
                label: "mode 1",
                value: "mode 1",
              },
              {
                label: "mode 2",
                value: "mode 2",
              },
            ]}
          /> */}
        </div>

        <Card style={{ padding: "18px" }}>
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
        </Card>
      </Header>
      <Content
        style={{
          padding: 24,
          backgroundColor: "white",
        }}
      >
        <Form form={value.form} component={false}>
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
        </Form>
      </Content>
    </Layout>
  );
};

export default OpexInputPage;
