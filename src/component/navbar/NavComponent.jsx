import { Layout, Menu } from "antd";

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import GroupIcon from "@mui/icons-material/Group";

import logo from "../../assets/img/logo.png";

import "./NavStyles.scss";
import { UserOutlined } from "@ant-design/icons";
import { getLocal } from "../../values/Utilitas";

const { Sider } = Layout;

const NavComponent = ({ func, value }) => {
  const isClickedMenu = (index) => {
    const iMenu = value.isListMenuActivated[index];
    if (iMenu === 0) return "notSelected";
    else if (iMenu === 1) return "selected";
    else return "open";
  };

  return (
    <Sider
      collapsed={true}
      collapsedWidth={84}
      style={{
        height: "100vh",
      }}
    >
      <Menu
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(4.31deg, #008041 71.9%, #17C770 107.48%)",
          height: "100%",
        }}
        className="menuNav"
        triggerSubMenuAction="click"
        onClick={({ _, key }) => {
          let split = key.split("-");
          func.onClickedMenu(parseInt(split[0]), "menu", "", split[1]);
        }}
      >
        <Menu.Item key={100} disabled>
          <img
            src={logo}
            style={{
              width: "61px",
              margin: "20px 0px 16px",
            }}
            // key={100}
            alt=""
          />
        </Menu.Item>

        <Menu.Item key={200} disabled>
          <h1
            className="titleMenu"
            // key={200}
          >
            Menu
          </h1>
        </Menu.Item>

        <Menu.Item
          key={0}
          className={`menuItem ${isClickedMenu(0)}`}
          icon={<GridViewRoundedIcon className={`colorIcon ${isClickedMenu(0)}`} />}
          title="dashboard"
        >
          Dashboard
        </Menu.Item>

        {getLocal("user_group") === "hc" ? null : (
          <Menu.Item
            key={"1-Revenue & COGS"}
            className={`menuItem ${isClickedMenu(1)}`}
            icon={<InsertChartOutlinedIcon className={`colorIcon ${isClickedMenu(1)}`} />}
          >
            Revenue & COGS
          </Menu.Item>
        )}

        {getLocal("user_group") === "hc" ? null : (
          <Menu.Item
            key={"2-Opex"}
            className={`menuItem ${isClickedMenu(2)}`}
            icon={
              <AssignmentTurnedInOutlinedIcon className={`colorIcon ${isClickedMenu(2)}`} />
            }
          >
            Opex
          </Menu.Item>
        )}

        {getLocal("user_group") === "hc" ? null : (
          <Menu.Item
            key={"3-Capex"}
            className={`menuItem ${isClickedMenu(3)}`}
            icon={<ArchiveOutlinedIcon className={`colorIcon ${isClickedMenu(3)}`} />}
          >
            Capex
          </Menu.Item>
        )}

        {getLocal("user_group") === "hc" || getLocal("user_group") === "superadmin" ? (
          <Menu.Item
            key={"4-MPP"}
            className={`menuItem ${isClickedMenu(4)}`}
            icon={
              <SupervisedUserCircleOutlinedIcon className={`colorIcon ${isClickedMenu(4)}`} />
            }
          >
            MPP
          </Menu.Item>
        ) : null}

        {getLocal("user_group") === "hc" ? null : (
          <Menu.Item
            key={"5-Others"}
            className={`menuItem ${isClickedMenu(5)}`}
            icon={<ContentPasteOutlinedIcon className={`colorIcon ${isClickedMenu(5)}`} />}
          >
            Others
          </Menu.Item>
        )}

        <Menu.Item
          key={"6-Report"}
          className={`menuItem ${isClickedMenu(6)}`}
          icon={<SummarizeOutlinedIcon className={`colorIcon ${isClickedMenu(6)}`} />}
        >
          Report
        </Menu.Item>

        {getLocal("user_group") === "superadmin" ? (
          <>
            <Menu.Item
              key={"7-Master COA"}
              className={`menuItem ${isClickedMenu(7)}`}
              icon={<Inventory2OutlinedIcon className={`colorIcon ${isClickedMenu(7)}`} />}
              // onClick={func.onClickedMenu}
            >
              Master COA
            </Menu.Item>
            <Menu.Item
              key={"9-Management User"}
              className={`menuItem ${isClickedMenu(9)}`}
              icon={<GroupIcon className={`colorIcon ${isClickedMenu(9)}`} />}
              // onClick={func.onClickedMenu}
            >
              Management User
            </Menu.Item>
          </>
        ) : null}

        <Menu.Item
          key={"8-Akun"}
          className={`menuItem ${isClickedMenu(8)}`}
          icon={<UserOutlined className={`colorIcon ${isClickedMenu(8)}`} />}
          // onClick={func.onClickedMenu}
        >
          Akun
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default NavComponent;
