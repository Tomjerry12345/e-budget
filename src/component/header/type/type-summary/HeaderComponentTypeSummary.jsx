import { ArrowDownOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Button, Layout, Modal, Typography } from "antd";
import Logic from "./Logic";

import "../style.scss";
import { log } from "values/Utilitas";
import ModalCalculate from "./modal-calculate/ModalCalculate";

const { Header } = Layout;
const { Text } = Typography;

const ModalMenuMore = ({
  open,
  onCancel,
  listMenu,
  onExport,
  linkExport,
  onClickCalculate,
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
          className="btn"
          type="text"
          // icon={<DownloadOutlined />}
          disabled={e.disabled}
          onClick={() => {
            if (i === 0) {
              onExport(e, linkExport);
            } else if (i === 1) {
              onClickCalculate();
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

const HeaderComponentTypeSummary = ({ listMenu, disabledMenu, linkExport, linkCalculate }) => {
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
        onClickCalculate={func.onClickCalculate}
      />

      <ModalCalculate
        open={value.openModal}
        onCancel={func.onCloseCalculate}
        title={`calculate data`}
        linkCalculate={linkCalculate}
      />
    </Header>
  );
};

export default HeaderComponentTypeSummary;
