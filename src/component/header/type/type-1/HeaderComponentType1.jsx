import { DeleteOutlined, DownloadOutlined, FilterOutlined, MoreOutlined, ReloadOutlined, SearchOutlined, ToTopOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Dropdown, Input, Layout, Menu, Modal, Typography } from "antd";
import { getLocal } from "../../../../values/Utilitas";
import FilterComponent from "../../../filter/FilterComponent";
import HeaderComponentLogic from "../../HeaderComponentLogic";
import "./style.scss";

const { Header } = Layout;
const { Text } = Typography;
const { Search } = Input;

// const data = ["Kode produk", "Kode company"];

const title = ["Dashboard", "Revenue & COGS", "Opex", "Capex", "MPP", "Others", "Report", "Master COA", "Akun"];

const ModalFilter = ({ filter, onOk, onCloseFilter, form, onFinish }) => {
  return (
    <Modal className="filter-modal" title="Filter" open={filter} onCancel={onCloseFilter} footer={null}>
      <FilterComponent type={2} isCodeProduct={true} form={form} onFinish={onFinish} />
    </Modal>
  );
};

const ModalMenuMore = ({ open, onCancel }) => {
  return (
    <Modal className="more-modal" title={null} open={open} onCancel={onCancel} footer={null} closable={false}>
      <Button type="text" icon={<DownloadOutlined />}>
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

const menu = (
  <Menu>
    <Menu.Item>
      <Button type="text" icon={<DownloadOutlined />}>
        Import
      </Button>
    </Menu.Item>
    <Menu.Item>
      <Button type="text" icon={<ToTopOutlined />}>
        Export
      </Button>
    </Menu.Item>
    <Menu.Item>
      <Button type="text" icon={<DeleteOutlined />} style={{ color: "red" }}>
        Clear Data
      </Button>
    </Menu.Item>
  </Menu>
);

const HeaderComponentType1 = ({ form, onFinish }) => {
  const { value, func } = HeaderComponentLogic();
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

      <ModalFilter filter={value.filter} onOk={null} onCloseFilter={func.onCloseFilter} />

      <ModalMenuMore open={value.more} onCancel={func.onCloseMore} />
    </Header>
  );
};

export default HeaderComponentType1;
