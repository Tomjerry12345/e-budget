import { Typography } from "antd";
import TablePotonganComponent from "../../../component/TablePotonganComponent";
import ChildRevenueCogsComponent from "../../../component/ChildRevenueCogsComponent";
import PenjualanBkLogic from "./PenjualanBkLogic";

const PenjualanBkPage = () => {
  const { value, func } = PenjualanBkLogic();

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

  return (
    <>
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

export default PenjualanBkPage;
