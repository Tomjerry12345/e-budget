import { Typography } from "antd";
import ChildRevenueCogsComponent from "../ChildRevenueCogsComponent";
import LainRevenueCogsLogic from "./LainRevenueCogsLogic";
import FilterComponent from "../../../../../component/filter/FilterComponent";
import { useLocation } from "react-router-dom";
import { slicing } from "../../../../../values/Utilitas";

const LainRevenueCogsPage = () => {
  const { value, func } = LainRevenueCogsLogic();

  const location = useLocation();

  const path = slicing(location.pathname, "/", 3);

  const data1 = {
    "Revenue & COGS HK": [
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
    ],
    "Revenue & COGS KIU": [
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
    ],
    "Revenue & COGS BTS": [
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
    ],
    "Revenue & COGS KIA": [
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
    ],

    "Revenue & COGS BJU": [
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
    ],
    "Revenue & COGS BLT": [
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
    ],
    "Revenue & COGS BLU": [
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
    ],
    "Revenue & COGS BK": [
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
    ],
    "Revenue & COGS BSU": [
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
    ],
    "Revenue & COGS BSB": [
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
    ],
    "Revenue & COGS KIK": [
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
    ],
    "Revenue & COGS IKP": [
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
    ],
    "Revenue & COGS BAND": [
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
          <ChildRevenueCogsComponent className="child-revenue" value={value} name={val.name} />
        </>
      ))}
    </>
  );
};

export default LainRevenueCogsPage;