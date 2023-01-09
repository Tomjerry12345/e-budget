import { Button, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDropzone } from "react-dropzone";
import { getSizeScreen, log } from "../../../../values/Utilitas";
import MainServices from "../../../../services/MainServices";

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

const DepartementLogic = () => {
  const navigate = useNavigate();

  const [openUploadModal, setOpenUploadModal] = useState(false);

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

  const constantTableColums = [
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
      render: (_, record) => (
        <Dropdown overlay={<DropdownMenu onAction={onAction} record={record} />} placement="bottom" trigger={["click"]}>
          <Button icon={<MoreVertIcon />}></Button>
        </Dropdown>
      ),
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
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  useEffect(() => {
    setDataColumn([]);
    window.onresize = getSizeScreen(setSize);
    onSetDataTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onAction = (e, record) => {
    setSelectedItem(record);
    if (e.key === "1") {
      setOpenAction({ open: true, status: "edit" });
    } else {
      setOpenAction({ open: true, status: "delete" });
    }
  };

  const onSetDataTable = async () => {
    setLoading(true);
    const { data } = await MainServices.get("dept/list");
    log("dept/list", data.data);
    setLoading(false);
    setDataColumn(data.data);
    // dispatch(getAsync(`${endPoint[itemPage]}/list-tree`, constantGetCoa));
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

    const res = MainServices.post("dept/import", formData);
    log("res", res);

    onCloseUploadModal();

    navigate(0);
  };

  const onDelete = () => {
    const { uuid } = selectedItem;
    setLoading(true);
    onCancel();
    // dispatch(deleteAsync(`${endPoint[itemPage]}/delete`, { uuid: uuid }, constantActionCoa));
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
    // dispatch(postAsync(`${endPoint[itemPage]}/update`, formData, constantActionCoa));
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

export default DepartementLogic;
