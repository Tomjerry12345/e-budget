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

export default PenjualanBkPage;
