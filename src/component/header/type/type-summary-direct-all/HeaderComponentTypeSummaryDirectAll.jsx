import { ArrowDownOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Button, Layout, Modal, Typography } from "antd";
import Logic from "./Logic";

import "../style.scss";
import { log } from "values/Utilitas";
import ModalExportSummaryDirectAll from "./modal-export/ModalExportSummaryDirectAll";

const { Header } = Layout;
const { Text } = Typography;

const ModalMenuMore = ({
  open,
  onCancel,
  listMenu,
  onExport,
  linkExport,
  onClickDataOracle,
}) => {
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
      {listMenu.map((e, i) => (
        <Button
          key={i}
          className="btn"
          type="text"
          disabled={e.disabled}
          onClick={() => {
            if (i === 0) {
              onExport(e, linkExport);
            } else if (i === 1) {
              onClickDataOracle();
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
        onClickDataOracle={func.onClickDataOracle}
      />

      <ModalExportSummaryDirectAll
        open={value.openModal}
        onCancel={func.onCloseBefore}
        title={`Export data to oracle`}
        // title={`Export  ${value.header}`}
      />
    </Header>
  );
};

export default HeaderComponentTypeSummaryDirectAll;
