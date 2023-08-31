import { Button, Dropdown, Form, Menu, Popconfirm, Typography } from "antd";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDropzone } from "react-dropzone";
import { getSizeScreen, log, logO } from "../../../../values/Utilitas";
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

const AkunLogic = () => {
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const [dataColumn, setDataColumn] = useState([]);
  const [codeParent, setCodeParent] = useState([]);

  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.uuid === editingKey;

  const [form] = Form.useForm();
  const [formTambah] = Form.useForm();

  const [isTambah, setIsTambah] = useState(null);

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(null);

  const constantTableColums = [
    {
      title: "Code",
      dataIndex: "code",
      type: "number",
      width: 170,
      editable: true,
    },
    {
      title: "Type Account",
      dataIndex: "type",
      type: "text",
      width: 130,
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      type: "text",
      editable: true,
    },
    {
      title: "Lock",
      dataIndex: "lock",
      type: "bool",
      editable: true,
      width: 200,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      type: "text",
      editable: false,
      width: 150,
    },
    {
      title: "Update At",
      dataIndex: "updated_at",
      type: "text",
      editable: false,
      width: 150,
    },
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
        inputType: col.type,
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
    formTambah.setFieldsValue({
      code_account: "",
      code_parent: "",
      type_account: "Neraca",
      description: "",
    });
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
    const { data } = await MainServices.get("account/list-tree-option");
    log("company/list-tree-option", data);
    setCodeParent(data.data);
  };

  const save = async (record) => {
    try {
      const row = await form.validateFields();

      const d = new FormData();
      d.append("id", record.id);
      d.append("code", row.code);
      d.append("parent", record.parent ?? "");
      d.append("type", row.type_account);
      d.append("description", row.description);

      const res = await MainServices.post("account/update", d);
      responseShow(res);
      onSetDataTable();

      cancel();
    } catch (error) {
      const err = error.response;
      responseShow(err);
      cancel();
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
      const res = await MainServices.delete("account/delete", {
        id: record.id,
      });
      responseShow(res);
      onSetDataTable();
    } catch (error) {
      const err = error.response;
      responseShow(err);
    }
  };

  const onAction = (e, record) => {
    if (e.key === "1") {
      edit(record);
    }
  };

  const onSetDataTable = async () => {
    setLoading(true);
    const { data } = await MainServices.get("account/list-tree");
    logO({ data });
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
      const res = await MainServices.post("account/import", formData);
      responseShow(res);
      setLoadingUpload(false);
      onSuccess();
      onSetDataTable();
    } catch (error) {
      const err = error.response.data;
      responseShow(err);
    }
  };

  const onExport = async () => {
    try {
      const res = await MainServices.download("account/export");
      log({ res });
      const fileURL = URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `account.xlsx`;
      link.click();
    } catch (e) {
      log({ e });
      responseShow({
        status: 400,
        message: "Terjadi kesalahan saat melakuan export",
      });
    }
  };

  const onSearch = async (e) => {
    const val = e.target.value;

    try {
      if (val !== "") {
        const res = await MainServices.get(`account/list?search=${val}`);
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
    log("values", values);
    const { code_account, code_parent, type_account, description } = values;

    const f = new FormData();
    f.append("code", code_account);
    f.append("parent", code_parent ?? "");
    f.append("type", type_account);
    f.append("description", description);

    try {
      const res = await MainServices.post("account/add", f);

      onSetDataTable();
      setIsTambah(true);
      responseShow(res);

      formTambah.setFieldsValue({
        code_account: "",
        code_parent: "",
        type_account: "",
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
      loadingUpload,
      uploadSucces,
    },
    func: {
      onOpenUploadModal,
      onUploadFile,
      onSearch,
      onTambahData,
      setIsTambah,
      setUploadSucces,
      onExport,
    },
  };
};

export default AkunLogic;
