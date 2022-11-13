import { Form, Select, Button, Tabs, Typography } from "antd";
import { Card } from "@mui/material";
import ChildRevenueCogsComponent from "./ChildRevenueCogsComponent";
import { useParams } from "react-router-dom";
import { Input } from "antd";
import PenjualanRevenueCogsPage from "./penjualan/PenjualanRevenueCogsPage";
import LainRevenueCogsPage from "./hpplain/LainRevenueCogsPage";

const ParentRevenueCogsComponent = ({ tabs, form }) => {
  return <>{tabs === 1 ? <PenjualanRevenueCogsPage form={form} /> : <LainRevenueCogsPage form={form} />}</>;
};

export default ParentRevenueCogsComponent;
