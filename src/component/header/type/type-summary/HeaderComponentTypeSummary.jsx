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
  type,
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
            if (type === "direct") {
              if (i === 0) {
                onExport(e, linkExport);
              } else if (i === 1) {
                onClickCalculate(e.description);
              }
            } else {
              onExport(e, linkExport);
            }

            onCancel();
          }}
        >
          {type === "direct"
            ? i === 0
              ? `Export ${e.description}`
              : e.description
            : `Export ${e.description}`}
        </Button>
      ))}
    </Modal>
  );
};

const HeaderComponentTypeSummary = ({
  listMenu,
  disabledMenu,
  linkExport,
  linkCalculate,
  titleHeader,
  type = "",
}) => {
  const { value, func } = Logic({ titleHeader });

  return (
    <Header className="custom-header">
      <Text className="header-title">{titleHeader ?? value.header}</Text>

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
        type={type}
      />

      <ModalCalculate
        open={value.openModal}
        onCancel={func.onCloseCalculate}
        title={value.headerCalculate}
        linkCalculate={linkCalculate}
      />
    </Header>
  );
};

export default HeaderComponentTypeSummary;
