import { DeleteOutlined, DownloadOutlined, FilterOutlined, MoreOutlined, ReloadOutlined, SearchOutlined, ToTopOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Dropdown, Input, Layout, Menu, Modal, Typography } from "antd";
import { getLocal } from "../../../../values/Utilitas";
import FilterComponent from "../../../filter/FilterComponent";
import HeaderComponentType1Logic from "./HeaderComponentType1Logic";

import "./style.scss";

const { Header } = Layout;
const { Text } = Typography;

// const data = ["Kode produk", "Kode company"];

const title = ["Dashboard", "Revenue & COGS", "Opex", "Capex", "MPP", "Others", "Report", "Master COA", "Akun"];

const ModalFilter = ({ filter, onCloseFilter, onFinish }) => {
  return (
    <Modal className="filter-modal" title="Filter" open={filter} onCancel={onCloseFilter} footer={null} mask={false}>
      <FilterComponent type={2} isCodeProduct={true} onFinish={onFinish} />
    </Modal>
  );
};

const ModalMenuMore = ({ open, onCancel, onClickImport }) => {
  return (
    <Modal className="more-modal" title={null} open={open} onCancel={onCancel} footer={null} closable={false} mask={false}>
      <Button
        type="text"
        icon={<DownloadOutlined />}
        onClick={() => {
          onClickImport();
          onCancel();
        }}
      >
        Import
      </Button>
      <Button type="text" icon={<ToTopOutlined />}>
        Export
      </Button>
      <Button type="text" icon={<DeleteOutlined />} style={{ color: "red" }}>
        Clear Data
      </Button>
    </Modal>
  );
};

const HeaderComponentType1 = ({ onFinish, onChangeFilter, onClickImport }) => {
  const { value, func } = HeaderComponentType1Logic({ onChangeFilter });
  return (
    <Header className="custom-header">
      {/* <Breadcrumb className="custom-breadcrumb" separator=">">
        <Breadcrumb.Item>{title[getLocal("index-menu")]}</Breadcrumb.Item>
        <Breadcrumb.Item>Test</Breadcrumb.Item>
      </Breadcrumb> */}

      <Text className="header-title">{getLocal("name-menu")}</Text>

      <div className="container-menu">
        <Input className="input-search" placeholder="input search text" suffix={<SearchOutlined />} />
        <Button className="btn-filter" icon={<FilterOutlined />} onClick={func.onCilckFilter}>
          Filter
        </Button>
        <Button className="btn-refresh" icon={<ReloadOutlined />}>
          Refresh
        </Button>
        <Button className="btn-more" icon={<MoreOutlined />} onClick={func.onClickMore} />
      </div>

      <ModalFilter filter={value.filter} onCloseFilter={func.onCloseFilter} onFinish={onFinish} />

      <ModalMenuMore open={value.more} onCancel={func.onCloseMore} onClickImport={onClickImport} />
    </Header>
  );
};

export default HeaderComponentType1;
