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

const CompanyLogic = () => {

  const [openUploadModal, setOpenUploadModal] = useState(false);

  const [dataColumn, setDataColumn] = useState([]);
  const [codeParent, setCodeParent] = useState([]);

  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;

  const [form] = Form.useForm();
  const [formTambah] = Form.useForm();

  const [showPopup, setShowPopup] = useState(false);
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
    {
      title: "Status",
      dataIndex: "status",
      width: "5%",
      render: (_, record) => {
        let rStatus = record.status;
        const editable = isEditing(record);

        return (
          <Switch
            size="small"
            disabled={editingKey !== ""}
            checked={rStatus === 1}
            onChange={() => onActive(record)}
          />
        );
      },
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
    onSetCodeParent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const responseShow = (res) => {
    dispatch(
      val({
        status: res.data.responseCode,
        message: res.data.responseDescription,
      })
    );
  };

  const onSetCodeParent = async () => {
    const { data } = await MainServices.get("company/list-tree-option");
    log("company/list-tree-option", data);
    setCodeParent(data.data);
  };

  const save = async (record) => {
    try {
      const row = await form.validateFields();
      log("record", record);

      const d = new FormData();
      d.append("id", record.id);
      d.append("code", row.code);
      d.append("parent", record.parent === null ? "" : record.parent);
      d.append("description", row.description);

      const res = await MainServices.post("company/update", d);
      console.log("res-edit", res);

      // setIsSucces(false);
      // setShowPopup(true);

      responseShow(res);

      onSetDataTable();

      setEditingKey("");
    } catch (error) {
      // setShowPopup(false);
      const err = error.response;
      responseShow(err);
      log("error", err);
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
    try {
      // setIsSucces(false);
      // setShowPopup(true);

      log("row-del", record);

      const res = await MainServices.delete("company/delete", {
        id: record.id,
      });

      console.log("res-hapus", res);

      responseShow(res);

      onSetDataTable();
    } catch (error) {
      const err = error.response;
      responseShow(err);
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
    const { data } = await MainServices.get("company/list-tree");
    log("company/list-tree", data.data);
    setLoading(false);
    setDataColumn(data.data);
  };

  const onOpenUploadModal = () => {
    setOpenUploadModal(true);
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
      const res = await MainServices.post("company/import", formData);
      log("res", res);

      dispatch(
        val({
          status: res.data.responseCode,
          message: res.data.responseDescription,
        })
      );

      setLoadingUpload(false);

      onSuccess();

      onSetDataTable();

      // navigate(0);
    } catch (error) {
      const err = error.response.data;
      dispatch(
        val({ status: err.responseCode, message: err.responseDescription })
      );
      log("error", err);
    }
  };

  const onExport = () => {
    const urlFile = `https://apikalla.binaries.id/ebudget/company/export`;
    window.location.href = urlFile;
  }

  const onClosePopupModal = () => {
    setShowPopup(false);
  };

  const onSearch = async (e) => {
    const val = e.target.value;

    try {
      let list = [];
      if (val !== "") {
        const res = await MainServices.get(`company/list?search=${val}`);

        log("res", res.data.data)

        // res.data.data.forEach((val) => {
        //   list.push({
        //     uuid: val.uuid,
        //     code: val.code_company,
        //     code_parent: val.code_parent,
        //     description: val.description,
        //     status: val.status,
        //     created_at: val.created_at,
        //     updated_at: val.updated_at,
        //   });
        // });

        setDataColumn(res.data.data);
        // setDataColumn(res.data.data)
      } else {
        onSetDataTable();
      }
    } catch (error) {
      alert(error);
    }
  };

  const onActive = async (record) => {
    // setIsSucces(false);
    // setShowPopup(true);

    let res;

    log("record.status", record.status);

    const f = new FormData();

    f.append("id", record.id);

    if (record.status === 0) {
      res = await MainServices.post("company/active", f);
    } else {
      res = await MainServices.post("company/unactive", f);
    }

    console.log("res-hapus", res);

    dispatch(
      val({
        status: res.data.responseCode,
        message: res.data.responseDescription,
      })
    );

    onSetDataTable();
  };

  const onTambahData = async (values) => {
    const { code_company, code_parent, description } = values;

    log("values", values);

    try {
      const f = new FormData();
      f.append("code", code_company);
      f.append("parent", code_parent);
      f.append("description", description);

      const res = await MainServices.post("company/add", f);

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
        code_company: "",
        code_parent: "",
        description: "",
        parent: false,
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
      codeParent,
      openUploadModal,
      getRootProps,
      getInputProps,
      acceptedFiles,
      size,
      loading,
      columns,
      form,
      showPopup,
      isTambah,
      formTambah,
      uploadSucces,
      loadingUpload,
    },
    func: {
      onOpenUploadModal,
      onClosePopupModal,
      onUploadFile,
      onSearch,
      onTambahData,
      setIsTambah,
      setUploadSucces,
      onExport
    },
  };
};

export default CompanyLogic;
