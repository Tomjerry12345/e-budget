import { ArrowDownOutlined } from "@ant-design/icons";
import { Button, Layout, Modal, Typography } from "antd";
import ImportInputModal from "component/modal/import/ImportInputModal";
import HeaderComponentTypeRevenuePerusahaanLogic from "./HeaderComponentTypeRevenueIPerusahaanLogic";
import "../style.scss";

const { Header } = Layout;
const { Text } = Typography;

const ModalMenuMore = ({
  open,
  onCancel,
  onClickImport,
  disabledImportExport,
  listMenuImport,
}) => {
  return (
    <Modal
      className={`more-modal`}
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      closable={false}
      mask={false}
    >
      {listMenuImport.map((e, i) => (
        <Button
          className="btn"
          type="text"
          // icon={<DownloadOutlined />}
          disabled={disabledImportExport}
          onClick={() => {
            onClickImport(e);
            onCancel();
          }}
        >
          Import {e}
        </Button>
      ))}
    </Modal>
  );
};

const HeaderComponentTypeRevenuePerusahaan = ({
  onUploadFile,
  downloadFile,
  accesFile,
  disabledImportExport,
  onChangeSelect,
  listMenuImport,
}) => {
  const { value, func } = HeaderComponentTypeRevenuePerusahaanLogic();
  return (
    <Header className="custom-header">
      {/* <Text className="header-title">{getLocal("name-menu")}</Text> */}
      <Text className="header-title">{value.header}</Text>
      <div className="container-menu">
        <Button className="btn-more" onClick={func.onClickMore}>
          Action <ArrowDownOutlined />
        </Button>
      </div>

      <ModalMenuMore
        open={value.importRedux.openMore}
        onCancel={func.onCloseMore}
        onClickImport={func.onClickImport}
        disabledImportExport={disabledImportExport}
        listMenuImport={listMenuImport}
      />

      <ImportInputModal
        open={value.importRedux.openImport}
        onCancel={func.onCloseImport}
        value={value}
        onOk={func.onUploadFile}
        file={value.file}
        loading={value.importRedux.loading}
        onChangeSelect={onChangeSelect}
      />
    </Header>
  );
};

export default HeaderComponentTypeRevenuePerusahaan;
