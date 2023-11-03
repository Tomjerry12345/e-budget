import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Text } = Typography;

const HeaderComponent = () => {
  return (
    <Header className="custom-header">
      <Text className="header-title">Dashboard</Text>
    </Header>
  );
};

export default HeaderComponent;
