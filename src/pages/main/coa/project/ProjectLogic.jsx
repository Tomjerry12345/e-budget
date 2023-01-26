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

const ProjectLogic = () => {
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
      title: "Status",
      dataIndex: "status",
      width: "6px",
      fixed: "right",
      render: (_, record) => {
        let rStatus = record.status;

        return (
          <Switch
            size="small"
            checked={rStatus === 1}
            disabled={editingKey !== ""}
            onChange={() => onActive(record)}
          />
        );
      },
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
              onClick={() => save(record.uuid)}
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
    onGetListCompany();
    onSetDataTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onGetListCompany = async () => {
    const { data } = await MainServices.get("project/list");
    log("project/list", data.data);
    setData(data.data);
  };

  const save = async (key) => {
    try {
      // comment

      setIsSucces(false);
      setShowPopup(true);

      const row = await form.validateFields();
      log("row", row);

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

      const value = data.findIndex((item) => key === item.uuid);

      const val = data[value];
      log("i", value);
      log("val", val);

      const d = new FormData();
      d.append("uuid", val.uuid);
      d.append("code_project", code);
      d.append("code_parent", val.code_parent);
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

    const res = await MainServices.delete("project/delete", {
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

    const key = cekNumber(val) ? "code" : "description";

    let res;

    let list = [];

    if (val === "") {
      res = await MainServices.get(`project/list-tree`);

      list = res.data.data;
    } else {
      res = await MainServices.get(`project/list?${key}=${val}`);

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

  const onActive = async (record) => {
    setIsSucces(false);
    setShowPopup(true);

    log("record.status", record.status);

    try {
    } catch (error) {}

    const f = new FormData();

    f.append("uuid", record.uuid);

    if (record.status === 0) {
      const res = await MainServices.post("project/active", f);

      console.log("res-hapus", res);
    } else {
      const res = await MainServices.post("project/unactive", f);

      console.log("res-hapus", res);
    }

    onSetDataTable();
  };

  const onTambahData = async (values) => {
    const { code_company, code_parent, description } = values;

    const f = new FormData();
    f.append("code_company", code_company);
    f.append("code_parent", code_parent);
    f.append("description", description);

    const res = await MainServices.post("project/add", f);

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

export default ProjectLogic;
