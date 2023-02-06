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

const DepartementLogic = () => {
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

  const constantTableColums = [
    {
      title: "Code",
      dataIndex: "code_dept",
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
              onClick={() => save(record.code_dept)}
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

  const dispatch = useDispatch()

  useEffect(() => {
    setDataColumn([]);
    window.onresize = getSizeScreen(setSize);
    onSetDataTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const i = dataColumn.findIndex((item) => key === item.code_dept);

      const val = dataColumn[i];

      const d = new FormData();
      d.append("uuid", val.uuid);
      d.append("code_dept", row.code_dept);
      d.append("description", row.description);

      // log("row", row);

      const res = await MainServices.post("dept/update", d);

      setIsSucces(false);
      setShowPopup(true);

      console.log("res-edit", res);

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

    const res = await MainServices.delete("dept/delete", {
      uuid: record.uuid,
    });

    console.log("res-hapus", res);

    onSetDataTable();
  };

  const onAction = (e, record) => {
    if (e.key === "1") {
      edit(record);
    }
  };

  const onSetDataTable = async () => {
    setLoading(true);
    const { data } = await MainServices.get("dept/list");
    log("dept/list-tree", data.data);
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

    const res = MainServices.post("product/import", formData);
    log("res", res);

    onCloseUploadModal();

    navigate(0);
  };

  const onClosePopupModal = () => {
    setShowPopup(false);
  };

  const onSearch = async (e) => {
    const val = e.target.value;

    try {
      let list = [];
      if (val !== "") {
        const res = await MainServices.get(`dept/list?search=${val}`);
        res.data.data.forEach((val) => {
          list.push({
            uuid: val.uuid,
            code_dept: val.code_dept,
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
    const { code_dept, description } = values;

    try {
      const f = new FormData();
      f.append("code_dept", code_dept);
      f.append("description", description);

      const res = await MainServices.post("dept/add", f);

      log("res-tambah", res);

      onSetDataTable();

      setIsTambah(true);

      dispatch(val({status: res.data.responseCode, message: res.data.responseDescription}))

      formTambah.setFieldsValue({
        code_dept: "",
        description: "",
      });

    } catch (error) {
      const err =  error.response.data
      log("error", err)
      dispatch(val({status: err.responseCode, message: err.responseDescription}))
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

export default DepartementLogic;
