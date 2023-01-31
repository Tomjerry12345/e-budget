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

const ProjectLogic = () => {
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
      dataIndex: "code",
      width: "10px",
      editable: true,
      fixed: "left",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "20px",
      editable: true,
      fixed: "left",
    },
    {
      title: "HK",
      dataIndex: "HK",
      editable: true,
      width: "5px",
    },
    {
      title: "KIU",
      dataIndex: "KIU",
      editable: true,
      width: "5px",
    },
    {
      title: "GMM",
      dataIndex: "GMM",
      editable: true,
      width: "5px",
    },
    {
      title: "KIA",
      dataIndex: "KIA",
      editable: true,
      width: "5px",
    },
    {
      title: "BJU",
      dataIndex: "BJU",
      editable: true,
      width: "5px",
    },
    {
      title: "BLT",
      dataIndex: "BLT",
      editable: true,
      width: "5px",
    },
    {
      title: "BLU",
      dataIndex: "BLU",
      editable: true,
      width: "5px",
    },
    {
      title: "BK",
      dataIndex: "BK",
      editable: true,
      width: "5px",
    },
    {
      title: "BSU",
      dataIndex: "BSU",
      editable: true,
      width: "5px",
    },
    {
      title: "BSB",
      dataIndex: "BSB",
      editable: true,
      width: "5px",
    },
    {
      title: "KIK",
      dataIndex: "KIK",
      editable: true,
      width: "5px",
    },
    {
      title: "IKP",
      dataIndex: "IKP",
      editable: true,
      width: "5px",
    },
    {
      title: "BAND",
      dataIndex: "BAND",
      editable: true,
      width: "5px",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      editable: false,
      width: "10px",
    },
    {
      title: "Update At",
      dataIndex: "updated_at",
      editable: false,
      width: "10px",
    },
    {
      dataIndex: "operation",
      fixed: "right",
      width: "6px",
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

  useEffect(() => {
    setDataColumn([]);
    window.onresize = getSizeScreen(setSize);
    onSetDataTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async (record) => {
    try {
      const row = await form.validateFields();

      const code = row["code"];
      const description = row["description"];
      const hk = row["HK"] === true ? 1 : row["HK"] === false ? 0 : row["HK"];
      const kiu =
        row["KIU"] === true ? 1 : row["KIU"] === false ? 0 : row["KIU"];
      const gmm =
        row["GMM"] === true ? 1 : row["GMM"] === false ? 0 : row["GMM"];
      const kia =
        row["KIA"] === true ? 1 : row["KIA"] === false ? 0 : row["KIA"];
      const bju =
        row["BJU"] === true ? 1 : row["BJU"] === false ? 0 : row["BJU"];
      const blt =
        row["BLT"] === true ? 1 : row["BLT"] === false ? 0 : row["BLT"];
      const blu =
        row["BLU"] === true ? 1 : row["BLU"] === false ? 0 : row["BLU"];
      const bk = row["BK"] === true ? 1 : row["BK"] === false ? 0 : row["BK"];
      const bsu =
        row["BSU"] === true ? 1 : row["BSU"] === false ? 0 : row["BSU"];
      const bsb =
        row["BSB"] === true ? 1 : row["BSB"] === false ? 0 : row["BSB"];
      const kik =
        row["KIK"] === true ? 1 : row["KIK"] === false ? 0 : row["KIK"];
      const ikp =
        row["IKP"] === true ? 1 : row["IKP"] === false ? 0 : row["IKP"];
      const band =
        row["BAND"] === true ? 1 : row["BAND"] === false ? 0 : row["BAND"];

      const d = new FormData();
      d.append("uuid", record.uuid);
      d.append("code_project", code);
      d.append("code_parent", record.parent === null ? "" : record.parent);
      d.append("description", description);
      d.append("HK", hk);
      d.append("KIU", kiu);
      d.append("GMM", gmm);
      d.append("KIA", kia);
      d.append("BJU", bju);
      d.append("BLT", blt);
      d.append("BLU", blu);
      d.append("BK", bk);
      d.append("BSU", bsu);
      d.append("BSB", bsb);
      d.append("KIK", kik);
      d.append("IKP", ikp);
      d.append("BAND", band);

      const res = await MainServices.post("project/update", d);

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

    const res = await MainServices.delete("project/delete", {
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
    const { data } = await MainServices.get("project/list-tree");
    log("project/list-tree", data.data);
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

    const res = MainServices.post("project/import", formData);
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
        const res = await MainServices.get(`project/list?search=${val}`);

        res.data.data.forEach((val) => {
          list.push({
            uuid: val.uuid,
            code: val.code_project,
            code_parent: val.code_parent,
            description: val.description,
            HK: val.HK,
            KIU: val.KIU,
            GMM: val.GMM,
            KIA: val.KIA,
            BJU: val.BJU,
            BLT: val.BLT,
            BLU: val.BLU,
            BK: val.BK,
            BSU: val.BSU,
            BSB: val.BSB,
            KIK: val.KIK,
            IKP: val.IKP,
            BAND: val.BAND,
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
    const { code_project, code_parent, description } = values;

    try {
      const f = new FormData();
      f.append("code_project", code_project);
      f.append("code_parent", code_parent);
      f.append("description", description);

      const res = await MainServices.post("project/add", f);

      log("res-tambah", res);

      onSetDataTable();

      setIsTambah(true);
      formTambah.setFieldsValue({
        code_project: "",
        code_parent: "",
        description: "",
      });
    } catch (error) {
      alert(error);
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

export default ProjectLogic;
