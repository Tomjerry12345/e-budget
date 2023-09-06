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
      title: "Username",
      dataIndex: "username",
      width: "30%",
    },
    {
      title: "Nama",
      dataIndex: "name",
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
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <Button
              className="btn-edit"
              type="link"
              onClick={() => {
                idRef.current = record.id;
                const code_company = record.code_company.split(",");
                setIsEdit(true);
                const nRecord = {
                  ...record,
                  code_company,
                };
                form.setFieldsValue(nRecord);
                onOpenModal();
              }}
            >
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
      const url = `users`;
      const { data } = await MainServices.get(url);
      log("data.data", data.data.data);
      setDataSource(data.data.data);
      setTotalData(data.data.total);
    } catch (error) {
      // Tangani error jika ada
      console.error(`Error fetching data`, error);
    }
  };

  const onOpenModal = () => {
    // const newData = {
    //   key: "0",
    //   username: "admin",
    //   nama: "Admin",
    //   user_group: "admin",
    //   akses_perusahaan: "hk",
    // };
    // setDataSource([...dataSource, newData]);
    // setCount(count + 1);
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
          code_company: values.code_company.toString(),
          id: idRef.current,
        };

        const url = `users`;
        await MainServices.update(url, params);
      } else {
        const params = {
          ...values,
          code_company: values.code_company.toString(),
        };

        const formData = formDataUtils(params);

        const url = `users`;
        await MainServices.post(url, formData);
      }

      onGetUser();
      onCloseModal();
    } catch (error) {
      // Tangani error jika ada
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

  const handleDelete = async (id) => {
    try {
      const url = `users`;
      await MainServices.delete(url, {
        id,
      });
      onGetUser();
    } catch (error) {
      // Tangani error jika ada
      console.error(`Error fetching data`, error);
    }
  };

  const onChangePagination = (page, pageSize) => {
    log({ page });
    log({ pageSize });
    // const uFilter = {
    //   ...codeFilter,
    //   page,
    // };
    // getData(uFilter);
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
      onChangePagination,
    },
  };
};

export default Logic;
