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
import { getSizeScreen, log } from "../../../../values/Utilitas";
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
          <Popconfirm
            title="Sure to delete"
            placement="leftTop"
            onConfirm={() => onDelete(record)}
          >
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
  const isEditing = (record) => record.id === editingKey;

  const [form] = Form.useForm();
  const [formTambah] = Form.useForm();

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
      width: "7%",
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
            <Popconfirm
              placement="leftTop"
              title="Sure to cancel?"
              onConfirm={cancel}
            >
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async (record) => {
    try {
      const row = await form.validateFields();
      // const i = dataColumn.findIndex((item) => key === item.code_dept);

      // const val = dataColumn[i];

      const d = new FormData();
      d.append("id", record.id);
      d.append("code", row.code);
      d.append("description", row.description);

      // log("row", row);

      const res = await MainServices.post("department/update", d);

      // setIsSucces(false);
      // setShowPopup(true);

      console.log("res-edit", res);

      dispatch(
        val({
          status: res.data.responseCode,
          message: res.data.responseDescription,
        })
      );

      onSetDataTable();

      setEditingKey("");
    } catch (error) {
      log("error", error);
      const err = error.response.data;
      dispatch(
        val({ status: err.responseCode, message: err.responseDescription })
      );
      setEditingKey("");
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
    setEditingKey(record.id);
  };

  const onDelete = async (record) => {
    // setIsSucces(false);
    // setShowPopup(true);

    try {
      log("row-del", record);

      const res = await MainServices.delete("department/delete", {
        id: record.id,
      });

      console.log("res-hapus", res);

      dispatch(
        val({
          status: res.data.responseCode,
          message: res.data.responseDescription,
        })
      );

      onSetDataTable();
    } catch (error) {
      const err = error.response.data;
      dispatch(
        val({ status: err.responseCode, message: err.responseDescription })
      );
      log("error", err);
    }
  };

  const onAction = (e, record) => {
    if (e.key === "1") {
      edit(record);
    }
  };

  const onSetDataTable = async () => {
    setLoading(true);

    try {
      const { data } = await MainServices.get("department/list");
      log("dept/list-tree", data.data);
      setLoading(false);
      setDataColumn(data.data);
    } catch (error) {
      setLoading(false);
      alert(error.message);
      log("error", error);
    }
  };

  const onSuccess = () => {
    setUploadSucces(true);
    acceptedFiles.length = 0;
  };

  const onUploadFile = async () => {
    let file1;

    setLoadingUpload(true);

    acceptedFiles.forEach((file) => {
      file1 = file;
    });
    let formData = new FormData();
    formData.append("file", file1);

    try {
      const res = await MainServices.post("departement/import", formData);
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
      log("err", err);
      dispatch(
        val({ status: err.responseCode, message: err.responseDescription })
      );
      log("error", err);
    }
  };

  const onExport = () => {
    const urlFile = `https://apikalla.binaries.id/ebudget/department/export`;
    window.location.href = urlFile;
  };

  const onSearch = async (e) => {
    const val = e.target.value;
 
    try {
      let list = [];
      if (val !== "") {
        const res = await MainServices.get(`department/list?search=${val}`);
        // res.data.data.forEach((val) => {
        //   list.push({
        //     uuid: val.uuid,
        //     code_dept: val.code_dept,
        //     description: val.description,
        //     created_at: val.created_at,
        //     updated_at: val.updated_at,
        //   });
        // });

        setDataColumn(res.data.data);
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
      f.append("code", code_dept);
      f.append("description", description);

      const res = await MainServices.post("department/add", f);

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
        code_dept: "",
        description: "",
      });
    } catch (error) {
      const err = error.response.data;
      log("error", err);
      dispatch(
        val({ status: err.responseCode, message: err.responseDescription })
      );
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
      isTambah,
      formTambah,
      uploadSucces,
      loadingUpload,
    },
    func: {
      onUploadFile,
      onSearch,
      onTambahData,
      setIsTambah,
      setUploadSucces,
      onExport,
    },
  };
};

export default DepartementLogic;
