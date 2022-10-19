import { Tabs } from "antd";
import ChildRevenueCogsComponent from "./component/ChildRevenueCogsComponent";
import ParentRevenueCogsComponent from "./component/ParentRevenueCogsComponent";
import OthersRevenueCogsLogic from "./OthersRevenueCogsLogic";
import "./OthersRevenueCogsStyle.scss";

const OthersRevenueCogsPage = () => {
  const { value, func } = OthersRevenueCogsLogic();

  const tabItemChild = [
    [
      {
        key: 1,
        label: "Asumsi unit jual",
        children: (
          <ChildRevenueCogsComponent
            value={value}
            data={value.dataColumnInput.listAsumsi}
          />
        ),
      },
      {
        key: 2,
        label: "Harga jual per unit",
        children: (
          <ChildRevenueCogsComponent
            value={value}
            data={value.dataColumnInput.listHarga}
          />
        ),
      },
      {
        key: 3,
        label: "Penjualan",
        children: (
          <ChildRevenueCogsComponent
            value={value}
            data={value.dataColumnInput.listPenjualan}
          />
        ),
      },
      {
        key: 4,
        label: "Potongan penjualan",
        children: (
          <ChildRevenueCogsComponent
            value={value}
            data={value.dataColumnInput.listPotongan}
          />
        ),
      },
    ],
    [
      {
        key: 1,
        label: "Pendapatan operasional lainnya",
        // children: <ParentRevenueCogsComponent value={value} func={func} />,
      },
      {
        key: 2,
        label: "HPP Variable",
        // children: `Content of card tab ${id}`,
      },
      {
        key: 3,
        label: "HPP Lainnya",
        // children: `Content of card tab ${id}`,
      },
    ],
  ];

  const tabItemParent = [
    {
      key: 1,
      label: "Input Penjualan dan Potongan penjualan",
      children: (
        <ParentRevenueCogsComponent
          value={value}
          func={func}
          // child={tabItemChild[0]}
          data={value.dataColumnInput}
        />
      ),
    },
    {
      key: 2,
      label: "Input HPP dan pendapatan lainnya",
      children: (
        <ParentRevenueCogsComponent
          value={value}
          func={func}
          data={value.dataColumnInput}
          // child={tabItemChild[1]}
        />
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
      />
    </div>
  );
};

export default OthersRevenueCogsPage;
