import { ArrowDownOutlined } from "@ant-design/icons";
import { Button, Layout, Modal, Typography } from "antd";
import HeaderComponentTypeInputLogic from "./HeaderComponentTypeInputLogic";

import "../../style.scss";
import ImportInputModal from "component/modal/import/ImportInputModal";
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
  setFileName,
  dynamicFile,
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
            setModalTitle('Import ' + e.description);
            onClickImport(e.code_account);
            if (dynamicFile === true) setFileName(e.filename);
            onCancel();
          }}
        >
          Import {e.description}
        </Button>
      ))}
    </Modal>
  );
};

const HeaderComponentTypeInput = ({
  onUploadFile,
  downloadFile,
  accesFile,
  disabledImportExport,
  onChangeSelect,
  listMenuImport,
  className,
  dynamicFile,
}) => {
  const { value, func } = HeaderComponentTypeInputLogic();
  const [modalTitle, setModalTitle] = useState('Import');
  const [fileName, setFileName] = useState(null);

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
        className={className}
        open={value.importRedux.openMore}
        onCancel={func.onCloseMore}
        onClickImport={func.onClickImport}
        disabledImportExport={disabledImportExport}
        listMenuImport={listMenuImport}
        setModalTitle={setModalTitle}
        setFileName={setFileName}
        dynamicFile={dynamicFile}
      />

      <ImportInputModal
        open={value.importRedux.openImport}
        onCancel={func.onCloseImport}
        value={accesFile}
        onOk={onUploadFile}
        file={dynamicFile === true ? fileName : downloadFile}
        loading={value.importRedux.loading}
        onChangeSelect={onChangeSelect}
        title={modalTitle}
      />
    </Header>
  );
};

export default HeaderComponentTypeInput;
