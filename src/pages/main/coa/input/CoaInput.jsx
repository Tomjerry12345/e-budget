import { Table, Form, Input, Popconfirm, Breadcrumb, Row, Col, Typography, Card, Layout } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

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

const CoaInput = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      kode_company: "Edward King 0",
      kode_parent: "32",
      description: "32",
    },
    {
      key: "1",
      kode_company: "Edward King 0",
      kode_parent: "32",
      description: "32",
    },
    {
      key: "2",
      kode_company: "Edward King 0",
      kode_parent: "32",
      description: "32",
    },
  ]);
  const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "Kode Company",
      dataIndex: "kode_company",
      width: "30%",
      editable: true,
      fixed: "left",
    },
    {
      title: "Kode Parent",
      dataIndex: "kode_parent",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    // {
    //   title: "operation",
    //   dataIndex: "operation",
    //   fixed: "right",
    //   render: (_, record) =>
    //     dataSource.length >= 1 ? (
    //       <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
    //         <a>Delete</a>
    //       </Popconfirm>
    //     ) : null,
    // },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];

    console.log(`item => ${JSON.stringify(item)}`);
    console.log(`key => ${row.key}`);
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  let params = useParams();

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
          <Breadcrumb.Item>{params.item}</Breadcrumb.Item>
        </Breadcrumb>
        <Text strong>Summary {params.item}</Text>
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
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{
            // x: 1500,
            y: 300,
          }}
        />
      </Content>
    </Layout>
  );
};

export default CoaInput;
