import { Button, Form, Popconfirm } from "antd";
import { useEffect, useRef, useState } from "react";
import { EditableCell, EditableRow } from "./EditableComponent";
import MainServices from "services/MainServices";
import { formDataUtils, log } from "values/Utilitas";

const Logic = () => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
              type="link"
              onClick={() => {
                idRef.current = record.id;
                const code_company = record.code_company.split(",");
                setIsEdit(true);
                const nRecord = {
                  ...record,
                  code_company,
                };
                log({ nRecord });
                form.setFieldsValue(nRecord);
                onOpenModal();
              }}
            >
              Edit
            </Button>

            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <Button type="link">Delete</Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

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
        handleSave,
      }),
    };
  });

  useEffect(() => {
    onGetUser();
  }, []);

  const onGetUser = async () => {
    try {
      const url = `users`;
      const { data } = await MainServices.get(url);
      log("data.data", data.data.data);
      setDataSource(data.data.data);
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
      log({ values });

      if (isEdit) {
        const params = {
          ...values,
          code_company: values.code_company.toString(),
          id: idRef.current,
        };

        log({ params });

        // const formData = formDataUtils(params);

        const url = `users`;
        await MainServices.update(url, params);
      } else {
        const params = {
          ...values,
          code_company: values.code_company.toString(),
        };

        log({ params });

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

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  return {
    value: {
      dataSource,
      columns,
      components,
      openModal,
      form,
      isEdit,
    },
    func: {
      onOpenModal,
      onCloseModal,
      onActionUser,
    },
  };
};

export default Logic;
