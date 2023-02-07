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
import { useDispatch } from "react-redux";
import { val } from "../../../../redux/action/action.reducer";

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

  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.uuid === editingKey;

  const [form] = Form.useForm();
  const [formTambah] = Form.useForm();

  const [showPopup, setShowPopup] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [isTambah, setIsTambah] = useState(null);

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const constantTableColums = [
    {
      title: "Code",
      dataIndex: "code",
      width: 130,
      editable: true,
      fixed: "left",
    },
    {
      title: "Type Account",
      dataIndex: "type_account",
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
              onClick={() => save(record)}
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

  const dispatch = useDispatch();

  useEffect(() => {
    setDataColumn([]);
    window.onresize = getSizeScreen(setSize);
    onSetDataTable();
    formTambah.setFieldsValue({
      code_account: "",
      code_parent: "",
      type_account: "Neraca",
      description: "",
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async (record) => {
    try {
      const row = await form.validateFields();

      const d = new FormData();
      d.append("uuid", record.uuid);
      d.append("code_account", row.code);
      d.append("code_parent", record.parent === null ? "" : record.parent);
      d.append("type_account", row.type_account);
      d.append("description", row.description);

      const res = await MainServices.post("account/update", d);

      console.log("res-edit", res);

      setIsSucces(false);
      setShowPopup(true);

      onSetDataTable();

      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
      alert(errInfo);
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

  const onSuccess = () => {
    setUploadSucces(true);
    acceptedFiles.length = 0;
  };

  const onUploadFile = () => {
    let file1;

    try {
      acceptedFiles.forEach((file) => {
        file1 = file;
      });
      let formData = new FormData();
      formData.append("file", file1);

      const res = MainServices.post("account/import", formData);
      log("res", res);

      // onCloseUploadModal();

      dispatch(
        val({
          status: res.data.responseCode,
          message: res.data.responseDescription,
        })
      );

      setLoadingUpload(false);

      onSuccess();

      onSetDataTable();
    } catch (error) {
      const err = error.response.data;
      dispatch(
        val({ status: err.responseCode, message: err.responseDescription })
      );
      log("error", err);
    }
  };

  const onClosePopupModal = () => {
    setShowPopup(false);
  };

  const onSearch = async (e) => {
    const val = e.target.value;

    try {
      let list = [];
      if (val !== "") {
        const res = await MainServices.get(`account/list?search=${val}`);

        res.data.data.forEach((val) => {
          list.push({
            uuid: val.uuid,
            code: val.code_account,
            code_parent: val.code_parent,
            type_account: val.type_account,
            description: val.description,
            created_at: val.created_at,
            updated_at: val.updated_at,
          });
        });
        setDataColumn(list);
      } else {
        onSetDataTable();
      }
    } catch (error) {
      alert(error);
    }
  };

  const onTambahData = async (values) => {
    log("values", values);
    const { code_account, code_parent, type_account, description } = values;

    try {
      const f = new FormData();
      f.append("code_account", code_account);
      f.append("code_parent", code_parent);
      f.append("type_account", type_account);
      f.append("description", description);

      const res = await MainServices.post("account/add", f);

      log("res-tambah", res);

      onSetDataTable();

      setIsTambah(true);

      dispatch(
        val({
          status: res.data.responseCode,
          message: res.data.responseDescription,
        })
      );

      formTambah.setFieldsValue({
        code_account: "",
        code_parent: "",
        type_account: "",
        description: "",
        parent: false,
      });
    } catch (error) {
      const err = error.response.data;
      dispatch(
        val({ status: err.responseCode, message: err.responseDescription })
      );
      log("error", err);
    }
  };

  return {
    value: {
      dataColumn,
      openUploadModal,
      getRootProps,
      getInputProps,
      acceptedFiles,
      size,
      loading,
      columns,
      form,
      showPopup,
      isSucces,
      isTambah,
      formTambah,
      loadingUpload,
      uploadSucces
    },
    func: {
      onOpenUploadModal,
      onClosePopupModal,
      onUploadFile,
      onSearch,
      onTambahData,
      setIsTambah,
      setUploadSucces
    },
  };
};

export default AkunLogic;
