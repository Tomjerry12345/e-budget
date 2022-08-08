import { Layout, Menu, Segmented, Typography } from "antd";

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import "./NavStyles.scss";

const { Sider } = Layout;
const { Text } = Typography;

const NavComponent = ({ func, value }) => {
  return (
    <Sider collapsed={true}>
      <Menu
        className="menuNav"
        triggerSubMenuAction="click"
        subMenuOpenDelay={1}
        subMenuCloseDelay={1}
        onClick={({ _, key }) => {
          console.log(`key => ${key}`);

          func.onClickedMenu(key);
        }}
      >
        <h1 className="titleMenu">Logo</h1>
        <h1 className="titleMenu">Menu</h1>
        <Menu.Item
          key={0}
          className={`menuItem ${value.isListMenuActivated[0] ? "selected" : "notSelected"}`}
          style={{
            marginTop: 50,
          }}
          icon={<GridViewRoundedIcon className="colorIcon" />}
        >
          Dashboard
        </Menu.Item>
        <Menu.SubMenu key={1} className={`menuItem ${value.isListMenuActivated[1] ? "selected" : "notSelected"}`} icon={<InsertChartOutlinedIcon className="colorIcon" />}>
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
            />
          </Menu.Item>
          <Menu.Item>Menu 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={2} className={`menuItem ${value.isListMenuActivated[2] ? "selected" : "notSelected"}`} icon={<AssignmentTurnedInOutlinedIcon className="colorIcon" />}>
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
            />
          </Menu.Item>
          <Menu.Item>Menu 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={3} className={`menuItem ${value.isListMenuActivated[3] ? "selected" : "notSelected"}`} icon={<ArchiveOutlinedIcon className="colorIcon" />}>
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
            />
          </Menu.Item>
          <Menu.Item>Menu 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={4} className={`menuItem ${value.isListMenuActivated[4] ? "selected" : "notSelected"}`} icon={<SupervisedUserCircleOutlinedIcon className="colorIcon" />}>
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
            />
          </Menu.Item>
          <Menu.Item>Menu 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={5} className={`menuItem ${value.isListMenuActivated[5] ? "selected" : "notSelected"}`} icon={<ContentPasteOutlinedIcon className="colorIcon" />}>
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
            />
          </Menu.Item>
          <Menu.Item>Menu 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key={6}
          className={`menuItem ${value.isListMenuActivated[6] ? "selected" : "notSelected"}`}
          icon={<SummarizeOutlinedIcon className="colorIcon" />}
          style={{
            overflow: "hidden",
          }}
        >
          <Menu.Item disabled={true}>
            <Text type="success" strong>
              Opex
            </Text>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={7} className={`menuItem ${value.isListMenuActivated[7] ? "selected" : "notSelected"} margin30`} icon={<Inventory2OutlinedIcon className="colorIcon" />}>
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
        </Menu.SubMenu>
        '
      </Menu>
    </Sider>
  );
};

export default NavComponent;
