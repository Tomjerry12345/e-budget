import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { areEqual, getSizeScreen, log } from "../../../../values/Utilitas";
import {
  Table,
  Form,
  Input,
  Select,
  Button,
  Spin,
  InputNumber,
  Checkbox,
} from "antd";

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
  // const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  // const inputNode = inputType === "checkbox" ? <CheckBox /> : <Input />;
  //   if (inputType === "checkbox") {
  // log("children", children);
  //   }
  const inputNode = inputType === "checkbox" ? <Checkbox /> : <Input />;
  const component =
    inputType === "checkbox" ? (
      <Checkbox disabled checked={children[1] === 1} />
    ) : (
      children
    );
  return (
    <td {...restProps}>
      {editing ? (
        inputType === "checkbox" ? (
          <Form.Item
            name={dataIndex}
            valuePropName="checked"
            style={{
              margin: 0,
            }}
          >
            {inputNode}
            {/* <Input /> */}
          </Form.Item>
        ) : (
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
            {/* <Input /> */}
          </Form.Item>
        )
      ) : (
        component
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
      {loading ? (
        <div className="style-progress">
          <Spin />
        </div>
      ) : (
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
            scroll={scroll === null ? { y: size.y - 366, x: 1000 } : scroll}
            // showExpandColumn={false}
            defaultExpandAllRows={true}
            rowKey="id"
          />
        </Form>
      )}
    </>
  );
};

export default TableInputTypeCoa;
