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
    hk: [
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
    kiu: [
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
    bts: [
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
    kia: [
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
    bju: [
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
    blt: [
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
    blu: [
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
    bk: [
      {
        title: "Asumsi Unit Jual",
        name: "listAsumsi",
      },
    ],
    bsu: [
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
    bsb: [
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
    kik: [
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
    ikp: [
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
    band: [
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
      <FilterComponent codeCompany={codeCompany} type={2} isCodeProduct={false} isCodeProject={path === "bju" ? true : false} form={value.form} onFinish={func.onFinish} disabled={true} keyCodeProject={path === "bju" ? "BJU" : null} />

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
