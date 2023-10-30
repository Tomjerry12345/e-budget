import { ArrowDownOutlined } from "@ant-design/icons";
import { Button, Layout, Typography } from "antd";

const { Header } = Layout;
const { Text } = Typography;

const HeaderFasilitasKredit = ({ titleHeader = "", onClickMenu }) => {
  return (
    <Header className="custom-header">
      <Text className="header-title">{titleHeader}</Text>

      <div className="container-menu">
        {/* <Button
          className="btn-tambah-user"
          onClick={onOpenModal}
          type="primary"
          disabled={disabled}
        >
          Tambah Fasilitas Kredit
        </Button> */}
        <Button className="btn-more" onClick={onClickMenu}>
          Action <ArrowDownOutlined />
        </Button>
      </div>
    </Header>
  );
};

export default HeaderFasilitasKredit;
