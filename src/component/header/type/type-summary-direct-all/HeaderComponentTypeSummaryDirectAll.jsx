import { ArrowDownOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Button, Layout, Modal, Typography } from "antd";
import Logic from "./Logic";

import "../style.scss";
import { log } from "values/Utilitas";
import ModalExportSummaryDirectAll from "./modal-export/ModalExportSummaryDirectAll";

const { Header } = Layout;
const { Text } = Typography;

const ModalMenuMore = ({ open, onCancel, listMenu, onExport, linkExport, onClickBefore }) => {
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
          onClick={() => {
            if (e.before) {
              onClickBefore();
            } else {
              onExport(e, linkExport);
            }
            onCancel();
          }}
        >
          Export {e.description}
        </Button>
      ))}
    </Modal>
  );
};

const HeaderComponentTypeSummaryDirectAll = ({ listMenu, disabledMenu, linkExport }) => {
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
        onClickBefore={func.onClickBefore}
      />

      <ModalExportSummaryDirectAll
        open={value.openModal}
        onCancel={func.onCloseBefore}
        title={`export  ${value.header}`}
      />
    </Header>
  );
};

export default HeaderComponentTypeSummaryDirectAll;
