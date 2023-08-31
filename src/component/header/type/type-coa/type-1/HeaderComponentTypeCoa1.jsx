import {
  ArrowDownOutlined,
  FileAddOutlined,
  SearchOutlined,
  ToTopOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout, Modal, Typography } from "antd";
import { getLocal } from "../../../../../values/Utilitas";
import TambahDataCoaModal from "../../../../modal/tambah-data-coa/TambahDataCoaModal";
import UploadCoaModal from "../../../../modal/upload-coa/UploadCoaModal";
import HeaderComponentTypeCoa1Logic from "./HeaderComponentTypeCoa1Logic";

import "../../style.scss";

const { Header } = Layout;
const { Text } = Typography;

const ModalMenuMore = ({ open, onCancel, disabledImportExport, onExport, onClickImport }) => {
  return (
    <Modal
      // className="more-modal-type-coa"
      className="more-modal"
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      closable={false}
      mask={false}
    >
      <Button className="btn-import" icon={<ToTopOutlined />} onClick={onClickImport}>
        Import Data
      </Button>
      <Button
        className="btn"
        type="text"
        icon={<VerticalAlignBottomOutlined />}
        disabled={disabledImportExport}
        onClick={() => {
          onExport();
          onCancel();
        }}
      >
        Export
      </Button>
      {/* <Button
        className="btn"
        type="text"
        icon={<DeleteOutlined />}
        style={{ color: "red" }}
        disabled={disabledImportExport}
      >
        Clear Data
      </Button> */}
    </Modal>
  );
};

const HeaderComponentTypeCoa1 = ({
  onUploadFile,
  downloadFile,
  accesFile,
  inputSearch,
  onTambahData,
  onChangeTambahData,
  onChangeLoadingUpload,
  inputTambah,
  formTambah,
  valueTreeData,
  disabledImportExport,
  onExport,
}) => {
  const { value, func } = HeaderComponentTypeCoa1Logic({
    onChangeTambahData,
    onChangeLoadingUpload,
  });

  return (
    <Header className="custom-header">
      <Text className="header-title">{getLocal("name-menu")}</Text>

      <div className="container-menu">
        <Input
          className="input-search"
          placeholder="input search text"
          suffix={<SearchOutlined />}
          onPressEnter={inputSearch.onChange}
        />
        {/* <Button className="btn-refresh" icon={<ReloadOutlined />}>
          Refresh
        </Button> */}
        {/* <Button
          className="btn-import"
          icon={<ToTopOutlined />}
          onClick={func.onClickImport}
        >
          Import Data
        </Button> */}
        <Button
          className="btn-tambah"
          icon={<FileAddOutlined />}
          onClick={func.onClickTambahData}
        >
          Tambah Data
        </Button>
        <Button
          className="btn-more"
          // icon={<ArrowDownOutlined />}

          onClick={func.onClickMore}
        >
          Action <ArrowDownOutlined />
        </Button>
      </div>

      <ModalMenuMore
        open={value.more}
        onCancel={func.onCloseMore}
        disabledImportExport={disabledImportExport}
        onExport={onExport}
        onClickImport={func.onClickImport}
      />

      <UploadCoaModal
        open={value.isImport}
        onCancel={func.onCloseImport}
        value={accesFile}
        onOk={onUploadFile}
        file={downloadFile}
        loading={value.loadingUpload}
      />

      <TambahDataCoaModal
        open={value.isTambahData}
        onCancel={func.onCloseTambahData}
        onFinish={onTambahData}
        inputTambah={inputTambah}
        form={formTambah}
        valueTreeData={valueTreeData}
      />
    </Header>
  );
};

export default HeaderComponentTypeCoa1;
