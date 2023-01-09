import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "../OthersRevenueCogsStyle.scss";
import { Form, Tabs } from "antd";
import HeaderComponent from "../../../../component/header/HeaderComponent";
import { log } from "../../../../values/Utilitas";

const HkPage = () => {
  const [key, setKey] = useState(1);
  const [form] = Form.useForm();
  const [isClickFinish, setIsClickFinish] = useState(null);
  const [isMoveTabs, setIsMoveTabs] = useState(false);
  const [path, setPath] = useState("/main/revenue-cogs/hk/penjualan");

  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({
      code_company: `HK (311)`,
      code_location: null,
      code_dept: null,
      code_project: null,
    });
  }, [isMoveTabs]);

  const tabItemParent = [
    {
      key: 1,
      label: "Input Penjualan dan Potongan penjualan",
      // children: ,
    },
    {
      key: 2,
      label: "Input HPP dan pendapatan lainnya",
      // children: <Outlet />,
    },
  ];

  const onFinish = (values) => {
    log("filter", values);
    const { code_company, code_dept, code_location, code_product } = values;

    let fCodeCompany = code_company.replace(/[^0-9]/g, "");
    let fCodeLocation = code_location.replace(/[^0-9]/g, "");
    let fCodeDept = code_dept.replace(/[^0-9]/g, "");

    navigate(path, {
      state: {
        code_company: fCodeCompany,
        code_location: fCodeLocation,
        code_dept: fCodeDept,
      },
    });

    setIsClickFinish(false);
  };

  return (
    <>
      <HeaderComponent
        type="revenue-perusahaan"
        onFinish={onFinish}
        onChangeFilter={(set) => {
          set(isClickFinish);
        }}
        // onChangeLoadingUpload={(set, setImport) => {
        //   set(value.loadingUpload);

        //   if (value.uploadSucces === true) {
        //     setImport(false);
        //   }
        // }}
        // onUploadFile={func.onUploadFile}
        // accesFile={value}
        // downloadFile="file/capex.xlsx"
        // disabledImportExport={value.dataColumnInput.length <= 1}
        // onChangeSelect={func.onChangeTahun}
        codeCompany={311}
        form={form}
      />
      <div className="custom-root-layout">
        <Tabs
          className="custom-tabs"
          // defaultActiveKey="1"
          activeKey={key}
          type="card"
          // size={size}
          items={tabItemParent}
          onChange={(key) => {
            setKey(key);
            if (key === 1) {
              navigate(`/main/revenue-cogs/hk/penjualan`);
              setPath("/main/revenue-cogs/hk/penjualan");
              setIsMoveTabs(!isMoveTabs);
            } else {
              navigate(`/main/revenue-cogs/hk/hpplain`);
              setPath("/main/revenue-cogs/hk/hpplain");
              setIsMoveTabs(!isMoveTabs);
            }
          }}
        />
        <Outlet />
      </div>
    </>
  );
};

export default HkPage;
