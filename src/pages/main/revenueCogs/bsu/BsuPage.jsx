import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../OthersRevenueCogsStyle.scss";
import { Form, Tabs } from "antd";
import HeaderComponent from "component/header/HeaderComponent";
import FilterComponent from "component/filter/FilterComponent";
import { useDispatch, useSelector } from "react-redux";
import { getPerusahaan, keyRevenueTab, urlRevenue } from "values/Constant";
import { actionRevenue } from "redux/action/action.reducer";

const BsuPage = () => {
  const [key, setKey] = useState(1);
  const [form] = Form.useForm();
  const [isMoveTabs, setIsMoveTabs] = useState(false);
  const [listMenu, setListMenu] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataGlobalRedux = useSelector((state) => state.data);

  const location = useLocation();
  const split = location.pathname.split("/");
  const q = split[split.length - 2];

  const perusahaan = getPerusahaan(q);

  useEffect(() => {
    if (key === 1) {
      navigate(`/main/revenue-cogs/${q}/penjualan`);
    }
    form.setFieldsValue({
      code_company: `${perusahaan.code} - ${perusahaan.description}`,
      code_product: null,
      code_location: null,
      code_dept: null,
      code_icp: null,
      // code_project: null,
      periode: null,
    });
    const l = urlRevenue[key === 1 ? keyRevenueTab[0] : keyRevenueTab[1]].filter(
      (e) => e.file !== undefined
    );
    setListMenu(l);
    dispatch(
      actionRevenue({
        filterValues: null,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (key === 1) {
      navigate(`/main/revenue-cogs/${q}/penjualan`);
    } else if (key === 2) {
      navigate(`/main/revenue-cogs/${q}/hpplain`);
    }
    dispatch(
      actionRevenue({
        filterValues: values,
      })
    );
  };

  return (
    <>
      <HeaderComponent
        type="revenue-perusahaan"
        listMenuImport={listMenu}
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
          isCodeProduct={key !== 1}
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

export default BsuPage;
