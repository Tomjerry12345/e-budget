import { Button, Dropdown, Menu } from "antd";
import { createRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  getAsync,
  postAsync,
  deleteAsync,
} from "../../../redux/main/main.thunks";
import {
  constantActionCoa,
  constantGetCoa,
  constantUploadCoa,
} from "./ConstantCoa";
import { getSizeScreen, log, setLocal } from "../../../values/Utilitas";

const endPoint = {
  perusahaan: "company",
  produk: "product",
  lokasi: "location",
  akun: "account",
  project: "project",
  icp: "icp",
};

const req = {
  perusahaan: [
    { key: "code_company", placeholder: "Kode Perusahaan" },
    { key: "code_parent", placeholder: "Kode Parent" },
    { key: "description", placeholder: "Description" },
  ],
  produk: [
    { key: "code_product", placeholder: "Kode Produk" },
    { key: "description", placeholder: "Description" },
    { key: "HSI", placeholder: "HSI" },
    { key: "HK", placeholder: "HK" },
    { key: "BSU", placeholder: "BSU" },
    { key: "KIA", placeholder: "KIA" },
    { key: "BLT", placeholder: "BLT" },
    { key: "BJU", placeholder: "BJU" },
    { key: "BSB", placeholder: "BSB" },
    { key: "BSD", placeholder: "BSD" },
    { key: "KIK", placeholder: "KIK" },
    { key: "KKI", placeholder: "KKI" },
    { key: "BLU", placeholder: "BLU" },
    { key: "IKP", placeholder: "IKP" },
    { key: "BK", placeholder: "BK" },
    { key: "BBU", placeholder: "BBU" },
  ],
  lokasi: [
    { key: "code_location", placeholder: "Kode Lokasi" },
    { key: "code_parent", placeholder: "Kode Parent" },
    { key: "description", placeholder: "Description" },
  ],
  akun: [
    { key: "type_account", placeholder: "Tipe Akun" },
    { key: "code_account", placeholder: "Kode Akun" },
    { key: "code_parent", placeholder: "Kode Parent" },
    { key: "description", placeholder: "Description" },
  ],
  project: [
    { key: "code_project", placeholder: "Kode Projek" },
    { key: "description", placeholder: "Description" },
    { key: "BJU", placeholder: "BJU" },
    { key: "BSB", placeholder: "BSB" },
    { key: "KIK", placeholder: "KIK" },
    { key: "BARUGA", placeholder: "BARUGA" },
  ],
  icp: [
    { key: "code_icp", placeholder: "Kode Departement" },
    { key: "description", placeholder: "Description" },
  ],
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
  const ref = createRef();

  let params = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, response, errorMessage, nameReducer } = useSelector(
    (state) => state.reducer
  );

  const itemPage = params.item;

  const [openUploadModal, setOpenUploadModal] = useState(false);

  const [tableColumn, setTableColumn] = useState([]);

  const [dataColumn, setDataColumn] = useState([]);

  const [updateData, setUpdateData] = useState(false);

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

  // const columns = [
  //   {
  //     title: "Code",
  //     dataIndex: "code",
  //     key: "code",
  //     width: "150px",
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //   },
  //   {
  //     dataIndex: "operation",
  //     fixed: "right",
  //     width: "5%",
  //     render: (_, record) => (
  //       <Dropdown overlay={<DropdownMenu onAction={onAction} record={record} />} placement="bottom" trigger={["click"]}>
  //         <Button className="more-style" icon={<MoreHorizIcon className="ic-more" />}></Button>
  //       </Dropdown>
  //     ),
  //   },
  // ];

  const constantTableColums = {
    perusahaan: [
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
        width: "150px",
      },
      // {
      //   title: "Kode Parent",
      //   dataIndex: "code_parent",
      //   width: "10%",
      // },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) => (
          <Dropdown
            overlay={<DropdownMenu onAction={onAction} record={record} />}
            placement="bottom"
            trigger={["click"]}
          >
            <Button icon={<MoreVertIcon />}></Button>
          </Dropdown>
        ),
      },
    ],
    produk: [
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
        width: "150px",
      },
      // {
      //   title: "Kode Parent",
      //   dataIndex: "code_parent",
      //   width: "10%",
      // },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      // {
      //   title: "HSI",
      //   dataIndex: "HSI",
      //   width: "5%",
      // },
      // {
      //   title: "HK",
      //   dataIndex: "HK",
      //   width: "5%",
      // },
      // {
      //   title: "BSU",
      //   dataIndex: "BSU",
      //   width: "5%",
      // },
      // {
      //   title: "KIA",
      //   dataIndex: "KIA",
      //   width: "5%",
      // },
      // {
      //   title: "BLT",
      //   dataIndex: "BLT",
      //   width: "5%",
      // },
      // {
      //   title: "BJU",
      //   dataIndex: "BJU",
      //   width: "5%",
      // },
      // {
      //   title: "BSB",
      //   dataIndex: "BSB",
      //   width: "5%",
      // },
      // {
      //   title: "BSD",
      //   dataIndex: "BSD",
      //   width: "5%",
      // },
      // {
      //   title: "KIK",
      //   dataIndex: "KIK",
      //   width: "5%",
      // },
      // {
      //   title: "KKI",
      //   dataIndex: "KKI",
      //   width: "5%",
      // },
      // {
      //   title: "BLU",
      //   dataIndex: "BLU",
      //   width: "5%",
      // },
      // {
      //   title: "IKP",
      //   dataIndex: "IKP",
      //   width: "5%",
      // },
      // {
      //   title: "BK",
      //   dataIndex: "BK",
      //   width: "5%",
      // },
      // {
      //   title: "BBU",
      //   dataIndex: "BBU",
      //   width: "5%",
      // },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) => (
          <Dropdown
            overlay={<DropdownMenu onAction={onAction} record={record} />}
            placement="bottom"
            trigger={["click"]}
          >
            <Button icon={<MoreVertIcon />}></Button>
          </Dropdown>
        ),
      },
    ],
    lokasi: [
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
        width: "150px",
      },
      // {
      //   title: "Kode Parent",
      //   dataIndex: "code_parent",
      //   width: "10%",
      // },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      // {
      //   title: "HSI",
      //   dataIndex: "HSI",
      //   width: "5%",
      // },
      // {
      //   title: "HK",
      //   dataIndex: "HK",
      //   width: "5%",
      // },
      // {
      //   title: "BSU",
      //   dataIndex: "BSU",
      //   width: "5%",
      // },
      // {
      //   title: "KIA",
      //   dataIndex: "KIA",
      //   width: "5%",
      // },
      // {
      //   title: "BLT",
      //   dataIndex: "BLT",
      //   width: "5%",
      // },
      // {
      //   title: "BJU",
      //   dataIndex: "BJU",
      //   width: "5%",
      // },
      // {
      //   title: "BSB",
      //   dataIndex: "BSB",
      //   width: "5%",
      // },
      // {
      //   title: "BSD",
      //   dataIndex: "BSD",
      //   width: "5%",
      // },
      // {
      //   title: "KIK",
      //   dataIndex: "KIK",
      //   width: "5%",
      // },
      // {
      //   title: "KKI",
      //   dataIndex: "KKI",
      //   width: "5%",
      // },
      // {
      //   title: "BLU",
      //   dataIndex: "BLU",
      //   width: "5%",
      // },
      // {
      //   title: "IKP",
      //   dataIndex: "IKP",
      //   width: "5%",
      // },
      // {
      //   title: "BK",
      //   dataIndex: "BK",
      //   width: "5%",
      // },
      // {
      //   title: "BBU",
      //   dataIndex: "BBU",
      //   width: "5%",
      // },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) => (
          <Dropdown
            overlay={<DropdownMenu onAction={onAction} record={record} />}
            placement="bottom"
            trigger={["click"]}
          >
            <Button icon={<MoreVertIcon />}></Button>
          </Dropdown>
        ),
      },
    ],
    akun: [
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
        width: "150px",
      },
      // {
      //   title: "Kode Akun",
      //   dataIndex: "code_account",
      //   // width: 150
      // },
      // {
      //   title: "Akun Induk",
      //   dataIndex: "code_parent",
      // },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) => (
          <Dropdown
            overlay={<DropdownMenu onAction={onAction} record={record} />}
            placement="bottom"
            trigger={["click"]}
          >
            <Button icon={<MoreVertIcon />}></Button>
          </Dropdown>
        ),
      },
    ],
    project: [
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
        width: "150px",
        // fixed: "left",
      },
      // {
      //   title: "Kode Parent",
      //   dataIndex: "code_parent",
      //   // width: "5%",
      // },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      // {
      //   title: "BJU",
      //   dataIndex: "bju",
      // },
      // {
      //   title: "BSB",
      //   dataIndex: "bsb",
      // },
      // {
      //   title: "KIK",
      //   dataIndex: "kik",
      // },
      // {
      //   title: "BARUGA",
      //   dataIndex: "baruga",
      // },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) => (
          <Dropdown
            overlay={<DropdownMenu onAction={onAction} record={record} />}
            placement="bottom"
            trigger={["click"]}
          >
            <Button icon={<MoreVertIcon />}></Button>
          </Dropdown>
        ),
      },
    ],
    icp: [
      {
        title: "Code",
        dataIndex: "code_icp",
        key: "code_icp",
        width: "150px",
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
        render: (_, record) => (
          <Dropdown
            overlay={<DropdownMenu onAction={onAction} record={record} />}
            placement="bottom"
            trigger={["click"]}
          >
            <Button icon={<MoreVertIcon />}></Button>
          </Dropdown>
        ),
      },
    ],
  };

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
          log("data", data);

          setDataColumn(data);
        }
      } else if (nameReducer === constantUploadCoa) {
        const { responseCode } = response;
        if (responseCode === 200) {
          onCloseUploadModal();

          // setLoading(true);
          // setLocal("move-page", `/main/coa/${params.item}`);
          navigate(0);
        } else {
          alert("terjadi kesalahan");
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
    setTableColumn(columns);
  };

  const onSetDataTable = () => {
    setLoading(true);
    dispatch(getAsync(`${endPoint[itemPage]}/list-tree`, constantGetCoa));
  };

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
    acceptedFiles.length = 0;
  };

  const onUploadFile = () => {
    let file1;
    acceptedFiles.forEach((file) => {
      file1 = file;
    });
    let formData = new FormData();
    formData.append("file", file1);
    dispatch(
      postAsync(`${endPoint[itemPage]}/import`, formData, constantUploadCoa)
    );
  };

  const onDelete = () => {
    const { uuid } = selectedItem;
    setLoading(true);
    onCancel();
    dispatch(
      deleteAsync(
        `${endPoint[itemPage]}/delete`,
        { uuid: uuid },
        constantActionCoa
      )
    );
  };

  const onCancel = () => {
    log("onCancel");
    setOpenAction({
      open: false,
      status: "",
    });
  };

  const onEdit = (values) => {
    const { uuid } = selectedItem;
    let formData = new FormData();
    formData.append("uuid", uuid);

    for (const prop in values) {
      formData.append(prop, values[prop]);
    }

    setLoading(true);
    onCancel();
    dispatch(
      postAsync(`${endPoint[itemPage]}/update`, formData, constantActionCoa)
    );
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
      ref,
      req: req[itemPage],
      columns,
    },
    func: {
      onCloseUploadModal,
      onOpenUploadModal,
      onUploadFile,
      onDelete,
      onCancel,
      onEdit,
    },
  };
};

export default CoaInputLogic;
