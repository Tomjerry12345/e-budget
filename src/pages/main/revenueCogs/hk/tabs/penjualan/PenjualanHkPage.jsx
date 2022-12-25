import { Typography } from "antd";
import { useLocation } from "react-router-dom";
import FilterComponent from "../../../../../../component/filter/FilterComponent";
import PenjualanHkLogic from "./PenjualanHkLogic";
import TablePotonganComponent from "../../../component/TablePotonganComponent";
import ChildRevenueCogsComponent from "../../../component/ChildRevenueCogsComponent";
import { log, slicing } from "../../../../../../values/Utilitas";

const PenjualanHkPage = () => {
  const { value, func } = PenjualanHkLogic();

  const location = useLocation();

  const path = slicing(location.pathname, "/", 3);

  const data1 = [
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
  ];

  const codeCompany = `${value.filterCompany.title} (${value.filterCompany.code})`;

  log("data", value.dataColumnInput);

  return (
    <>
      <FilterComponent codeCompany={codeCompany} type={2} isCodeProduct={false} isCodeProject={path === "bju" ? true : false} form={value.form} onFinish={func.onFinish} disabled={true} keyCodeProject={path === "bju" ? "BJU" : null} />

      {data1.map((val) => (
        <>
          <Typography.Text className="title">{val.title}</Typography.Text>
          {/* {val.name === "listPotongan" ? <TablePotonganComponent value={value} name={val.name} /> : <ChildRevenueCogsComponent className="child-revenue" value={value[val.name]} name={val.name} />} */}
          {val.name === "listPotongan" ? <TablePotonganComponent value={value} name={val.name} /> : <ChildRevenueCogsComponent value={value} name={val.name} />}
        </>
      ))}
    </>
  );
};

export default PenjualanHkPage;
