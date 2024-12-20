import { Button, Layout, Typography } from "antd";

const { Header } = Layout;
const { Text } = Typography;

const HeaderManagementUser = ({ titleHeader = "", onOpenModal }) => {
  return (
    <Header className="custom-header">
      <Text className="header-title">{titleHeader}</Text>

      <div className="container-menu">
        <Button className="btn-tambah-user" onClick={onOpenModal} type="primary">
          Tambah User
        </Button>
      </div>
    </Header>
  );
};

export default HeaderManagementUser;
