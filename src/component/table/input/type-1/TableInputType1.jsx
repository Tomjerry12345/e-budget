import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { areEqual, getSizeScreen, log } from "../../../../values/Utilitas";
import { Table, Form, Input, Select, Button, Spin } from "antd";

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

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  keyNotEditTable,
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
        {typeof children[1] === "string"
          ? children[1]
          : parseInt(children[1]).format(0, 3, ".", ",")}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const TableInputType1 = ({ dataSource, columns, loading, listKeyParent }) => {
  const components = {
    body: {
      cell: EditableCell,
      row: EditableRow,
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
      {/* {dataSource.length > 1 ? ( */}
      <Table
        components={components}
        rowClassName={(record, index) =>
          record.parent ? "parent" : "child"
        }
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        loading={loading}
        size="small"
        scroll={{
          x: 2900,
          y: size.y - 366,
        }}
      />
      {/* ) : loading === true ? (
        <div className="style-progress">
          <Spin />
        </div>
      ) : null} */}
    </>
  );
};

export default TableInputType1;
