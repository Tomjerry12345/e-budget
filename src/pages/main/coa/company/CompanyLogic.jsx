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

  useEffect(() => {
    setDataColumn([]);
    window.onresize = getSizeScreen(setSize);
    onSetDataTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async (record) => {
    try {
      const row = await form.validateFields();
      log("record", record);

      const d = new FormData();
      d.append("uuid", record.uuid);
      d.append("code_company", row.code);
      d.append("code_parent", record.parent === null ? "" : record.parent);
      d.append("description", row.description);

      const res = await MainServices.post("company/update", d);
      console.log("res-edit", res);

      setIsSucces(false);
      setShowPopup(true);

      onSetDataTable();

      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
      alert(errInfo);
      setShowPopup(false);
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
    try {
      setIsSucces(false);
      setShowPopup(true);

      log("row-del", record);

      const res = await MainServices.delete("company/delete", {
        uuid: record.uuid,
      });

      console.log("res-hapus", res);

      onSetDataTable();
    } catch (error) {
      alert(error);
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

    setIsSucces(true);
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

  const onClosePopupModal = () => {
    setShowPopup(false);
  };

  const onSearch = async (e) => {
    const val = e.target.value;

    try {
      let list = [];
      if (val !== "") {
        const res = await MainServices.get(`company/list?search=${val}`);

        res.data.data.forEach((val) => {
          list.push({
            uuid: val.uuid,
            code: val.code_company,
            code_parent: val.code_parent,
            description: val.description,
            status: val.status,
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

  const onActive = async (record) => {
    setIsSucces(false);
    setShowPopup(true);

    log("record.status", record.status);

    const f = new FormData();

    f.append("uuid", record.uuid);

    if (record.status === 0) {
      const res = await MainServices.post("company/active", f);

      console.log("res-hapus", res);
    } else {
      const res = await MainServices.post("company/unactive", f);

      console.log("res-hapus", res);
    }

    onSetDataTable();
  };

  const onTambahData = async (values) => {
    const { code_company, code_parent, description } = values;

    try {
      const f = new FormData();
      f.append("code_company", code_company);
      f.append("code_parent", code_parent);
      f.append("description", description);

      const res = await MainServices.post("company/add", f);

      log("res-tambah", res);

      onSetDataTable();

      setIsTambah(true);

      formTambah.setFieldsValue({
        code_dept: "",
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

export default CompanyLogic;
