import { Typography } from "antd";
import ChildRevenueCogsComponent from "../../../component/ChildRevenueCogsComponent";
import LainBluLogic from "./LainBluLogic";

const LainBluPage = () => {
  const { value, func } = LainBluLogic();

  const data1 = [
    {
      title: "Pendapatan Operasional Lainnya",
      name: "listPendapatanLain",
    },
    {
      title: "HPP Variable",
      name: "listHppVariable",
    },
    {
      title: "Hpp Lainnya",
      name: "listHppLain",
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
          <ChildRevenueCogsComponent
            className="child-revenue"
            value={value}
            name={val.name}
          />
        </>
      ))}
    </>
  );
};

export default LainBluPage;
