import { Pagination, Table } from "antd";
import Logic from "./Logic";
import "./style.scss";
import ModalManagementUser from "./modal/ModalManagementUser";
import { Box } from "@mui/material";
import HeaderProfile from "./header/HeaderProfile";

const ProfilePage = () => {
  const { value, func } = Logic();

  return (
    <div className="style-management-user">
      <HeaderProfile titleHeader="Profile" />
      <div className="custom-root-layout"></div>
    </div>
  );
};

export default ProfilePage;
