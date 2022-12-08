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
    hk: [
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
    kiu: [
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
    bts: [
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
    kia: [
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
    bju: [
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
    blt: [
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
    blu: [
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
    bk: [
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
    bsu: [
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
    bsb: [
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
    kik: [
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
    ikp: [
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
    band: [
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
