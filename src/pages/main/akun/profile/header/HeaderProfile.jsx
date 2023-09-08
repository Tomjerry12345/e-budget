import { Button, Layout, Typography } from "antd";

const { Header } = Layout;
const { Text } = Typography;

const HeaderProfile = ({ titleHeader = "" }) => {
  return (
    <Header className="custom-header">
      <Text className="header-title">{titleHeader}</Text>
    </Header>
  );
};

export default HeaderProfile;
