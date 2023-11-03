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
  const [record, setRecord] = useState();

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
      title: "NIK",
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
    setRecord();
    form.resetFields();
  };

  const onSingleOrMultipleSelect = (values) => {
    return typeof values === "object" ? values.toString() : values?.split(" ")[0];
  };

  const onActionUser = async (values) => {
    try {
      log({ values });
      const username = values.nik;
      const email = values.inputemail;
      const password = values.inputpassword;

      delete values.nik;
      delete values.inputemail;
      delete values.inputpassword;
      delete values.search;

      const codeCompany = onSingleOrMultipleSelect(values.code_company);
      const codeLocation = onSingleOrMultipleSelect(values.code_location);
      const codeDepartment = onSingleOrMultipleSelect(values.code_department);

      log({ codeCompany });
      log({ codeLocation });
      log({ codeDepartment });

      if (isEdit) {
        const params = {
          ...values,
          username,
          email,
          password,
          code_company: codeCompany === undefined ? null : codeCompany,
          code_location: codeLocation === undefined ? null : codeLocation,
          code_department: codeDepartment === undefined ? null : codeDepartment,
          id: idRef.current,
        };

        const url = `users`;
        await MainServices.update(url, params);
      } else {
        const params = {
          ...values,
          email,
          username,
          password,
          code_company: codeCompany === undefined ? null : codeCompany,
          code_location: codeLocation === undefined ? null : codeLocation,
          code_department: codeDepartment === undefined ? null : codeDepartment,
        };

        const formData = formDataUtils(params);

        const url = `users`;
        const res = await MainServices.post(url, formData);
        log({ res });
      }

      onGetUser();
      onCloseModal();
    } catch (error) {
      log({ error });
      // Tangani error jika ada
      // console.error(`Error fetching data`, error);
      showNotif(400, `${error.response.data.responseDescription}`);
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
    let code_location = undefined;
    let code_department = undefined;

    const nik = record.username;

    if (record.user_group === "sbu") {
      code_company = record.code_company;
    } else if (record.user_group === "subholding") {
      code_company = record.code_company.split(",");
    }

    if (record.code_location !== null) {
      code_location = record.code_location.split(",");
    }

    if (record.code_department !== null) {
      code_department = record.code_department.split(",");
    }

    const nRecord = {
      ...record,
      inputemail: record.email,
      nik,
      code_company,
      code_location,
      code_department,
    };

    setRecord(nRecord);

    form.setFieldsValue(nRecord);
    setIsEdit(true);

    idRef.current = record.id;
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
      if (values.search === "" || values.search === undefined) {
        onGetUser();
        return;
      }
      let url = `users/search`;
      const { data } = await MainServices.get(url, {
        keyword: values.search,
      });
      setDataSource(data.data);
      setTotalData(data.total);
    } catch (error) {
      showNotif(400, error.message);
      console.error(`Error fetching data`, error);
    }
  };

  const onReset = () => {
    form.resetFields();
    form.submit();
  };

  return {
    value: {
      dataSource,
      columns,
      openModal,
      form,
      isEdit,
      totalData,
      record,
    },
    func: {
      onOpenModal,
      onCloseModal,
      onActionUser,
      onSearch,
      onReset,
    },
  };
};

export default Logic;
