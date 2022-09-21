import { Button, Form, Popconfirm, Typography } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAsync } from "../../../../redux/main/main.thunks";
import { log } from "../../../../values/Utilitas";
import { constantDataTable } from "./ConstantInput";

const OpexInputLogic = () => {
  let params = useParams();

  const itemPage = params.item;

  const [form] = Form.useForm();

  const ref = createRef();

  const dispatch = useDispatch();

  const { isLoading, response, errorMessage, nameReducer } = useSelector(
    (state) => state.reducer
  );

  const [tableColumn, setTableColumn] = useState([]);

  // const [dataColumn, setDataColumn] = useState(constantDataTable[itemPage]);

  const [dataColumn, setDataColumn] = useState([
    {
      key: "",
      account: "",
      description: "",
      year_1: "",
      year_2: "",
      jan_1: 0,
    },
  ]);

  const [editingKey, setEditingKey] = useState("");

  const [mode, setMode] = useState("mode 1");

  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    // onSetColumn();
  }, [editingKey, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log(`response => ${JSON.stringify(response)}`);
    if (response !== null) {
      const { data } = response;
      let list = [];
      let year_1 = "";
      let year_2 = "";

      data.list.map((val, i) => {
        year_1 = val.detail[0].year;
        year_2 = val.detail[1].year;
        const account = val.account;
        const description = val.description;
        const listYear1 = [];
        const listYear2 = [];
        // val.detail[0].list_mont.map(month => {
        //   listYear1.push(month)
        // })

        // list.push({
        //   key:
        //   account: account,
        //   description: description,
        //   jan_1: listYear1[0].value,
        // });
      });
      setDataColumn(list);
      onSetColumn(year_1, year_2);
    } else {
      console.log(`error ${errorMessage}`);
    }
  }, [isLoading, response]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetColumn = (year_1, year_2) => {
    // const constantTableColums = {
    //   "Opex Direct": [
    //     {
    //       title: "Kode Company",
    //       dataIndex: "kode_company",
    //       width: "10%",
    //       fixed: "left",
    //     },
    //     {
    //       title: "Kode Parent",
    //       dataIndex: "kode_parent",
    //       width: "20%",
    //     },
    //     {
    //       title: "Description",
    //       dataIndex: "description",
    //       editable: true,
    //     },
    //     // {
    //     //   dataIndex: "operation",
    //     //   fixed: "right",
    //     //   width: "10%",
    //     //   render: (_, record) => {
    //     //     if (dataColumn.length >= 1) {
    //     //       const editable = isEditing(record);
    //     //       return editable ? (
    //     //         <span>
    //     //           <Typography.Link
    //     //             onClick={() => save(record.key)}
    //     //             style={{
    //     //               marginRight: 8,
    //     //               color: "black",
    //     //               fontSize: "14px",
    //     //               fontWeight: "600",
    //     //             }}
    //     //           >
    //     //             Save
    //     //           </Typography.Link>
    //     //           <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //     //             <Typography.Link
    //     //               style={{
    //     //                 color: "black",
    //     //                 fontSize: "14px",
    //     //                 fontWeight: "600",
    //     //               }}
    //     //             >
    //     //               Cancel
    //     //             </Typography.Link>
    //     //           </Popconfirm>
    //     //         </span>
    //     //       ) : (
    //     //         <Button
    //     //           type="primary"
    //     //           disabled={editingKey !== ""}
    //     //           onClick={() => edit(record)}
    //     //         >
    //     //           Edit
    //     //         </Button>
    //     //       );
    //     //     } else {
    //     //       return null;
    //     //     }
    //     //   },
    //     // },
    //   ],
    // };
    const constantTableColums = {
      "Opex Direct": [
        {
          title: "Account",
          dataIndex: "account",
          width: "12%",
          fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "description",
          editable: true,
          width: "30%",
          fixed: "left",
        },
        {
          title: `Year ${year_1}`,
          children: [
            {
              title: "Jan",
              width: 60,
              dataIndex: "jan_1",
            },
            {
              title: "Feb",
              width: 60,
            },
            {
              title: "Mar",
              width: 60,
            },
            {
              title: "Apr",
              width: 60,
            },
            {
              title: "May",
              width: 70,
            },
            {
              title: "Jun",
              width: 60,
            },
            {
              title: "Jul",
              width: 60,
            },
            {
              title: "Aug",
              width: 60,
            },
            {
              title: "Sep",
              width: 60,
            },
            {
              title: "Okt",
              width: 60,
            },
            {
              title: "Nov",
              width: 60,
            },
            {
              title: "Des",
              width: 60,
            },
          ],
        },
        {
          title: `Year ${year_2}`,
          children: [
            {
              title: "Jan",
              width: 60,
              editable: true,
            },
            {
              title: "Feb",
              width: 60,
            },
            {
              title: "Mar",
              width: 60,
            },
            {
              title: "Apr",
              width: 60,
            },
            {
              title: "May",
              width: 70,
            },
            {
              title: "Jun",
              width: 60,
            },
            {
              title: "Jul",
              width: 60,
            },
            {
              title: "Aug",
              width: 60,
            },
            {
              title: "Sep",
              width: 60,
            },
            {
              title: "Okt",
              width: 60,
            },
            {
              title: "Nov",
              width: 60,
            },
            {
              title: "Des",
              width: 60,
            },
          ],
        },
        // {
        //   dataIndex: "operation",
        //   fixed: "right",
        //   width: "5%",
        //   render: (_, record) =>
        //     dataColumn.length >= 1 ? (
        //       <Dropdown overlay={menu} placement="bottom">
        //         <Button icon={<MoreVertIcon />}></Button>
        //       </Dropdown>
        //     ) : null,
        // },
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
          // editing: isEditing(record),
          // inputType: col.dataIndex === "description" ? "text" : "number",
          // inputType: "text",
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
          // form,
          // mode: mode === "mode 1" ? 1 : 2,
        }),
      };
    });
    setTableColumn(columns);
  };

  const onSetDataTable = (values) => {
    // setDataColumn(constantDataTable[itemPage]);
    const { code_company, code_dept, code_location, code_product } = values;
    dispatch(
      getAsync(
        `opex/list?code_company=${code_company}&code_product=${code_product}&code_location=${code_location}&code_dept=${code_dept}`
      )
    );
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    onSetDataTable(values);
    // let formData = new FormData();
    // formData.append("username", values.username);
    // formData.append("password", values.password);
  };

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

  // const handleDelete = (key) => {
  //   const newData = dataColumn.filter((item) => item.key !== key);
  //   setDataColumn(newData);
  // };

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
      ref,
    },
    func: {
      onChangeMode,
      onFinish,
    },
  };
};

export default OpexInputLogic;
