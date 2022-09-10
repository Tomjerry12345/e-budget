import { Button, Dropdown, Form, Menu, Popconfirm, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { log } from "../../../../values/Utilitas";
import { constantDataTable } from "./ConstantInput";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: "edit",
      },
      {
        key: "2",
        label: "hapus",
      },
    ]}
  />
);

const OpexInputLogic = () => {
  let params = useParams();
  const itemPage = params.item;
  const [form] = Form.useForm();

  const [tableColumn, setTableColumn] = useState([]);

  const [dataColumn, setDataColumn] = useState(constantDataTable[itemPage]);
  const [editingKey, setEditingKey] = useState("");

  const [mode, setMode] = useState("mode 1");

  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    const constantTableColums = {
      "Opex Direct": [
        {
          title: "Kode Company",
          dataIndex: "kode_company",
          editable: true,
          width: "10%",
          fixed: "left",
        },
        {
          title: "Kode Parent",
          dataIndex: "kode_parent",
          editable: true,
          width: "20%",
        },
        {
          title: "Description",
          dataIndex: "description",
          editable: true,
        },
        {
          dataIndex: "operation",
          fixed: "right",
          width: "10%",
          render: (_, record) => {
            if (dataColumn.length >= 1) {
              if (mode === "mode 1") {
                const editable = isEditing(record);
                return editable ? (
                  <span>
                    <Typography.Link
                      onClick={() => save(record.key)}
                      style={{
                        marginRight: 8,
                      }}
                    >
                      Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
                    Edit
                  </Typography.Link>
                );
              } else {
                return null;
              }
            } else {
              return null;
            }
          },
        },
      ],
    };
    const columns = constantTableColums[itemPage].map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          editing: isEditing(record),
          // inputType: col.dataIndex === "description" ? "text" : "number",
          inputType: "text",
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
          form,
          mode: mode === "mode 1" ? 1 : 2,
        }),
      };
    });
    setTableColumn(columns);
  }, [editingKey, mode]);

  const edit = (record) => {
    form.setFieldsValue({
      kode_company: "",
      kode_parent: "",
      description: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      let newData = [...dataColumn];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });

        setDataColumn(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDataColumn(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key) => {
    const newData = dataColumn.filter((item) => item.key !== key);
    setDataColumn(newData);
  };

  // const handleAdd = () => {
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: "32",
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   setDataColumn([...dataSource, newData]);
  //   setCount(count + 1);
  // };

  const handleSave = (row) => {
    const newData = [...dataColumn];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];

    newData.splice(index, 1, { ...item, ...row });
    setDataColumn(newData);
  };

  const onChangeMode = (e) => {
    // const value = e.target.value;
    log(`value => ${e}`);
    setMode(e);
  };

  return {
    value: {
      dataColumn,
      tableColumn,
      params,
      form,
      mode,
    },
    func: {
      onChangeMode,
    },
  };
};

export default OpexInputLogic;
