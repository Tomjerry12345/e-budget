import { Button, Layout, Typography } from "antd";

const { Header } = Layout;
const { Text } = Typography;

const HeaderFasilitasKredit = ({ titleHeader = "", onOpenModal, disabled }) => {
  return (
    <Header className="custom-header">
      <Text className="header-title">{titleHeader}</Text>

      <div className="container-menu">
        <Button
          className="btn-tambah-user"
          onClick={onOpenModal}
          type="primary"
          disabled={disabled}
        >
          Tambah Fasilitas Kredit
        </Button>
      </div>
    </Header>
  );
};

export default HeaderFasilitasKredit;
