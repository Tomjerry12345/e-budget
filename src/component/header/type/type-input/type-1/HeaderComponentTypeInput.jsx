import { ArrowDownOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Layout, Modal, Typography } from "antd";
import HeaderComponentTypeInputLogic from "./HeaderComponentTypeInputLogic";

import "../style.scss";
import { getLocal } from "../../../../../values/Utilitas";
import ImportInputModal from "../../../../modal/import/ImportInputModal";

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
      className="more-modal"
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
            onClickImport(e.code_account);
            onCancel();
          }}
        >
          {e.description}
        </Button>
      ))}
    </Modal>
  );
};

const HeaderComponentTypeInput = ({
  onChangeFilter,
  onUploadFile,
  downloadFile,
  onChangeLoadingUpload,
  accesFile,
  disabledImportExport,
  onChangeSelect,
  listMenuImport,
}) => {
  const { value, func } = HeaderComponentTypeInputLogic({
    onChangeFilter,
    onChangeLoadingUpload,
  });
  return (
    <Header className="custom-header">
      <Text className="header-title">{getLocal("name-menu")}</Text>
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
        value={accesFile}
        onOk={onUploadFile}
        file={downloadFile}
        loading={value.importRedux.loading}
        onChangeSelect={onChangeSelect}
      />
    </Header>
  );
};

export default HeaderComponentTypeInput;