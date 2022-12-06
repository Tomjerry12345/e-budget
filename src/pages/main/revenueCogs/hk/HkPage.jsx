import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "../OthersRevenueCogsStyle.scss";
import { Form, Tabs } from "antd";

const HkPage = () => {
  const [key, setKey] = useState(1);

  let params = useParams();

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
            navigate(`/main/revenue-cogs/Revenue & COGS HK/penjualan`);
          } else {
            navigate(`/main/revenue-cogs/Revenue & COGS HK/hpplain`);
          }
        }}
      />
      <Outlet />
    </div>
  );
};

export default HkPage;
