import { Button, Dropdown, Form, Menu, Popconfirm, Typography } from "antd";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDropzone } from "react-dropzone";
import {
  getSizeScreen,
  inputTypeTable,
  log,
} from "../../../../values/Utilitas";
import MainServices from "../../../../services/MainServices";
import { useDispatch } from "react-redux";
import { val } from "../../../../redux/action/action.reducer";
import { useNavigate } from "react-router-dom";

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

const LocationLogic = () => {
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
    const { data } = await MainServices.get("location/list-tree-option");
    log("company/list-tree-option", data);
    setCodeParent(data.data);
  };

  const onGetListPerusahaan = async (id) => {
    const d = new FormData();

    d.append("id", id);

    const res = await MainServices.post("location/list-company", d);
    log("location/list-company", res);
    setListPerusahaan(res.data.data);
    setOpenDetailPerusahaan(true);
    setIdRoot(id);
  };

  const onCloseDetailPerusahaan = () => {
    setOpenDetailPerusahaan(false);
  };

  const onUpdatePerusahaan = async (id) => {
    const d = new FormData();

    d.append("id_location", idRoot);
    d.append("id_company", id);

    await MainServices.post("location/update-company", d);

    const d1 = new FormData();

    d1.append("id", idRoot);

    const res1 = await MainServices.post("location/list-company", d1);
    setListPerusahaan(res1.data.data);
  };

  const save = async (record) => {
    try {
      const row = await form.validateFields();

      const code = row["code"];
      const description = row["description"];
      // const hk = row["HK"] === true ? 1 : row["HK"] === false ? 0 : row["HK"];
      // const kiu =
      //   row["KIU"] === true ? 1 : row["KIU"] === false ? 0 : row["KIU"];
      // const gmm =
      //   row["GMM"] === true ? 1 : row["GMM"] === false ? 0 : row["GMM"];
      // const kia =
      //   row["KIA"] === true ? 1 : row["KIA"] === false ? 0 : row["KIA"];
      // const bju =
      //   row["BJU"] === true ? 1 : row["BJU"] === false ? 0 : row["BJU"];
      // const blt =
      //   row["BLT"] === true ? 1 : row["BLT"] === false ? 0 : row["BLT"];
      // const blu =
      //   row["BLU"] === true ? 1 : row["BLU"] === false ? 0 : row["BLU"];
      // const bk = row["BK"] === true ? 1 : row["BK"] === false ? 0 : row["BK"];
      // const bsu =
      //   row["BSU"] === true ? 1 : row["BSU"] === false ? 0 : row["BSU"];
      // const bsb =
      //   row["BSB"] === true ? 1 : row["BSB"] === false ? 0 : row["BSB"];
      // const kik =
      //   row["KIK"] === true ? 1 : row["KIK"] === false ? 0 : row["KIK"];
      // const ikp =
      //   row["IKP"] === true ? 1 : row["IKP"] === false ? 0 : row["IKP"];
      // const band =
      //   row["BAND"] === true ? 1 : row["BAND"] === false ? 0 : row["BAND"];
      // const hsi =
      //   row["HSI"] === true ? 1 : row["HSI"] === false ? 0 : row["HSI"];
      // const holding =
      //   row["Holding"] === true
      //     ? 1
      //     : row["Holding"] === false
      //     ? 0
      //     : row["Holding"];
      // const bbu =
      //   row["BBU"] === true ? 1 : row["BBU"] === false ? 0 : row["BBU"];

      const d = new FormData();

      d.append("id", record.id);
      d.append("code", code);
      d.append("parent", record.parent ?? "");
      d.append("description", description);
      // d.append("HK", hk);
      // d.append("KIU", kiu);
      // d.append("GMM", gmm);
      // d.append("KIA", kia);
      // d.append("BJU", bju);
      // d.append("BLT", blt);
      // d.append("BLU", blu);
      // d.append("BK", bk);
      // d.append("BSU", bsu);
      // d.append("BSB", bsb);
      // d.append("KIK", kik);
      // d.append("IKP", ikp);
      // d.append("BAND", band);
      // d.append("HSI", hsi);
      // d.append("Holding", holding);
      // d.append("BBU", bbu);

      const res = await MainServices.post("location/update", d);
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
      const res = await MainServices.delete("location/delete", {
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
      onGetListPerusahaan(record.id);
    } else if (e.key === "2") {
      edit(record);
    }
  };

  const onSetDataTable = async () => {
    setLoading(true);
    const { data } = await MainServices.get("location/list-tree");
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
      const res = await MainServices.post("location/import", formData);
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
      const res = await MainServices.post("locationcompany/import", formData);
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
    } catch (error) {
      const err = error.response.data;
      dispatch(
        val({ status: err.responseCode, message: err.responseDescription })
      );
    }
  };

  const onExport = () => {
    const urlFile = `https://apikalla.binaries.id/ebudget/location/export`;
    window.location.href = urlFile;
  };

  const onSearch = async (e) => {
    const val = e.target.value;

    setLoading(true);

    try {
      if (val !== "") {
        const res = await MainServices.get(`location/list?search=${val}`);

        setDataColumn(res.data.data);

        setLoading(false);
      } else {
        log("error");
        onSetDataTable();
      }
    } catch (error) {
      const err = error.response;
      responseShow(err);
    }
  };

  const onTambahData = async (values) => {
    const { code_location, code_parent, description } = values;

    try {
      const f = new FormData();
      f.append("code", code_location);
      f.append("parent", code_parent ?? "");
      f.append("description", description);

      const res = await MainServices.post("location/add", f);

      onSetDataTable();

      setIsTambah(true);

      responseShow(res);

      formTambah.setFieldsValue({
        code_location: "",
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

export default LocationLogic;
