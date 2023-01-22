import { Button, Dropdown, Form, Menu, Popconfirm, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDropzone } from "react-dropzone";
import { cekNumber, getSizeScreen, log } from "../../../../values/Utilitas";
import MainServices from "../../../../services/MainServices";

const DropdownMenu = ({ onAction, record, onDelete }) => (
  <Menu
    items={[
      {
        key: "1",
        label: "edit",
      },
      {
        key: "2",
        // label: "hapus",
        label: (
          <Popconfirm title="Sure to delete" onConfirm={() => onDelete(record)}>
            <a>Hapus</a>
          </Popconfirm>
        ),
      },
    ]}
    onClick={(e) => onAction(e, record)}
  />
);

// const dummyData = [
//   {
//     id: 1,
//     uuid: "test",
//     code: "200",
//     children: [
//       {
//         id: 2,
//         uuid: "test hellio",
//         code: "201",
//         children: [
//           {
//             id: 3,
//             uuid: "testtesttest",
//             code: "202",
//             // children: [],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 4,
//     uuid: "test",
//     code: "300",
//     children: [
//       {
//         id: 5,
//         uuid: "test hellio",
//         code: "301",
//         // children: [],
//       },
//     ],
//   },
// ];

const CompanyLogic = () => {
  const navigate = useNavigate();

  const [openUploadModal, setOpenUploadModal] = useState(false);

  const [dataColumn, setDataColumn] = useState([]);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [openAction, setOpenAction] = useState({
    open: false,
    status: "",
  });

  const [selectedItem, setSelectedItem] = useState();

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.uuid === editingKey;

  const [form] = Form.useForm();

  const constantTableColums = [
    {
      title: "Code",
      dataIndex: "code",
      width: "30%",
      editable: true,
      fixed: "left",
    },
    {
      title: "Description",
      dataIndex: "description",
      editable: true,
    },
    {
      dataIndex: "operation",
      fixed: "right",
      width: "7%",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.code)}
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
          // <Typography.Link
          //   disabled={editingKey !== ""}
          //   onClick={() => edit(record)}
          // >
          //   Edit
          // </Typography.Link>
          <Dropdown
            overlay={
              <DropdownMenu
                onAction={onAction}
                record={record}
                onDelete={onDelete}
              />
            }
            placement="bottom"
            trigger={["click"]}
            disabled={editingKey !== ""}
          >
            <Button icon={<MoreVertIcon />}></Button>
          </Dropdown>
        );
      },
    },
  ];

  const columns = constantTableColums.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        // handleSave,
      }),
    };
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  useEffect(() => {
    setDataColumn([]);
    window.onresize = getSizeScreen(setSize);
    onGetListCompany();
    onSetDataTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onGetListCompany = async () => {
    const { data } = await MainServices.get("company/list");
    log("company/list", data.data);
    setData(data.data);
  };

  const save = async (key) => {
    try {
      log("data", data);
      const row = await form.validateFields();
      const newData = [...dataColumn];
      // const data = [...data];
      const index = newData.findIndex((item) => key === item.code);
      const value = data.findIndex((item) => key === item.code_company);
      if (index > -1) {
        const item = newData[index];
        const val = data[value];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataColumn(newData);
        setEditingKey("");
        log("editing", row);

        const d = new FormData();
        d.append("uuid", val.uuid);
        d.append("code_company", row.code);
        d.append("code_parent", val.code_parent);
        d.append("description", row.description);

        const res = await MainServices.post("company/update", d);

        console.log("res-edit", res);
      } else {
        newData.push(row);
        setDataColumn(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record) => {
    form.setFieldsValue({
      code: "",
      description: "",
      ...record,
    });
    setEditingKey(record.uuid);
  };

  const onDelete = async (record) => {
    log("row-del", record);
    // const value = dataColumn.filter((item) => item.id !== record.id);
    // const i = data.findIndex((item) => record.code === item.code_company);
    // const val = data[i];

    // log("value", value);

    // setDataColumn(value);

    // log("val", val.uuid);

    // const res = await MainServices.delete("company/delete", {
    //   uuid: val.uuid,
    // });

    // console.log("res-edit", res);

    let test = dataColumn.filter((item) => item.id !== record.id);

    log("value", test);
    log("length-value", test.length);
    log("dataColumn-value", dataColumn.length);

    // if (test.length === dummyData.length) {
    //   const list = [];
    //   dataColumn.forEach((root) => {
    //     if (root.children.length !== 0) {
    //       const listCh1 = [];

    //       // level 1
    //       root.children.forEach((ch1) => {
    //         log("ch1", ch1);
    //         if (ch1.children !== undefined) {
    //           log("undefined");
    //           listCh1.push(ch1);
    //         } else {
    //           log("record.id", record.id);
    //           log("ch1.id", ch1.id);
    //           if (ch1.id !== record.id) {
    //             log("test");
    //             listCh1.push(ch1);
    //           }
    //         }
    //       });

    //       log("listCh1", listCh1);

    //       list.push({
    //         id: root.id,
    //         uuid: root.uuid,
    //         code: root.code,
    //         children: listCh1,
    //       });

    //       // list.push(listCh1);
    //     }
    //   });
    //   // test = list;
    // }

    setDataColumn(test);
  };

  const onAction = (e, record) => {
    setSelectedItem(record);
    if (e.key === "1") {
      edit(record);
    }
  };

  const onSetDataTable = async () => {
    setLoading(true);
    const { data } = await MainServices.get("company/list-tree");
    log("company/list-tree", data.data);
    setLoading(false);
    setDataColumn(data.data);
    // setDataColumn(dummyData);
    // dispatch(getAsync(`${endPoint[itemPage]}/list-tree`, constantGetCoa));
  };

  const onOpenUploadModal = () => {
    setOpenUploadModal(true);
  };

  const onCloseUploadModal = () => {
    setOpenUploadModal(false);
    acceptedFiles.length = 0;
  };

  const onUploadFile = () => {
    let file1;
    acceptedFiles.forEach((file) => {
      file1 = file;
    });
    let formData = new FormData();
    formData.append("file", file1);

    const res = MainServices.post("dept/import", formData);
    log("res", res);

    onCloseUploadModal();

    navigate(0);
  };

  const onSearch = async (e) => {
    const val = e.target.value;

    const key = cekNumber(val) ? "code" : "description";

    let res;

    let list = [];

    if (val === "") {
      res = await MainServices.get(`company/list-tree`);

      list = res.data.data;
    } else {
      res = await MainServices.get(`company/list?${key}=${val}`);

      const d = res.data.data;

      let i = 1;

      d.forEach((val) => {
        list.push({
          id: val.uuid,
          code: val.code_company,
          description: val.description,
        });

        i += 1;
      });
    }

    setDataColumn(list);
  };

  return {
    value: {
      dataColumn,
      openUploadModal,
      getRootProps,
      getInputProps,
      acceptedFiles,
      size,
      openAction,
      loading,
      columns,
      form,
    },
    func: {
      onCloseUploadModal,
      onOpenUploadModal,
      onUploadFile,
      onSearch,
    },
  };
};

export default CompanyLogic;
