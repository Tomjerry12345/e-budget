import { Typography } from "antd";
import TablePotonganComponent from "../../../component/TablePotonganComponent";
import ChildRevenueCogsComponent from "../../../component/ChildRevenueCogsComponent";
import PenjualanBluLogic from "./PenjualanBluLogic";

const PenjualanBluPage = () => {
  const { value, func } = PenjualanBluLogic();

  const data1 = [
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

export default PenjualanBluPage;
