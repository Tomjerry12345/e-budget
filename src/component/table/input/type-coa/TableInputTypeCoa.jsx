import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { areEqual, getSizeScreen, log } from "../../../../values/Utilitas";
import { Table, Form, Input, Select, Button, Spin, InputNumber } from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
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

const TableInputTypeCoa = ({ dataSource, columns, loading, scroll, form }) => {
  const components = {
    body: {
      cell: EditableCell,
    },
  };
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = getSizeScreen(setSize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {dataSource.length > 0 ? (
        <Form form={form} component={false}>
          <Table
            components={components}
            rowClassName="child"
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            size="small"
            // loading={value.loading}
            scroll={scroll === null ? { y: size.y - 366 } : scroll}
            // showExpandColumn={false}
            defaultExpandAllRows={true}
            rowKey="uuid"
          />
        </Form>
      ) : loading === true ? (
        <div className="style-progress">
          <Spin />
        </div>
      ) : null}
    </>
  );
};

export default TableInputTypeCoa;
