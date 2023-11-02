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
  const [heightTable, setHeightTable] = useState(window.innerHeight - 230);
  const [firstNumber, setFirstNumber] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();

  const idRef = useRef();

  const defaultColumns = [
    {
      title: "No",
      dataIndex: "no",
      width: "40px",
      fixed: "left",
      render: (item, record, index) => <>{index + firstNumber}</>,
    },
    {
      title: "NIK",
      dataIndex: "username",
      width: "100px",
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "230px",
    },
    {
      title: "Nama",
      dataIndex: "name",
      width: "200px",
    },
    {
      title: "User Group",
      dataIndex: "user_group",
      width: "90px",
    },
    {
      title: "Company",
      dataIndex: "code_company",
      width: "90px",
    },
    {
      title: "Location",
      dataIndex: "code_location",
      width: "90px",
    },
    {
      title: "Department",
      dataIndex: "code_department",
      width: "100px",
    },
    {
      title: "Action",
      dataIndex: "operation",
      width: "260px",
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

  const onGetUser = async (page=1) => {
    setLoading(true)
    try {
      let url = `users?page=${page}`;
      const { data } = await MainServices.get(url);
      setDataSource(data.data.data);
      setTotalData(data.data.total);
      setLoading(false)
  } catch (error) {
      console.error(`Error fetching data`, error);
      setLoading(false)
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
      log("type", typeof values.code_company);
      const codeCompany = onSingleOrMultipleSelect(values.code_company);
      const codeLocation = onSingleOrMultipleSelect(values.code_location);
      const codeDepartment = onSingleOrMultipleSelect(values.code_department);
      delete values.nik;
      delete values.inputemail;
      delete values.inputpassword;
      delete values.search;

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
        // const params = {
        //   ...values,
        //   email,
        //   username,
        //   password,
        //   code_company:
        //     values.code_company === undefined
        //       ? null
        //       : values.code_company.toString() === ""
        //       ? null
        //       : codeCompany[0],
        //   code_location: codeLocation?.[0] ?? null,
        //   code_department: codeDepartment?.[0] ?? null,
        // };

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

    log({ record });

    if (record.user_group === "sbu") {
      code_company = record.code_company;
    } else if (record.user_group === "subholding") {
      code_company = record.code_company.split(",");
    }

    code_location = record.code_location.split(",");
    code_department = record.code_department.split(",");

    log({ code_location });

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

  const handleResizeTable = () => {
    setHeightTable(window.innerHeight - 230)
  }

  const pageChange = (p) => {
    setFirstNumber((25 * (p - 1)) + 1)
    setPage(p)
    onGetUser(p)
  }

  return {
    value: {
      dataSource,
      columns,
      openModal,
      form,
      isEdit,
      totalData,
      record,
      heightTable,
      page,
      loading,
    },
    func: {
      onOpenModal,
      onCloseModal,
      onActionUser,
      onSearch,
      onReset,
      handleResizeTable,
      pageChange,
    },
  };
};

export default Logic;
