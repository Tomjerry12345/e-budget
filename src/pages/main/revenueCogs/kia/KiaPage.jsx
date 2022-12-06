import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../OthersRevenueCogsStyle.scss";
import { Tabs } from "antd";

const KiaPage = () => {
  const [key, setKey] = useState(1);

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

  return (
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
            navigate(`/main/revenue-cogs/Revenue & COGS KIU/penjualan`);
          } else {
            navigate(`/main/revenue-cogs/Revenue & COGS KIU/hpplain`);
          }
        }}
      />
      <Outlet />
    </div>
  );
};

export default KiaPage;
