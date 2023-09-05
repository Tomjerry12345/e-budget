import { ArrowDownOutlined } from "@ant-design/icons";
import { Button, Layout, Typography } from "antd";
import Logic from "./Logic";

const { Header } = Layout;
const { Text } = Typography;

const HeaderManagementUser = ({ titleHeader = "" }) => {
  const { value, func } = Logic();

  return (
    <Header className="custom-header">
      <Text className="header-title">{titleHeader}</Text>

      <div className="container-menu">
        <Button className="btn-tambah-user" onClick={func.onOpenModal} type="primary">
          Tambah User
        </Button>
      </div>
    </Header>
  );
};

export default HeaderManagementUser;
