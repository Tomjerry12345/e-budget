import { Typography } from "antd";
// import ChildRevenueCogsComponent from "./ChildRevenueCogsComponent";
// import { Input } from "antd";
import PenjualanRevenueCogsLogic from "./PenjualanRevenueCogsLogic";
import ChildRevenueCogsComponent from "../ChildRevenueCogsComponent";
import TablePotonganComponent from "../TablePotonganComponent";
import { useLocation } from "react-router-dom";
import { slicing } from "../../../../../values/Utilitas";
import FilterComponent from "../../../../../component/filter/FilterComponent";

const PenjualanRevenueCogsPage = ({ tabsKey }) => {
  const { value, func } = PenjualanRevenueCogsLogic({ tabsKey });

  const location = useLocation();

  const path = slicing(location.pathname, "/", 3);

  console.log("path", path);

  const data1 = {
    "Revenue & COGS HK": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
      {
        title: "Harga Jual Per Unit",
        name: "listHarga",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
    ],
    "Revenue & COGS KIU": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
      {
        title: "Harga Jual Per Unit",
        name: "listHarga",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
      {
        title: "List Disc",
        name: "listDisc",
      },
    ],
    "Revenue & COGS BTS": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
      {
        title: "Harga Jual Per Unit",
        name: "listHarga",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
    ],
    "Revenue & COGS KIA": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
      {
        title: "Harga Jual Per Unit",
        name: "listHarga",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
    ],
    "Revenue & COGS BJU": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
      {
        title: "Harga Jual Per Unit",
        name: "listHarga",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
    ],
    "Revenue & COGS BLT": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
      {
        title: "List Volume",
        name: "listVolume",
      },
      {
        title: "Harga Jual Per Unit",
        name: "listHarga",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
    ],
    "Revenue & COGS BLU": [
      {
        title: "Harga Jual Per Unit",
        name: "listHarga",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
      {
        title: "List Volume",
        data: "listVolume",
      },
    ],
    "Revenue & COGS BK": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
    ],
    "Revenue & COGS BSU": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
    ],
    "Revenue & COGS BSB": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
      {
        title: "Harga Jual Per Unit",
        name: "listHarga",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
    ],
    "Revenue & COGS KIK": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
      {
        title: "Harga Jual Per Unit",
        name: "listHarga",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
    ],
    "Revenue & COGS IKP": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
      {
        title: "Harga Jual Per Unit",
        name: "listHarga",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
    ],
    "Revenue & COGS BAND": [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
      {
        title: "Harga Jual Per Unit",
        name: "listHarga",
      },
      {
        title: "Penjualan",
        name: "listPenjualan",
      },
      {
        title: "Potongan Penjualan",
        name: "listPotongan",
      },
    ],
  };

  const codeCompany = `${value.filterCompany.title} (${value.filterCompany.code})`;

  return (
    <>
      <FilterComponent
        codeCompany={codeCompany}
        type={2}
        isCodeProduct={false}
        isCodeProject={path === "Revenue & COGS BJU" ? true : false}
        form={value.form}
        onFinish={func.onFinish}
        disabled={true}
        keyCodeProject={path === "Revenue & COGS BJU" ? "BJU" : null}
      />

      {data1[path].map((val) => (
        <>
          <Typography.Text className="title">{val.title}</Typography.Text>
          {val.name === "listPotongan" ? <TablePotonganComponent value={value} name={val.name} /> : <ChildRevenueCogsComponent className="child-revenue" value={value} name={val.name} />}
        </>
      ))}
    </>
  );
};

export default PenjualanRevenueCogsPage;
