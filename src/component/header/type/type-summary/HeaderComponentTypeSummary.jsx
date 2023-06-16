import {
  ArrowDownOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Button,  Layout, Modal, Typography } from "antd";
import HeaderComponentTypeSummaryLogic from "./HeaderComponentTypeSummaryLogic";

import "../style.scss";

const { Header } = Layout;
const { Text } = Typography;


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
      <Text className="header-title">{value.header}</Text>

      <div className="container-menu">
        <Button
          className="btn-more"

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
