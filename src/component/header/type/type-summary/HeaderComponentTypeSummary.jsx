import {
  ArrowDownOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FilterOutlined,
  MoreOutlined,
  ReloadOutlined,
  SearchOutlined,
  ToTopOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Dropdown, Input, Layout, Menu, Modal, Typography } from "antd";
import { getLocal } from "../../../../values/Utilitas";
import FilterComponent from "../../../filter/FilterComponent";
import UploadModal from "../../../modal/UploadModal";
import HeaderComponentTypeSummaryLogic from "./HeaderComponentTypeSummaryLogic";

import "../style.scss";

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

const ModalMenuMore = ({ open, onCancel, disabledImportExport, onExport }) => {
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

const HeaderComponentTypeSummary = ({ onFinish, disabledImportExport, onExport }) => {
  const { value, func } = HeaderComponentTypeSummaryLogic();
  return (
    <Header className="custom-header">
      {/* <Breadcrumb className="custom-breadcrumb" separator=">">
        <Breadcrumb.Item>{title[getLocal("index-menu")]}</Breadcrumb.Item>
        <Breadcrumb.Item>Test</Breadcrumb.Item>
      </Breadcrumb> */}

      {/* <Text className="header-title">{getLocal("name-menu")}</Text> */}
      <Text className="header-title">{value.header}</Text>

      <div className="container-menu">
        {/* <Button
          className="btn-filter"
          icon={<FilterOutlined />}
          onClick={func.onCilckFilter}
        >
          Filter
        </Button> */}
        {/* <Button className="btn-refresh" icon={<ReloadOutlined />}>
          Refresh
        </Button> */}
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
      />
    </Header>
  );
};

export default HeaderComponentTypeSummary;
