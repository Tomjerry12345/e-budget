import {
  DeleteOutlined,
  DownloadOutlined,
  FileAddOutlined,
  FilterOutlined,
  MoreOutlined,
  ReloadOutlined,
  SearchOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Modal,
  Typography,
} from "antd";
import { useRef } from "react";
import { getLocal } from "../../../../values/Utilitas";
import FilterComponent from "../../../filter/FilterComponent";
import ImportInputModal from "../../../modal/import/ImportInputModal";
import TambahDataCoaModal from "../../../modal/tambah-data-coa/TambahDataCoaModal";
import UploadCoaModal from "../../../modal/upload-coa/UploadCoaModal";
import HeaderComponentTypeCoaLogic from "./HeaderComponentTypeCoaLogic";

import "./style.scss";

const { Header } = Layout;
const { Text } = Typography;

// const data = ["Kode produk", "Kode company"];

const title = [
  "Dashboard",
  "Revenue & COGS",
  "Opex",
  "Capex",
  "MPP",
  "Others",
  "Report",
  "Master COA",
  "Akun",
];

const HeaderComponentTypeCoa = ({
  onUploadFile,
  downloadFile,
  accesFile,
  inputSearch,
  onTambahData,
  onChangeTambahData,
  inputTambah,
  formTambah,
}) => {
  const { value, func } = HeaderComponentTypeCoaLogic({
    onChangeTambahData,
  });
  // const inputRef = useRef(null);

  return (
    <Header className="custom-header">
      {/* <Breadcrumb className="custom-breadcrumb" separator=">">
        <Breadcrumb.Item>{title[getLocal("index-menu")]}</Breadcrumb.Item>
        <Breadcrumb.Item>Test</Breadcrumb.Item>
      </Breadcrumb> */}

      <Text className="header-title">{getLocal("name-menu")}</Text>

      <div className="container-menu">
        <Input
          className="input-search"
          placeholder="input search text"
          // ref={inputRef}
          suffix={<SearchOutlined />}
          onPressEnter={inputSearch.onChange}
        />
        <Button className="btn-refresh" icon={<ReloadOutlined />}>
          Refresh
        </Button>
        <Button
          className="btn-import"
          icon={<ToTopOutlined />}
          onClick={func.onClickImport}
        >
          Import Data
        </Button>
        <Button
          className="btn-tambah"
          icon={<FileAddOutlined />}
          onClick={func.onClickTambahData}
        >
          Tambah Data
        </Button>
      </div>

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
        // value={accesFile}
        // onOk={onUploadFile}
        // file={downloadFile}
        // loading={value.loadingUpload}
      />
    </Header>
  );
};

export default HeaderComponentTypeCoa;
