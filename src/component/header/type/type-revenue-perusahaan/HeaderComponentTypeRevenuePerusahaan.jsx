import { ArrowDownOutlined } from "@ant-design/icons";
import { Button, Layout, Modal, Typography } from "antd";
import ImportInputModal from "component/modal/import/ImportInputModal";
import HeaderComponentTypeRevenuePerusahaanLogic from "./Logic";
import "../style.scss";
import { useState } from "react";

const { Header } = Layout;
const { Text } = Typography;

const ModalMenuMore = ({
  open,
  onCancel,
  onClickImport,
  disabledImportExport,
  listMenuImport,
  setModalTitle,
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
          key={i}
          className="btn"
          type="text"
          // icon={<DownloadOutlined />}
          disabled={disabledImportExport}
          onClick={() => {
            setModalTitle("Import " + e.description);
            onClickImport(e);
            onCancel();
          }}
        >
          Import {e.description}
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
  const [modalTitle, setModalTitle] = useState("Import");
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
        setModalTitle={setModalTitle}
      />

      <ImportInputModal
        open={value.importRedux.openImport}
        onCancel={func.onCloseImport}
        value={value}
        onOk={func.onUploadFile}
        file={value.file}
        loading={value.importRedux.loading}
        onChangeSelect={onChangeSelect}
        title={modalTitle}
        type={true}
      />
    </Header>
  );
};

export default HeaderComponentTypeRevenuePerusahaan;
