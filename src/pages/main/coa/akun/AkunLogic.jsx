import {
  Button,
  Dropdown,
  Form,
  Menu,
  Popconfirm,
  Switch,
  Typography,
} from "antd";
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

const AkunLogic = () => {
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

  const [showPopup, setShowPopup] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [isTambah, setIsTambah] = useState(null);

  const constantTableColums = [
    {
      title: "Code",
      dataIndex: "code",
      width: 130,
      editable: true,
      fixed: "left",
    },
    {
      title: "Description",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      editable: false,
      width: 150,
    },
    {
      title: "Update At",
      dataIndex: "updated_at",
      editable: false,
      width: 150,
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   width: "5%",
    //   render: (_, record) => {
    //     let rStatus = record.status;

    //     return (
    //       <Switch
    //         size="small"
    //         checked={rStatus === 1}
    //         onChange={() => onActive(record)}
    //       />
    //     );
    //   },
    // },
    {
      dataIndex: "operation",
      fixed: "right",
      width: "5%",
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
    const { data } = await MainServices.get("account/list");
    log("account/list", data.data);
    setData(data.data);
  };

  const save = async (key) => {
    try {
      setIsSucces(false);
      setShowPopup(true);

      log("data", data);
      const row = await form.validateFields();
      const value = data.findIndex((item) => key === item.code_account);
      const val = data[value];

      const d = new FormData();
      d.append("uuid", val.uuid);
      d.append("code_account", row.code);
      d.append("code_parent", val.code_parent);
      d.append("description", row.description);

      const res = await MainServices.post("account/update", d);

      console.log("res-edit", res);

      onSetDataTable();

      setEditingKey("");
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
    setIsSucces(false);
    setShowPopup(true);

    log("row-del", record);
    // const value = dataColumn.filter((item) => item.id !== record.id);
    // const i = data.findIndex((item) => record.code === item.code);
    // const val = data[i];

    // log("val", val);

    // setDataColumn(value);

    // log("val", val.uuid);

    const res = await MainServices.delete("account/delete", {
      uuid: record.uuid,
    });

    console.log("res-hapus", res);

    onSetDataTable();

    // let test = dataColumn.filter((item) => item.id !== record.id);

    // log("value", test);
    // log("length-value", test.length);
    // log("dataColumn-value", dataColumn.length);

    // // if (test.length === dummyData.length) {
    // //   const list = [];
    // //   dataColumn.forEach((root) => {
    // //     if (root.children.length !== 0) {
    // //       const listCh1 = [];

    // //       // level 1
    // //       root.children.forEach((ch1) => {
    // //         log("ch1", ch1);
    // //         if (ch1.children !== undefined) {
    // //           log("undefined");
    // //           listCh1.push(ch1);
    // //         } else {
    // //           log("record.id", record.id);
    // //           log("ch1.id", ch1.id);
    // //           if (ch1.id !== record.id) {
    // //             log("test");
    // //             listCh1.push(ch1);
    // //           }
    // //         }
    // //       });

    // //       log("listCh1", listCh1);

    // //       list.push({
    // //         id: root.id,
    // //         uuid: root.uuid,
    // //         code: root.code,
    // //         children: listCh1,
    // //       });

    // //       // list.push(listCh1);
    // //     }
    // //   });
    // //   // test = list;
    // // }

    // setDataColumn(test);
  };

  const onAction = (e, record) => {
    setSelectedItem(record);
    if (e.key === "1") {
      edit(record);
    }
  };

  const onSetDataTable = async () => {
    setLoading(true);
    const { data } = await MainServices.get("account/list-tree");
    log("account/list-tree", data.data);
    setLoading(false);
    setDataColumn(data.data);

    setIsSucces(true);
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

    const res = MainServices.post("account/import", formData);
    log("res", res);

    onCloseUploadModal();

    navigate(0);
  };

  const onClosePopupModal = () => {
    setShowPopup(false);
  };

  const onSearch = async (e) => {
    const val = e.target.value;

    const key = cekNumber(val) ? "code" : "description";

    let res;

    let list = [];

    if (val === "") {
      res = await MainServices.get(`account/list-tree`);

      list = res.data.data;
    } else {
      res = await MainServices.get(`account/list?${key}=${val}`);

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

  // const onActive = async (record) => {
  //   setIsSucces(false);
  //   setShowPopup(true);

  //   log("record.status", record.status);

  //   const f = new FormData();

  //   f.append("uuid", record.uuid);

  //   if (record.status === 0) {
  //     const res = await MainServices.post("account/active", f);

  //     console.log("res-hapus", res);
  //   } else {
  //     const res = await MainServices.post("account/unactive", f);

  //     console.log("res-hapus", res);
  //   }

  //   onSetDataTable();
  // };

  const onTambahData = async (values) => {
    const { code_account, code_parent, description } = values;

    const f = new FormData();
    f.append("code_account", code_account);
    f.append("code_parent", code_parent);
    f.append("description", description);

    const res = await MainServices.post("account/insert", f);

    log("res-tambah", res);

    onSetDataTable();

    setIsTambah(true);
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
      showPopup,
      isSucces,
      isTambah,
    },
    func: {
      onCloseUploadModal,
      onOpenUploadModal,
      onClosePopupModal,
      onUploadFile,
      onSearch,
      onTambahData,
      setIsTambah,
    },
  };
};

export default AkunLogic;
