import {
  ArrowDownOutlined,
  FileAddOutlined,
  SearchOutlined,
  ToTopOutlined,
  VerticalAlignBottomOutlined
} from "@ant-design/icons";
import { Button, Input, Layout, Modal, Typography } from "antd";
import { getLocal } from "../../../../../values/Utilitas";
import TambahDataCoaModal from "../../../../modal/tambah-data-coa/TambahDataCoaModal";
import UploadCoaModal from "../../../../modal/upload-coa/UploadCoaModal";
import HeaderComponentTypeCoa2Logic from "./HeaderComponentTypeCoa2Logic";

import "../../style.scss";

const { Header } = Layout;
const { Text } = Typography;

const ModalMenuMore = ({ open, onCancel, disabledImportExport, onExport, onClickImport, onClickImport2, listMenuTitleMore }) => {
  return (
    <Modal
      className="more-modal-type-coa"
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      closable={false}
      mask={false}
    >
      <Button
        className="btn-import"
        icon={<ToTopOutlined />}
        onClick={onClickImport}
      >
        {listMenuTitleMore[0]}
      </Button>
      <Button
        className="btn-import"
        icon={<ToTopOutlined />}
        onClick={onClickImport2}
      >
        {listMenuTitleMore[1]}
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

const HeaderComponentTypeCoa2 = ({
  onUploadFile,
  onUploadFile2,
  downloadFile,
  downloadFile2,
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
  listMenuTitleMore
}) => {
  const { value, func } = HeaderComponentTypeCoa2Logic({
    onChangeTambahData,
    onChangeLoadingUpload,
    accesFile
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
        onClickImport2={func.onClickImport2}
        listMenuTitleMore={listMenuTitleMore}
      />

      <UploadCoaModal
        open={value.isImport}
        onCancel={func.onCloseImport}
        value={accesFile}
        onOk={onUploadFile}
        file={downloadFile}
        loading={value.loadingUpload}
      />

      <UploadCoaModal
        open={value.isImport2}
        onCancel={func.onCloseImport2}
        value={accesFile}
        onOk={onUploadFile2}
        file={downloadFile2}
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

export default HeaderComponentTypeCoa2;
