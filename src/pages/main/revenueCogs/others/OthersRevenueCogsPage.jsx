import { Form, Tabs } from "antd";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import LainRevenueCogsPage from "./component/hpplain/LainRevenueCogsPage";
import ParentRevenueCogsComponent from "./component/ParentRevenueCogsComponent";
import PenjualanRevenueCogsPage from "./component/penjualan/PenjualanRevenueCogsPage";
import "./OthersRevenueCogsStyle.scss";

const OthersRevenueCogsPage = () => {
  const [key, setKey] = useState(1);

  let params = useParams();

  const itemPage = params.item;

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

  return (
    <div className="custom-root-layout">
      <Tabs
        className="custom-tabs"
        defaultActiveKey="1"
        activeKey={key}
        type="card"
        // size={size}
        items={tabItemParent}
        onChange={(key) => {
          setKey(key);
          if (key === 1) {
            navigate(`/main/revenue-cogs/others/${itemPage}/penjualan`);
          } else {
            navigate(`/main/revenue-cogs/others/${itemPage}/hpplain`);
          }

          // form.setFieldsValue({
          //   code_location: null,
          //   code_dept: null,
          // });
        }}
      />
      <Outlet />
    </div>
  );
};

export default OthersRevenueCogsPage;
