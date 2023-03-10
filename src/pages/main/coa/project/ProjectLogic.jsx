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
import {
  cekNumber,
  getSizeScreen,
  inputTypeTable,
  log,
} from "../../../../values/Utilitas";
import MainServices from "../../../../services/MainServices";
import { useDispatch } from "react-redux";
import { val } from "../../../../redux/action/action.reducer";

const DropdownMenu = ({ onAction, record, onDelete }) => (
  <Menu
    items={[
      {
        key: "1",
        label: "lihat perusahaan",
      },
      {
        key: "2",
        label: "edit",
      },
      {
        key: "3",
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

const ProjectLogic = () => {
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

  const [isTambah, setIsTambah] = useState(null);

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const [listPerusahaan, setListPerusahaan] = useState([]);
  const [openDetailPerusahaan, setOpenDetailPerusahaan] = useState(false);
  const [idRoot, setIdRoot] = useState();

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
      fixed: "left",
    },
    // {
    //   title: "HK",
    //   dataIndex: "HK",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "KIU",
    //   dataIndex: "KIU",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "GMM",
    //   dataIndex: "GMM",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "KIA",
    //   dataIndex: "KIA",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "BJU",
    //   dataIndex: "BJU",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "BLT",
    //   dataIndex: "BLT",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "BLU",
    //   dataIndex: "BLU",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "BK",
    //   dataIndex: "BK",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "BSU",
    //   dataIndex: "BSU",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "BSB",
    //   dataIndex: "BSB",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "KIK",
    //   dataIndex: "KIK",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "IKP",
    //   dataIndex: "IKP",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "BAND",
    //   dataIndex: "BAND",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "HSI",
    //   dataIndex: "HSI",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "Holding",
    //   dataIndex: "Holding",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
    // {
    //   title: "BBU",
    //   dataIndex: "BBU",
    //   editable: true,
    //   align: "center",
    //   width: "8px",
    // },
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
    //   width: "6px",
    //   fixed: "right",
    //   render: (_, record) => {
    //     let rStatus = record.status;

    //     return (
    //       <Switch
    //         size="small"
    //         checked={rStatus === 1}
    //         disabled={editingKey !== ""}
    //         onChange={() => onActive(record)}
    //       />
    //     );
    //   },
    // },
    {
      dataIndex: "operation",
      fixed: "right",
      width: 100,
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
        inputType: inputTypeTable(col.dataIndex),
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
    const { data } = await MainServices.get("project/list-tree-option");
    log("company/list-tree-option", data);
    setCodeParent(data.data);
  };

  const onGetListPerusahaan = async (record) => {
    const d = new FormData();

    d.append("id", record.id);

    const res = await MainServices.post("project/list-company", d);
    log("project/list-company", res);
    setListPerusahaan(res.data.data);
    setOpenDetailPerusahaan(true);
    setIdRoot(record.id);
  };

  const onCloseDetailPerusahaan = () => {
    setOpenDetailPerusahaan(false);
  };

  const onUpdatePerusahaan = async (id) => {
    log("id", id);
    log("idRoot", idRoot);

    const d = new FormData();

    d.append("id_location", idRoot);
    d.append("id_company", id);

    const res = await MainServices.post("project/update-company", d);
    log("project/update-company", res);
  };

  const save = async (record) => {
    try {
      const row = await form.validateFields();

      const code = row["code"];
      const description = row["description"];

      const d = new FormData();
      d.append("id", record.id);
      d.append("code", code);
      d.append("parent", record.parent === null ? "" : record.parent);
      d.append("description", description);

      const res = await MainServices.post("project/update", d);

      console.log("res-edit", res);

      responseShow(res);

      onSetDataTable();

      cancel();
    } catch (error) {
      const err = error.response;
      responseShow(err);
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
      const res = await MainServices.delete("project/delete", {
        id: record.id,
      });

      console.log("res-hapus", res);

      responseShow(res);

      onSetDataTable();
    } catch (error) {
      const err = error.response;
      responseShow(err);
    }
  };

  const onAction = (e, record) => {
    if (e.key === "1") {
      onGetListPerusahaan(record);
    } else if (e.key === "2") {
      edit(record);
    }
  };

  const onSetDataTable = async () => {
    setLoading(true);
    const { data } = await MainServices.get("project/list-tree");
    log("project/list-tree", data.data);
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
      const res = await MainServices.post("project/import", formData);
      log("res", res);

      responseShow(res);
      setLoadingUpload(false);
      onSuccess();
      onSetDataTable();
    } catch (error) {
      const err = error.response;
      responseShow(err);
    }
  };

  const onUploadFile2 = async () => {
    let file1;

    setLoadingUpload(true);

    acceptedFiles.forEach((file) => {
      file1 = file;
    });

    let formData = new FormData();
    formData.append("file", file1);

    try {
      const res = await MainServices.post("projectcompany/import", formData);
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
    const urlFile = `https://apikalla.binaries.id/ebudget/project/export`;
    window.location.href = urlFile;
  };

  const onSearch = async (e) => {
    const val = e.target.value;

    try {
      if (val !== "") {
        const res = await MainServices.get(`project/list?search=${val}`);
        setDataColumn(res.data.data);
      } else {
        onSetDataTable();
      }
    } catch (error) {
      const err = error.response;
      responseShow(err);
    }
  };

  const onTambahData = async (values) => {
    const { code_project, code_parent, description } = values;

    try {
      const f = new FormData();
      f.append("code", code_project);
      f.append("parent", code_parent);
      f.append("description", description);

      const res = await MainServices.post("project/add", f);

      onSetDataTable();
      setIsTambah(true);
      responseShow(res);

      formTambah.setFieldsValue({
        code_project: "",
        code_parent: "",
        description: "",
        parent: false,
      });
    } catch (error) {
      const err = error.response;
      responseShow(err);
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
      isTambah,
      formTambah,
      uploadSucces,
      loadingUpload,
      listPerusahaan,
      openDetailPerusahaan,
    },
    func: {
      onOpenUploadModal,
      onUploadFile,
      onUploadFile2,
      onSearch,
      onTambahData,
      setIsTambah,
      setUploadSucces,
      onExport,
      onCloseDetailPerusahaan,
      onUpdatePerusahaan,
    },
  };
};

export default ProjectLogic;
