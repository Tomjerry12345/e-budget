import { Image, Layout, Menu, Modal, Segmented, Typography } from "antd";

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import logo from "../../assets/img/logo.png";

import "./NavStyles.scss";

const { Sider } = Layout;
const { Text } = Typography;

const NavComponent = ({ func, value }) => {
  const isClickedMenu = (index) => {
    const iMenu = value.isListMenuActivated[index];
    if (iMenu === 0) return "notSelected";
    else if (iMenu === 1) return "selected";
    else return "open";
  };

  return (
    <Sider collapsed={true} collapsedWidth={84}>
      <Menu
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
        className="menuNav"
        triggerSubMenuAction="click"
        onClick={({ _, key }) => {
          func.onClickedMenu(key, "menu");
        }}
      >
        <img
          src={logo}
          style={{
            width: "61px",
            margin: "20px 0px 16px",
          }}
          key={100}
        />
        <h1 className="titleMenu" key={200}>
          Menu
        </h1>
        {/* 0 */}
        <Menu.Item key={0} className={`menuItem ${isClickedMenu(0)}`} icon={<GridViewRoundedIcon className={`colorIcon ${isClickedMenu(0)}`} />} title="dashboard">
          Dashboard
        </Menu.Item>
        {/* 1 */}
        <Menu.Item key={1} className={`menuItem ${isClickedMenu(1)}`} icon={<InsertChartOutlinedIcon className={`colorIcon ${isClickedMenu(1)}`} />}>
          Revenue & COGS
        </Menu.Item>
        {/* 2 */}
        <Menu.Item key={2} className={`menuItem ${isClickedMenu(2)}`} icon={<AssignmentTurnedInOutlinedIcon className={`colorIcon ${isClickedMenu(2)}`} />}>
          Opex
        </Menu.Item>
        {/* 3 */}
        <Menu.Item key={3} className={`menuItem ${isClickedMenu(3)}`} icon={<ArchiveOutlinedIcon className={`colorIcon ${isClickedMenu(3)}`} />}>
          Capex
        </Menu.Item>
        {/* 4 */}
        <Menu.Item key={4} className={`menuItem ${isClickedMenu(4)}`} icon={<SupervisedUserCircleOutlinedIcon className={`colorIcon ${isClickedMenu(4)}`} />}>
          MPP
        </Menu.Item>
        {/* 5 */}
        <Menu.Item key={5} className={`menuItem ${isClickedMenu(5)}`} icon={<ContentPasteOutlinedIcon className={`colorIcon ${isClickedMenu(5)}`} />}>
          Others
        </Menu.Item>
        {/* 6 */}
        <Menu.Item key={6} className={`menuItem ${isClickedMenu(6)}`} icon={<SummarizeOutlinedIcon className={`colorIcon ${isClickedMenu(6)}`} />}>
          Report
        </Menu.Item>
        {/* 7 */}
        <Menu.Item
          key={7}
          className={`menuItem ${isClickedMenu(7)}`}
          icon={<Inventory2OutlinedIcon className={`colorIcon ${isClickedMenu(7)}`} />}
          // onClick={func.onClickedMenu}
        >
          Master COA
        </Menu.Item>
        {/* <Menu.SubMenu
          key={7}
          className={`menuItem ${
            value.isListMenuActivated[7] ? "selected" : "notSelected"
          } margin30`}
          icon={<Inventory2OutlinedIcon className="colorIcon" />}
        >
          <Menu.Item disabled={true}>
            <Text type="success" strong>
              Opex
            </Text>
          </Menu.Item>
          <Menu.Item disabled={true}>
            <Segmented
              options={[
                { value: "Input", label: "Input" },
                { value: "Summary", label: "Summary" },
              ]}
              defaultValue="Input"
              onChange={func.onChangeSegmented}
            />
          </Menu.Item>
          {value.itemCoa.map((value, i) => (
            <Menu.Item key={`7_${value}`}>{value}</Menu.Item>
          ))}
          ;
        </Menu.SubMenu> */}
        '
      </Menu>
    </Sider>
  );
};

export default NavComponent;
