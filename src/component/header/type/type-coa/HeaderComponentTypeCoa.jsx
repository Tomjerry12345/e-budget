import {
  FileAddOutlined,
  SearchOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Layout,
  Typography,
} from "antd";
import { getLocal } from "../../../../values/Utilitas";
import TambahDataCoaModal from "../../../modal/tambah-data-coa/TambahDataCoaModal";
import UploadCoaModal from "../../../modal/upload-coa/UploadCoaModal";
import HeaderComponentTypeCoaLogic from "./HeaderComponentTypeCoaLogic";

import "./style.scss";

const { Header } = Layout;
const { Text } = Typography;

const HeaderComponentTypeCoa = ({
  onUploadFile,
  downloadFile,
  accesFile,
  inputSearch,
  onTambahData,
  onChangeTambahData,
  onChangeLoadingUpload,
  inputTambah,
  formTambah,
  valueTreeData
}) => {
  const { value, func } = HeaderComponentTypeCoaLogic({
    onChangeTambahData,
    onChangeLoadingUpload
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
        valueTreeData={valueTreeData}
      />
    </Header>
  );
};

export default HeaderComponentTypeCoa;
