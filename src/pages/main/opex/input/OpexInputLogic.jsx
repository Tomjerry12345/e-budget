import { Button, Form, Popconfirm, Typography } from "antd";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAsync, postAsync } from "../../../../redux/main/main.thunks";
import { getSizeScreen, log } from "../../../../values/Utilitas";
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

  // const [dataColumn, setDataColumnInput] = useState(constantDataTable[itemPage]);

  const [dataColumnInput, setDataColumnInput] = useState([
    {
      key: "",
      account: "",
      description: "",
      year_1: "",
      year_2: "",
      jan_1: 0,
      feb_1: 0,
      mar_1: 0,
      apr_1: 0,
      mei_1: 0,
      jun_1: 0,
      jul_1: 0,
      aug_1: 0,
      sep_1: 0,
      okt_1: 0,
      nov_1: 0,
      des_1: 0,
      jan_2: 0,
      feb_2: 0,
      mar_2: 0,
      apr_2: 0,
      mei_2: 0,
      jun_2: 0,
      jul_2: 0,
      aug_2: 0,
      sep_2: 0,
      okt_2: 0,
      nov_2: 0,
      des_2: 0,
    },
  ]);

  const [codeFilter, setCodeFilter] = useState();

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const [editingKey, setEditingKey] = useState("");

  const [mode, setMode] = useState("mode 1");

  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    // onSetColumn();
    window.onresize = getSizeScreen(setSize);
  }, [editingKey, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log(`response => ${JSON.stringify(response)}`);
    if (response !== null) {
      if (nameReducer === "update-opex") {
        setDataColumnInput([]);
        onSetDataTable(codeFilter);
      } else {
        const { data } = response;
        let list = [];
        let year_1 = "";
        let year_2 = "";
        let parent = false;

        data.list?.map((val, i) => {
          year_1 = val.detail[0].year;
          year_2 = val.detail[1].year;
          const account = val.account;
          const description = val.description;
          const listYear1 = [];
          const listYear2 = [];

          val.detail[0].list_month?.map((month) => {
            listYear1.push(month);
          });

          val.detail[1].list_month?.map((month) => {
            listYear2.push(month);
          });

          // console.log(`listYear1 => ${JSON.stringify(listYear1)}`);

          list.push({
            key: i,
            account: account,
            description: description,
            jan_1: listYear1[0]?.value,
            jan_1_uuid: listYear1[0]?.uuid,
            jan_1_month: listYear1[0]?.month,
            jan_1_year: year_1,
            feb_1: listYear1[1]?.value,
            feb_1_uuid: listYear1[1]?.uuid,
            feb_1_month: listYear1[1]?.month,
            feb_1_year: year_1,
            mar_1: listYear1[2]?.value,
            mar_1_uuid: listYear1[2]?.uuid,
            mar_1_month: listYear1[2]?.month,
            mar_1_year: year_1,
            apr_1: listYear1[3]?.value,
            apr_1_uuid: listYear1[3]?.uuid,
            apr_1_month: listYear1[3]?.month,
            apr_1_year: year_1,
            mei_1: listYear1[4]?.value,
            mei_1_uuid: listYear1[4]?.uuid,
            mei_1_month: listYear1[4]?.month,
            mei_1_year: year_1,
            jun_1: listYear1[5]?.value,
            jun_1_uuid: listYear1[5]?.uuid,
            jun_1_month: listYear1[5]?.month,
            jun_1_year: year_1,
            jul_1: listYear1[6]?.value,
            jul_1_uuid: listYear1[6]?.uuid,
            jul_1_month: listYear1[6]?.month,
            jul_1_year: year_1,
            aug_1: listYear1[7]?.value,
            aug_1_uuid: listYear1[7]?.uuid,
            aug_1_month: listYear1[7]?.month,
            aug_1_year: year_1,
            sep_1: listYear1[8]?.value,
            sep_1_uuid: listYear1[8]?.uuid,
            sep_1_month: listYear1[8]?.month,
            sep_1_year: year_1,
            okt_1: listYear1[9]?.value,
            okt_1_uuid: listYear1[9]?.uuid,
            okt_1_month: listYear1[9]?.month,
            okt_1_year: year_1,
            nov_1: listYear1[10]?.value,
            nov_1_uuid: listYear1[10]?.uuid,
            nov_1_month: listYear1[10]?.month,
            nov_1_year: year_1,
            des_1: listYear1[11]?.value,
            des_1_uuid: listYear1[11]?.uuid,
            des_1_month: listYear1[11]?.month,
            des_1_year: year_1,
            jan_2: listYear2[0]?.value,
            jan_2_uuid: listYear2[0]?.uuid,
            jan_2_month: listYear2[0]?.month,
            jan_2_year: year_2,
            feb_2: listYear2[1]?.value,
            feb_2_uuid: listYear2[1]?.uuid,
            feb_2_month: listYear2[1]?.month,
            feb_2_year: year_2,
            mar_2: listYear2[2]?.value,
            mar_2_uuid: listYear2[2]?.uuid,
            mar_2_month: listYear2[2]?.month,
            mar_2_year: year_2,
            apr_2: listYear2[3]?.value,
            apr_2_uuid: listYear2[3]?.uuid,
            apr_2_month: listYear2[3]?.month,
            apr_2_year: year_2,
            mei_2: listYear2[4]?.value,
            mei_2_uuid: listYear2[4]?.uuid,
            mei_2_month: listYear2[4]?.month,
            mei_2_year: year_2,
            jun_2: listYear2[5]?.value,
            jun_2_uuid: listYear2[5]?.uuid,
            jun_2_month: listYear2[5]?.month,
            jun_2_year: year_2,
            jul_2: listYear2[6]?.value,
            jul_2_uuid: listYear2[6]?.uuid,
            jul_2_month: listYear2[6]?.month,
            jul_2_year: year_2,
            aug_2: listYear2[7]?.value,
            aug_2_uuid: listYear2[7]?.uuid,
            aug_2_month: listYear2[7]?.month,
            aug_2_year: year_2,
            sep_2: listYear2[8]?.value,
            sep_2_uuid: listYear2[8]?.uuid,
            sep_2_month: listYear2[8]?.month,
            sep_2_year: year_2,
            okt_2: listYear2[9]?.value,
            okt_2_uuid: listYear2[9]?.uuid,
            okt_2_month: listYear2[9]?.month,
            okt_2_year: year_2,
            nov_2: listYear2[10]?.value,
            nov_2_uuid: listYear2[10]?.uuid,
            nov_2_month: listYear2[10]?.month,
            nov_2_year: year_2,
            des_2: listYear2[11]?.value,
            des_2_uuid: listYear2[11]?.uuid,
            des_2_month: listYear2[11]?.month,
            des_2_year: year_2,
          });
        });
        console.log(`list => ${JSON.stringify(list)}`);
        setDataColumnInput(list);
        onSetColumn(year_1, year_2, parent);
      }
    } else {
      console.log(`error ${errorMessage}`);
    }
  }, [isLoading, response]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetColumn = (year_1, year_2, parent) => {
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
          width: "30%",
          fixed: "left",
        },
        {
          title: `Year ${year_1}`,
          editable: true,
          children: [
            {
              title: "Jan",
              width: 100,
              dataIndex: "jan_1",
              editable: true,
            },
            {
              title: "Feb",
              width: 100,
              dataIndex: "feb_1",
              editable: true,
            },
            {
              title: "Mar",
              width: 100,
              dataIndex: "mar_1",
              editable: true,
            },
            {
              title: "Apr",
              width: 100,
              dataIndex: "apr_1",
              editable: true,
            },
            {
              title: "May",
              width: 100,
              dataIndex: "mei_1",
              editable: true,
            },
            {
              title: "Jun",
              width: 100,
              dataIndex: "jun_1",
              editable: true,
            },
            {
              title: "Jul",
              width: 100,
              dataIndex: "jul_1",
              editable: true,
            },
            {
              title: "Aug",
              width: 100,
              dataIndex: "aug_1",
              editable: true,
            },
            {
              title: "Sep",
              width: 100,
              dataIndex: "sep_1",
              editable: true,
            },
            {
              title: "Okt",
              width: 100,
              dataIndex: "okt_1",
              editable: true,
            },
            {
              title: "Nov",
              width: 100,
              dataIndex: "nov_1",
              editable: true,
            },
            {
              title: "Des",
              width: 100,
              dataIndex: "des_1",
              editable: true,
            },
          ],
        },
        {
          title: `Year ${year_2}`,
          children: [
            {
              title: "Jan",
              width: 100,
              dataIndex: "jan_2",
              editable: true,
            },
            {
              title: "Feb",
              width: 100,
              dataIndex: "feb_2",
              editable: true,
            },
            {
              title: "Mar",
              width: 100,
              dataIndex: "mar_2",
              editable: true,
            },
            {
              title: "Apr",
              width: 100,
              dataIndex: "apr_2",
              editable: true,
            },
            {
              title: "May",
              width: 100,
              dataIndex: "mei_2",
              editable: true,
            },
            {
              title: "Jun",
              width: 100,
              dataIndex: "jun_2",
              editable: true,
            },
            {
              title: "Jul",
              width: 100,
              dataIndex: "jul_2",
              editable: true,
            },
            {
              title: "Aug",
              width: 100,
              dataIndex: "aug_2",
              editable: true,
            },
            {
              title: "Sep",
              width: 100,
              dataIndex: "sep_2",
              editable: true,
            },
            {
              title: "Okt",
              width: 100,
              dataIndex: "okt_2",
              editable: true,
            },
            {
              title: "Nov",
              width: 100,
              dataIndex: "nov_2",
              editable: true,
            },
            {
              title: "Des",
              width: 100,
              dataIndex: "des_2",
              editable: true,
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
      // console.log(`col => ${JSON.stringify(col)}`);
      if (!col.editable) {
        return col;
      }

      let newCol = {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          // editing: isEditing(record),
          // inputType: col.dataIndex === "description" ? "text" : "number",
          // inputType: "text",
          dataIndex: col.dataIndex,
          title: col.title,
          // handleSave,
          // form,
          // mode: mode === "mode 1" ? 1 : 2,
        }),
      };

      if (col.children) {
        newCol.children = col.children.map((t) => {
          return {
            ...t,
            onCell: (record) => ({
              record,
              editable: t.editable,
              // editing: isEditing(record),
              // inputType: col.dataIndex === "description" ? "text" : "number",
              // inputType: "text",
              dataIndex: t.dataIndex,
              title: t.title,
              handleSave,
              // form,
              // mode: mode === "mode 1" ? 1 : 2,
            }),
          };
        });
      }

      return newCol;
    });

    setTableColumn(columns);
  };

  const onSetDataTable = (values) => {
    // setDataColumnInput(constantDataTable[itemPage]);
    const { code_company, code_dept, code_location, code_product } = values;
    setCodeFilter(values);
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
      let newData = [...dataColumnInput];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });

        setDataColumnInput(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDataColumnInput(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // const handleDelete = (key) => {
  //   const newData = dataColumn.filter((item) => item.key !== key);
  //   setDataColumnInput(newData);
  // };

  // const handleAdd = () => {
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: "32",
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   setDataColumnInput([...dataSource, newData]);
  //   setCount(count + 1);
  // };

  const handleSave = (row, keysEdit, valuesEdit) => {
    let formData = new FormData();
    const { code_company, code_dept, code_location, code_product } = codeFilter;
    const year = row[`${keysEdit}_year`];
    const month = row[`${keysEdit}_month`];
    console.log(`row => ${year} => ${month}`);
    console.log(`row => ${keysEdit} => ${valuesEdit}`);

    formData.append("code", "6113102");
    formData.append("code_company", code_company);
    formData.append("code_product", code_product);
    formData.append("code_location", code_location);
    formData.append("code_dept", code_dept);
    formData.append("month", month);
    formData.append("year", year);
    formData.append("value", valuesEdit);

    dispatch(postAsync(`opex/update`, formData, "update-opex"));
    // console.log(`editValues => ${JSON.stringify(editValues)}`);
    // const newData = [...dataColumn];
    // const index = newData.findIndex((item) => row.key === item.key);
    // const item = newData[index];
    // newData.splice(index, 1, { ...item, ...row });
    // setDataColumnInput(newData);
  };

  const onChangeMode = (e) => {
    // const value = e.target.value;
    log(`value => ${e}`);
    setMode(e);
  };

  return {
    value: {
      dataColumnInput,
      tableColumn,
      params,
      form,
      mode,
      ref,
      size,
    },
    func: {
      onChangeMode,
      onFinish,
    },
  };
};

export default OpexInputLogic;
