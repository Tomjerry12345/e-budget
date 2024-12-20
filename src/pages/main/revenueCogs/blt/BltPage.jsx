/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../OthersRevenueCogsStyle.scss";
import { Form, Tabs } from "antd";
import HeaderComponent from "component/header/HeaderComponent";
import FilterComponent from "component/filter/FilterComponent";
import { useDispatch, useSelector } from "react-redux";
import { actionRevenue } from "redux/action/action.reducer";
import { getPerusahaan, keyRevenueTab, urlRevenue } from "values/Constant";
import { getLocal } from "values/Utilitas";
import { actionData } from "redux/data-global/data.reducer";

const BltPage = () => {
  const [key, setKey] = useState(1);
  const [form] = Form.useForm();
  const [isMoveTabs, setIsMoveTabs] = useState(false);
  const [listMenu, setListMenu] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataGlobalRedux = useSelector((state) => state.data);
  const { filterValuesPenjualan, filterValuesHpplain } = useSelector((state) => state.revenue);

  const location = useLocation();
  const split = location.pathname.split("/");
  const q = split[split.length - 2];

  const perusahaan = getPerusahaan(q);

  const userGroup = getLocal("user_group");
  const code_location = getLocal("code_location");
  const code_dept = getLocal("code_department");

  useEffect(() => {
    if (key === 1) {
      if (filterValuesPenjualan === undefined) {
        form.setFieldsValue({
          code_company: `${perusahaan.code} - ${perusahaan.description}`,
          code_product: null,
          code_location:
            userGroup === "superadmin" ? null : code_location !== "null" ? code_location : null,
          code_dept:
            userGroup === "superadmin" ? null : code_dept !== "null" ? code_dept : null,
          code_icp: null,
          code_project: null,
          periode: null,
        });
      } else {
        form.setFieldsValue(filterValuesPenjualan);
      }
      navigate(`/main/revenue-cogs/${q}/penjualan`);
    } else {
      if (filterValuesHpplain === undefined) {
        form.setFieldsValue({
          code_company: `${perusahaan.code} - ${perusahaan.description}`,
          code_product: null,
          code_location:
            userGroup === "superadmin" ? null : code_location !== "null" ? code_location : null,
          code_dept:
            userGroup === "superadmin" ? null : code_dept !== "null" ? code_dept : null,
          code_icp: null,
          code_project: null,
          periode: null,
        });
      } else {
        form.setFieldsValue(filterValuesHpplain);
      }
    }

    const l = urlRevenue[key === 1 ? keyRevenueTab[0] : keyRevenueTab[1]].filter(
      (e) => e.file !== undefined
    );
    setListMenu(l);
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
      dispatch(
        actionRevenue({
          filterValuesPenjualan: values,
          filterValuesHpplain: filterValuesHpplain ?? undefined,
        })
      );

      navigate(`/main/revenue-cogs/${q}/penjualan`);
    } else if (key === 2) {
      dispatch(
        actionRevenue({
          filterValuesPenjualan: filterValuesPenjualan ?? undefined,
          filterValuesHpplain: values,
        })
      );
      navigate(`/main/revenue-cogs/${q}/hpplain`);
    }
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
              dispatch(
                actionData({ sizeDataRevenue: filterValuesPenjualan === undefined ? 0 : 1 })
              );
              navigate(`/main/revenue-cogs/${q}/penjualan`);
            } else {
              dispatch(
                actionData({ sizeDataRevenue: filterValuesHpplain === undefined ? 0 : 1 })
              );
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
          typeFilter="hpp-pendapatan"
        />

        <div style={{ marginTop: 16 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default BltPage;
