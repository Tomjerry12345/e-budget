import { ArrowDownOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Button, Layout, Modal, Typography } from "antd";
import Logic from "./Logic";

import "../style.scss";
import { log } from "values/Utilitas";

const { Header } = Layout;
const { Text } = Typography;

const ModalMenuMore = ({ open, onCancel, listMenu, disabledMenu, onExport, linkExport }) => {
  log({ listMenu });
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
      {listMenu.map((e) => (
        <Button
          className="btn"
          type="text"
          // icon={<DownloadOutlined />}
          disabled={e.disabled}
          onClick={() => {
            onExport(e, linkExport);
            onCancel();
          }}
        >
          Export {e.description}
        </Button>
      ))}
    </Modal>
  );
};

const HeaderComponentTypeSummary = ({ listMenu, disabledMenu, linkExport }) => {
  const { value, func } = Logic();

  return (
    <Header className="custom-header">
      <Text className="header-title">{value.header}</Text>

      <div className="container-menu">
        <Button className="btn-more" onClick={func.onClickMore}>
          Action <ArrowDownOutlined />
        </Button>
      </div>

      <ModalMenuMore
        open={value.more}
        onCancel={func.onCloseMore}
        listMenu={listMenu}
        onExport={func.onExport}
        disabledMenu={disabledMenu}
        linkExport={linkExport}
      />
    </Header>
  );
};

export default HeaderComponentTypeSummary;
