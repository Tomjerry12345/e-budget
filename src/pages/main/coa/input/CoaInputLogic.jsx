import { Button, Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoaAsync,
  uploadCoaAsync,
} from "../../../../redux/main/main.thunks";
import { constantGetCoa, constantUploadCoa } from "./ConstantCoa";
import { setLocal } from "../../../../values/Utilitas";

const menu = (
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
  />
);

const CoaInputLogic = () => {
  let params = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, response, errorMessage, nameReducer } = useSelector(
    (state) => state.reducer
  );

  const itemPage = params.item;

  const [openUploadModal, setOpenUploadModal] = useState(false);

  const [tableColumn, setTableColumn] = useState([]);

  // const [dataColumn, setDataColumn] = useState(dataTable);
  const [dataColumn, setDataColumn] = useState([]);

  const constantTableColums = {
    "Kode perusahaan": [
      {
        title: "Kode Company",
        dataIndex: "code_company",
        editable: true,
        width: "10%",
        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "code_parent",
        editable: true,
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
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
      },
    ],
    "Kode produk": [
      {
        title: "Kode Produk",
        dataIndex: "code_product",
        width: "20%",
        editable: true,
        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "code_parent",
        width: "10%",
        editable: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "20%",
        editable: true,
      },
      {
        title: "HSI",
        dataIndex: "HSI",
        width: "5%",
        editable: true,
      },
      {
        title: "HK",
        dataIndex: "HK",
        width: "5%",
        editable: true,
      },
      {
        title: "BSU",
        dataIndex: "BSU",
        width: "5%",
        editable: true,
      },
      {
        title: "KIA",
        dataIndex: "KIA",
        width: "5%",
        editable: true,
      },
      {
        title: "BLT",
        dataIndex: "BLT",
        width: "5%",
        editable: true,
      },
      {
        title: "BJU",
        dataIndex: "BJU",
        width: "5%",
        editable: true,
      },
      {
        title: "BSB",
        dataIndex: "BSB",
        width: "5%",
        editable: true,
      },
      {
        title: "BSD",
        dataIndex: "BSD",
        width: "5%",
        editable: true,
      },
      {
        title: "KIK",
        dataIndex: "KIK",
        width: "5%",
        editable: true,
      },
      {
        title: "KKI",
        dataIndex: "KKI",
        width: "5%",
        editable: true,
      },
      {
        title: "BLU",
        dataIndex: "BLU",
        width: "5%",
        editable: true,
      },
      {
        title: "IKP",
        dataIndex: "IKP",
        width: "5%",
        editable: true,
      },
      {
        title: "BK",
        dataIndex: "BK",
        width: "5%",
        editable: true,
      },
      {
        title: "BBU",
        dataIndex: "BBU",
        width: "5%",
        editable: true,
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
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
        editable: true,
        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "code_parent",
        width: "10%",
        editable: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "20%",
        editable: true,
      },
      {
        title: "HSI",
        dataIndex: "HSI",
        width: "5%",
        editable: true,
      },
      {
        title: "HK",
        dataIndex: "HK",
        width: "5%",
        editable: true,
      },
      {
        title: "BSU",
        dataIndex: "BSU",
        width: "5%",
        editable: true,
      },
      {
        title: "KIA",
        dataIndex: "KIA",
        width: "5%",
        editable: true,
      },
      {
        title: "BLT",
        dataIndex: "BLT",
        width: "5%",
        editable: true,
      },
      {
        title: "BJU",
        dataIndex: "BJU",
        width: "5%",
        editable: true,
      },
      {
        title: "BSB",
        dataIndex: "BSB",
        width: "5%",
        editable: true,
      },
      {
        title: "BSD",
        dataIndex: "BSD",
        width: "5%",
        editable: true,
      },
      {
        title: "KIK",
        dataIndex: "KIK",
        width: "5%",
        editable: true,
      },
      {
        title: "KKI",
        dataIndex: "KKI",
        width: "5%",
        editable: true,
      },
      {
        title: "BLU",
        dataIndex: "BLU",
        width: "5%",
        editable: true,
      },
      {
        title: "IKP",
        dataIndex: "IKP",
        width: "5%",
        editable: true,
      },
      {
        title: "BK",
        dataIndex: "BK",
        width: "5%",
        editable: true,
      },
      {
        title: "BBU",
        dataIndex: "BBU",
        width: "5%",
        editable: true,
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
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
        editable: true,
        fixed: "left",
      },
      {
        title: "Description",
        dataIndex: "description",
        editable: true,
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
      },
    ],
    "Kode akun": [
      {
        title: "Type Akun",
        dataIndex: "type_account",
        width: "30%",
        editable: true,
        fixed: "left",
      },
      {
        title: "Kode Akun",
        dataIndex: "code_account",
        editable: true,
      },
      {
        title: "Akun Induk",
        dataIndex: "code_parent",
        editable: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        editable: true,
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
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
        editable: true,
        fixed: "left",
      },
      {
        title: "Kode Parent",
        dataIndex: "kode_parent",
        // width: "5%",
        editable: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "20%",
        editable: true,
      },
      {
        title: "BJU",
        dataIndex: "bju",
        editable: true,
      },
      {
        title: "BSB",
        dataIndex: "bsb",
        editable: true,
      },
      {
        title: "KIK",
        dataIndex: "kik",
        editable: true,
      },
      {
        title: "BARUGA",
        dataIndex: "baruga",
        editable: true,
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
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
        editable: true,
        fixed: "left",
      },
      {
        title: "Description",
        dataIndex: "description",
        editable: true,
      },
      {
        dataIndex: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) =>
          dataColumn.length >= 1 ? (
            <Dropdown overlay={menu} placement="bottom">
              <Button icon={<MoreVertIcon />}></Button>
            </Dropdown>
          ) : null,
      },
    ],
  };

  const endPoint = {
    "Kode perusahaan": "company",
    "Kode produk": "product",
    "Kode lokasi": "location",
    "Kode departemen": "dept",
    "Kode akun": "account",
    "Kode projek": "Project",
    "Kode ICP": "icp",
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  useEffect(() => {
    onSetColumn();
    onSetDataTable();
  }, [params.item]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (response !== null) {
      if (nameReducer === constantGetCoa) {
        const { data } = response;

        setDataColumn(data.data);
      } else if (nameReducer === constantUploadCoa) {
        const { responseCode } = response;
        if (responseCode === "200") {
          setLocal("move-page", `/main/coa/input/${params.item}`);
          navigate("/");
        }
        console.log(`reponse => ${JSON.stringify(response)}`);
      }
    } else {
      console.log(`error ${errorMessage}`);
    }
  }, [isLoading, response]); // eslint-disable-line react-hooks/exhaustive-deps

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
    dispatch(getCoaAsync(endPoint[itemPage]));
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
    dispatch(uploadCoaAsync(endPoint[itemPage], formData));
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
    },
    func: {
      onCloseUploadModal,
      onOpenUploadModal,
      onUploadFile,
    },
  };
};

export default CoaInputLogic;
