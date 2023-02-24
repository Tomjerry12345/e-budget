import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../OthersRevenueCogsStyle.scss";
import { Form, Tabs } from "antd";
import HeaderComponent from "../../../../component/header/HeaderComponent";
import FilterComponent from "../../../../component/filter/FilterComponent";

const KiaPage = () => {
  const [key, setKey] = useState(1);
  const [form] = Form.useForm();

  const [isMoveTabs, setIsMoveTabs] = useState(false)

  // alert(location.pathname);

  const navigate = useNavigate();

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

  useEffect(() => {
    form.setFieldsValue({
      code_company: `241 - PT. Kalla Inti Karsa`,
      code_product: null,
      code_location: null,
      code_dept: null,
      code_icp: null,
      code_project: null,
      periode: null,
    });
  }, [isMoveTabs]);

  const onFinish = (values) => {
    const {
      code_company,
      code_dept,
      code_location,
      code_product,
      code_project,
      code_icp,
      periode,
    } = values;

    // alert("test");

    let fCodeCompany = code_company.split(" ");
    let fCodeLocation = code_location.split(" ");
    let fCodeDept = code_dept.split(" ");
    let fCodeIcp = code_icp.split(" ");
    let fCodeProject = code_project.split(" ");

    let fPeriode = periode.split(" ");

    fCodeCompany = fCodeCompany[0];
    fCodeLocation = fCodeLocation[0];
    fCodeDept = fCodeDept[0];
    fCodeIcp = fCodeIcp[0];
    fCodeProject = fCodeProject[0];
    fPeriode = fPeriode[0];

    if (key === 1) {
      navigate(
        `/main/revenue-cogs/kia/penjualan?code_company=${fCodeCompany}&code_location=${fCodeLocation}&code_dept=109&code_icp=${fCodeIcp}&code_project=${fCodeProject}&periode=${fPeriode}`
      );
    } else if (key === 2) {
      navigate(
        `/main/revenue-cogs/kia/hpplain?code_company=${fCodeCompany}&code_location=${fCodeLocation}&code_dept=109&code_icp=${fCodeIcp}&code_project=${fCodeProject}&periode=${fPeriode}`
      );
    }
  };

  return (
    <>
      <HeaderComponent
        type="revenue-perusahaan"
        onChangeFilter={(set) => {
          // set(isClickFinish);
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
        codeCompany={241}
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
              navigate(`/main/revenue-cogs/kia/penjualan`);
            } else {
              navigate(`/main/revenue-cogs/kia/hpplain`);
            }

            setIsMoveTabs(!isMoveTabs)
          }}
        />
        <FilterComponent
          onFinish={onFinish}
          isCodeIcp
          isCodeProject
          isCodeProduct={false}
          type="input"
          codeCompany={326}
          form={form}
          disabled
          typeCompany="static"
          variant="perusahaan"
        />
        <div style={{ marginTop: 16 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default KiaPage;
