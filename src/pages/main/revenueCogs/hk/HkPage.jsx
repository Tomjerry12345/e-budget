import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../OthersRevenueCogsStyle.scss";
import { Form, Tabs } from "antd";
import HeaderComponent from "component/header/HeaderComponent";
import { log } from "values/Utilitas";
import FilterComponent from "component/filter/FilterComponent";
import { useDispatch, useSelector } from "react-redux";
import { actionRevenue } from "redux/action/action.reducer";
import { getPerusahaan } from "values/Constant";

const HkPage = () => {
  const [key, setKey] = useState(1);
  const [form] = Form.useForm();
  const [isMoveTabs, setIsMoveTabs] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { clicked } = useSelector((state) => state.revenue);
  const dataGlobalRedux = useSelector((state) => state.data);

  const location = useLocation();
  const split = location.pathname.split("/");
  const q = split[split.length - 2];

  log({ q });

  const perusahaan = getPerusahaan(q);

  useEffect(() => {
    form.setFieldsValue({
      code_company: `${perusahaan.code} - ${perusahaan.description}`,
      code_product: null,
      code_location: null,
      code_dept: null,
      code_icp: null,
      code_project: null,
      periode: null,
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
    // let fCodeProduct = code_product.split(" ");
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

    log({ q });

    if (key === 1) {
      navigate(
        `/main/revenue-cogs/${q}/penjualan?code_company=${fCodeCompany}&code_location=${fCodeLocation}&code_dept=109&code_icp=${fCodeIcp}&code_project=${fCodeProject}&periode=${fPeriode}`
      );
    } else if (key === 2) {
      navigate(
        `/main/revenue-cogs/${q}/hpplain?code_company=${fCodeCompany}&code_location=${fCodeLocation}&code_dept=109&code_icp=${fCodeIcp}&code_project=${fCodeProject}&periode=${fPeriode}`
      );
    }
    dispatch(
      actionRevenue({
        clicked: !clicked,
      })
    );
  };

  return (
    <>
      <HeaderComponent
        type="revenue-perusahaan"
        listMenuImport={[
          "Stok Awal",
          "Asumsi unit beli",
          "Harga beli per unit",
          "Asumsi unit jual",
          "Penjualan",
        ]}
        disabledImportExport={dataGlobalRedux.sizeDataRevenue === 0}
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
              navigate(`/main/revenue-cogs/${q}/penjualan`);
            } else {
              navigate(`/main/revenue-cogs/${q}/hpplain`);
            }

            setIsMoveTabs(!isMoveTabs);
          }}
        />
        <FilterComponent
          onFinish={onFinish}
          isCodeIcp
          isCodeProject
          isCodeProduct={false}
          type="input"
          codeCompany={perusahaan.code}
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

export default HkPage;
