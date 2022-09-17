import {
  Table,
  Form,
  Input,
  Breadcrumb,
  Typography,
  Layout,
  InputNumber,
  Select,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import OpexInputLogic from "./OpexInputLogic";

const { Header, Content } = Layout;
const { Text } = Typography;

// const EditableContext = React.createContext(null);

// const EditableRow = ({ index, ...props }) => {
//   const [form] = Form.useForm();
//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   );
// };

const EditableCellModel1 = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  children,
  ...restProps
}) => {
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

const EditableCellModel2 = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  form,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  // const form = useContext(EditableContext);
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

const EditableCell1 = ({
  editable,
  editing,
  dataIndex,
  title,
  inputType,
  record,
  handleSave,
  children,
  mode,
  form,
  ...restProps
}) => {
  return mode === 1 ? (
    <EditableCellModel1
      editing={editing}
      dataIndex={dataIndex}
      title={title}
      inputType={inputType}
      record={record}
      children={children}
      {...restProps}
    />
  ) : (
    <EditableCellModel2
      title={title}
      editable={editable}
      children={children}
      dataIndex={dataIndex}
      record={record}
      handleSave={handleSave}
      form={form}
      {...restProps}
    />
  );
};

const setXColumn = (params) => {
  return params === "Opex Direct" ? null : 1600;
};

const OpexInputPage = () => {
  const { value, func } = OpexInputLogic();

  const components = {
    body: {
      // row: EditableRow,
      // cell: EditableCell,
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
          minHeight: 150,
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
          <Select
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
          />
        </div>

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
