import { Tabs } from "antd";
import { useState } from "react";
import ChildRevenueCogsComponent from "./component/ChildRevenueCogsComponent";
import LainRevenueCogsPage from "./component/hpplain/LainRevenueCogsPage";
import ParentRevenueCogsComponent from "./component/ParentRevenueCogsComponent";
import PenjualanRevenueCogsPage from "./component/penjualan/PenjualanRevenueCogsPage";
import OthersRevenueCogsLogic from "./OthersRevenueCogsLogic";
import "./OthersRevenueCogsStyle.scss";

const OthersRevenueCogsPage = () => {
  // const { value, func } = OthersRevenueCogsLogic();

  const [changeTabs, setChangeTabs] = useState(false);

  const tabItemParent = [
    {
      key: 1,
      label: "Input Penjualan dan Potongan penjualan",
      children: (
        // <ParentRevenueCogsComponent
        //   value={value}
        //   func={func}
        //   // child={tabItemChild[0]}
        //   data={value.dataColumnInput}
        //   tab="penjualan"
        // />
        <PenjualanRevenueCogsPage
          changeTabs={changeTabs}
          // setChangeTabs={setChangeTabs}
        />
      ),
    },
    {
      key: 2,
      label: "Input HPP dan pendapatan lainnya",
      children: (
        <LainRevenueCogsPage
          changeTabs={changeTabs}
          // setChangeTabs={setChangeTabs}
        />
        // <ParentRevenueCogsComponent
        //   value={value}
        //   func={func}
        //   data={value.dataColumnInput}
        //   tab="hpp"
        //   // child={tabItemChild[1]}
        // />
        // <PenjualanRevenueCogsPage />
      ),
    },
  ];

  return (
    <div className="custom-root-layout">
      <Tabs
        className="custom-tabs"
        defaultActiveKey="1"
        type="card"
        // size={size}
        items={tabItemParent}
        onChange={(key) => {
          alert("change");
          setChangeTabs(!changeTabs);
        }}
      />
    </div>
  );
};

export default OthersRevenueCogsPage;
