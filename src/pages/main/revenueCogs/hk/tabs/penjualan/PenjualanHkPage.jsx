import { Typography } from "antd";
import FilterComponent from "../../../../../../component/filter/FilterComponent";
import PenjualanHkLogic from "./PenjualanHkLogic";
import TablePotonganComponent from "../../../component/TablePotonganComponent";
import ChildRevenueCogsComponent from "../../../component/ChildRevenueCogsComponent";
import HeaderComponent from "../../../../../../component/header/HeaderComponent";

const PenjualanHkPage = () => {
  const { value, func } = PenjualanHkLogic();

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

  return (
    <>
      {/* <FilterComponent
        codeCompany={codeCompany}
        type={2}
        isCodeProduct={false}
        form={value.form}
        onFinish={func.onFinish}
        disabled={true}
      /> */}

      {data1.map((val) => (
        <>
          <Typography.Text className="title">{val.title}</Typography.Text>
          {val.name === "listPotongan" ? (
            <TablePotonganComponent value={value} name={val.name} />
          ) : (
            <ChildRevenueCogsComponent value={value} name={val.name} />
          )}
        </>
      ))}
    </>
  );
};

export default PenjualanHkPage;
