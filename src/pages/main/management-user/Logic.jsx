import { Button, Form, Popconfirm } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { val } from "redux/action/action.reducer";
import MainServices from "services/MainServices";
import { formDataUtils, log } from "values/Utilitas";

const Logic = () => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [totalData, setTotalData] = useState(0);

  const dispatch = useDispatch();

  const idRef = useRef();

  const defaultColumns = [
    {
      title: "No",
      dataIndex: "no",
      width: "2%",
      render: (item, record, index) => <>{index + 1}</>,
    },
    {
      title: "Username",
      dataIndex: "username",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Nama",
      dataIndex: "name",
      width: "15%",
    },
    {
      title: "User group",
      dataIndex: "user_group",
    },
    {
      title: "Akses perusahaan",
      dataIndex: "code_company",
    },
    {
      title: "Kode Lokasi",
      dataIndex: "code_location",
    },
    {
      title: "Kode Department",
      dataIndex: "code_department",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <Button className="btn-edit" type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>

            <Popconfirm
              title="Sure to reset password?"
              onConfirm={() => onResetPassword(record.id)}
            >
              <Button className="btn-reset" type="link">
                Reset password
              </Button>
            </Popconfirm>

            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <Button className="btn-delete" type="link">
                Delete
              </Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
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
      }),
    };
  });

  useEffect(() => {
    onGetUser();
  }, []);

  const showNotif = (status, message) => {
    dispatch(
      val({
        status: status,
        message: message,
      })
    );
  };

  const onGetUser = async () => {
    try {
      let url = `users`;
      const { data } = await MainServices.get(url);
      setDataSource(data.data.data);
      setTotalData(data.data.total);
    } catch (error) {
      console.error(`Error fetching data`, error);
    }
  };

  const onOpenModal = (e) => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    form.resetFields();
  };

  const onActionUser = async (values) => {
    try {
      if (isEdit) {
        const params = {
          ...values,
          code_company:
            values.code_company === undefined
              ? null
              : values.code_company.toString() === ""
              ? null
              : values.code_company.toString(),
          code_location: values.code_location ?? null,
          code_department: values.code_department ?? null,
          id: idRef.current,
        };

        const url = `users`;
        await MainServices.update(url, params);
      } else {
        const params = {
          ...values,
          code_company:
            values.code_company === undefined
              ? null
              : values.code_company.toString() === ""
              ? null
              : values.code_company.toString(),
          code_location: values.code_location ?? null,
          code_department: values.code_department ?? null,
        };

        const formData = formDataUtils(params);

        const url = `users`;
        const res = await MainServices.post(url, formData);
        log({ res });
      }

      onGetUser();
      onCloseModal();
    } catch (error) {
      // Tangani error jika ada
      showNotif(400, error.response.data.responseDescription);
      console.error(`Error fetching data`, error);
    }
  };

  const onResetPassword = async (id) => {
    try {
      const url = `users/reset-password`;
      const formData = formDataUtils({ id });
      await MainServices.post(url, formData);
      showNotif(200, "Sukses reset password");
      onGetUser();
    } catch (error) {
      // Tangani error jika ada
      showNotif(400, error.message);
      console.error(`Error fetching data`, error);
    }
  };

  const handleEdit = async (record) => {
    let code_company = undefined;

    idRef.current = record.id;

    if (record.code_company !== null) code_company = record.code_company.split(",");

    const nRecord = {
      ...record,
      code_company,
    };
    form.setFieldsValue(nRecord);
    setIsEdit(true);
    onOpenModal();
  };

  const handleDelete = async (id) => {
    try {
      const url = `users`;
      await MainServices.delete(url, {
        id,
      });
      onGetUser();
    } catch (error) {
      // Tangani error jika ada
      showNotif(400, error.message);
      console.error(`Error fetching data`, error);
    }
  };

  const onSearch = async (values) => {
    try {
      if (values.search === "") {
        onGetUser();
        return;
      }
      let url = `users/${values.search}`;
      const { data } = await MainServices.get(url);
      setDataSource([data.data]);
      setTotalData(1);
    } catch (error) {
      showNotif(400, error.message);
      console.error(`Error fetching data`, error);
    }
  };

  return {
    value: {
      dataSource,
      columns,
      openModal,
      form,
      isEdit,
      totalData,
    },
    func: {
      onOpenModal,
      onCloseModal,
      onActionUser,

      onSearch,
    },
  };
};

export default Logic;
