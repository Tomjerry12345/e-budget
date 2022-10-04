import { Button, Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { getAsync, postAsync, deleteAsync } from "../../../redux/main/main.thunks";
import { constantActionCoa, constantGetCoa, constantUploadCoa } from "./ConstantCoa";
import { getSizeScreen, getToken, log, setLocal } from "../../../values/Utilitas";
import qs from "qs";
import axios from "axios";

const endPoint = {
  "Kode perusahaan": "company",
  "Kode produk": "product",
  "Kode lokasi": "location",
  "Kode departemen": "dept",
  "Kode akun": "account",
  "Kode projek": "project",
  "Kode ICP": "icp",
};

const req = {
  "Kode perusahaan": ["code_company", "code_parent", "description"],
  "Kode produk": [],
  "Kode lokasi": [],
  "Kode departemen": [],
  "Kode akun": [],
  "Kode projek": [],
  "Kode ICP": [],
};

const DropdownMenu = ({ onAction, record }) => (
  <Menu
    items={[
      {
        key: "1",
        label: "edit",
      },
      {
        key: "2",
        label: "hapus",
      },
    ]}
    onClick={(e) => onAction(e, record)}
  />
);

const CoaInputLogic = () => {
  let params = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, response, errorMessage, nameReducer } = useSelector((state) => state.reducer);

  const itemPage = params.item;

  const [openUploadModal, setOpenUploadModal] = useState(false);

  const [tableColumn, setTableColumn] = useState([]);

  const [dataColumn, setDataColumn] = useState([]);

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

  const constantTableColums = {
    "Kode perusahaan": [
      {
        title: "Kode Company",
        dataIndex: "code_company",

        width: "10%",
        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "code_parent",

        width: "10%",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) => (
          <Dropdown overlay={<DropdownMenu onAction={onAction} record={record} />} placement="bottom" trigger={["click"]}>
            <Button icon={<MoreVertIcon />}></Button>
          </Dropdown>
        ),
      },
    ],
    "Kode produk": [
      {
        title: "Kode Produk",
        dataIndex: "code_product",
        width: "20%",

        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "code_parent",
        width: "10%",
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "20%",
      },
      {
        title: "HSI",
        dataIndex: "HSI",
        width: "5%",
      },
      {
        title: "HK",
        dataIndex: "HK",
        width: "5%",
      },
      {
        title: "BSU",
        dataIndex: "BSU",
        width: "5%",
      },
      {
        title: "KIA",
        dataIndex: "KIA",
        width: "5%",
      },
      {
        title: "BLT",
        dataIndex: "BLT",
        width: "5%",
      },
      {
        title: "BJU",
        dataIndex: "BJU",
        width: "5%",
      },
      {
        title: "BSB",
        dataIndex: "BSB",
        width: "5%",
      },
      {
        title: "BSD",
        dataIndex: "BSD",
        width: "5%",
      },
      {
        title: "KIK",
        dataIndex: "KIK",
        width: "5%",
      },
      {
        title: "KKI",
        dataIndex: "KKI",
        width: "5%",
      },
      {
        title: "BLU",
        dataIndex: "BLU",
        width: "5%",
      },
      {
        title: "IKP",
        dataIndex: "IKP",
        width: "5%",
      },
      {
        title: "BK",
        dataIndex: "BK",
        width: "5%",
      },
      {
        title: "BBU",
        dataIndex: "BBU",
        width: "5%",
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={<DropdownMenu onAction={onAction} />} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
      },
    ],
    "Kode lokasi": [
      {
        title: "Kode Lokasi",
        dataIndex: "code_location",
        width: "20%",

        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "code_parent",
        width: "10%",
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "20%",
      },
      {
        title: "HSI",
        dataIndex: "HSI",
        width: "5%",
      },
      {
        title: "HK",
        dataIndex: "HK",
        width: "5%",
      },
      {
        title: "BSU",
        dataIndex: "BSU",
        width: "5%",
      },
      {
        title: "KIA",
        dataIndex: "KIA",
        width: "5%",
      },
      {
        title: "BLT",
        dataIndex: "BLT",
        width: "5%",
      },
      {
        title: "BJU",
        dataIndex: "BJU",
        width: "5%",
      },
      {
        title: "BSB",
        dataIndex: "BSB",
        width: "5%",
      },
      {
        title: "BSD",
        dataIndex: "BSD",
        width: "5%",
      },
      {
        title: "KIK",
        dataIndex: "KIK",
        width: "5%",
      },
      {
        title: "KKI",
        dataIndex: "KKI",
        width: "5%",
      },
      {
        title: "BLU",
        dataIndex: "BLU",
        width: "5%",
      },
      {
        title: "IKP",
        dataIndex: "IKP",
        width: "5%",
      },
      {
        title: "BK",
        dataIndex: "BK",
        width: "5%",
      },
      {
        title: "BBU",
        dataIndex: "BBU",
        width: "5%",
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={<DropdownMenu onAction={onAction} />} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
      },
    ],
    "Kode departemen": [
      {
        title: "Kode Dept",
        dataIndex: "code_dept",
        width: "30%",

        fixed: "left",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={<DropdownMenu onAction={onAction} />} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
      },
    ],
    "Kode akun": [
      {
        title: "Type Akun",
        dataIndex: "type_account",
        // width: "30%",
        // width: 150,
        fixed: "left",
      },
      {
        title: "Kode Akun",
        dataIndex: "code_account",
        // width: 150
      },
      {
        title: "Akun Induk",
        dataIndex: "code_parent",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={<DropdownMenu onAction={onAction} />} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
      },
    ],
    "Kode projek": [
      {
        title: "Kode Project",
        dataIndex: "kode_project",
        // width: "20%",

        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "kode_parent",
        // width: "5%",
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "20%",
      },
      {
        title: "BJU",
        dataIndex: "bju",
      },
      {
        title: "BSB",
        dataIndex: "bsb",
      },
      {
        title: "KIK",
        dataIndex: "kik",
      },
      {
        title: "BARUGA",
        dataIndex: "baruga",
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={<DropdownMenu onAction={onAction} />} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
      },
    ],
    "Kode ICP": [
      {
        title: "Kode ICP",
        dataIndex: "code_icp",
        width: "30%",

        fixed: "left",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={<DropdownMenu onAction={onAction} />} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
      },
    ],
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  useEffect(() => {
    setDataColumn([]);
    window.onresize = getSizeScreen(setSize);
    onSetColumn();
    onSetDataTable();
  }, [params.item]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    log("response", response);
    setLoading(false);
    if (response !== null) {
      setLoading(false);
      if (nameReducer === constantGetCoa) {
        const { data } = response;

        if (data !== undefined) {
          log("data.length", data.length);

          setDataColumn(data);
        }
      } else if (nameReducer === constantUploadCoa) {
        const { responseCode } = response;
        if (responseCode === "200") {
          setLocal("move-page", `/main/coa/${params.item}`);
          navigate("/");
        }
      } else if (nameReducer === constantActionCoa) {
        onSetDataTable();
      }
    } else {
      console.log(`error ${errorMessage}`);
    }
  }, [isLoading, response]); // eslint-disable-line react-hooks/exhaustive-deps

  const onAction = (e, record) => {
    setSelectedItem(record);
    if (e.key === "1") {
      setOpenAction({ open: true, status: "edit" });
    } else {
      setOpenAction({ open: true, status: "delete" });
    }
  };

  const onSetColumn = () => {
    const columns = constantTableColums[itemPage].map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };
    });

    setTableColumn(columns);
  };

  const onSetDataTable = () => {
    setLoading(true);
    dispatch(getAsync(`${endPoint[itemPage]}/list`, constantGetCoa));
  };

  // const handleDelete = (key) => {
  //   const newData = dataColumn.filter((item) => item.key !== key);
  //   setDataColumn(newData);
  // };

  // const handleAdd = () => {
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: "32",
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   setDataColumn([...dataColumn, newData]);
  //   setCount(count + 1);
  // };

  const handleSave = (row) => {
    const newData = [...dataColumn];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataColumn(newData);
  };

  const onOpenUploadModal = () => {
    setOpenUploadModal(true);
  };

  const onCloseUploadModal = () => {
    setOpenUploadModal(false);
  };

  const onUploadFile = () => {
    let file1;
    acceptedFiles.forEach((file) => {
      file1 = file;
    });
    let formData = new FormData();
    formData.append("file", file1);
    dispatch(postAsync(`${endPoint[itemPage]}/import`, formData, constantUploadCoa));
  };

  const onOk = () => {
    const { uuid } = selectedItem;
    const path = `${endPoint[itemPage]}/delete`;
    log("onOk", selectedItem);
    log(`uuid => ${uuid}`);
    log(`delete => ${path}`);
    setLoading(true);
    onCancel();
    if (openAction.status === "edit") {
      let formData = new FormData();
      formData.append("uuid", uuid);
      // req[itemPage].forEach(key => {
      //   formData.append(key, uuid);
      // })
      dispatch(postAsync(path, formData, constantActionCoa));
    } else {
      dispatch(deleteAsync(path, { uuid: uuid }, constantActionCoa));
    }
  };

  const onCancel = () => {
    log("onCancel");
    setOpenAction({
      open: false,
      status: "",
    });
  };

  return {
    value: {
      dataColumn,
      tableColumn,
      params,
      openUploadModal,
      getRootProps,
      getInputProps,
      acceptedFiles,
      size,
      openAction,
      loading,
    },
    func: {
      onCloseUploadModal,
      onOpenUploadModal,
      onUploadFile,
      onOk,
      onCancel,
    },
  };
};

export default CoaInputLogic;
