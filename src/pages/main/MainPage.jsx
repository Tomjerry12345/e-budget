import { Button, Layout, List, Modal, Typography } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import NavComponent from "../../component/navbar/NavComponent";
import MainLogic from "./MainLogic";
import "./MainStyles.scss";
import "./InputStyles.scss";
// import "./SummaryStyle.scss";
import NotificationComponent from "../../component/notification/NotificationComponent";

import "@silevis/reactgrid/styles.scss";
import "@silevis/reactgrid/default-colors.scss";
import "@silevis/reactgrid/default-sizing.scss";
import "@silevis/reactgrid/cell-templates-default-colors.scss";

const { Content } = Layout;

const MainPage = () => {
  const { func, value } = MainLogic();

  // cekToken(value.navigate);

  return (
    <Layout>
      <NavComponent func={func} value={value} />

      <Modal
        title={[
          <div key="test">
            <Typography.Text>{value.titleMenu}</Typography.Text>
          </div>,
        ]}
        open={value.showMenu}
        className="modal-menu"
        closable={false}
        onCancel={func.handleCancel}
        mask={false}
        footer={null}
      >
        <div className="scrollableDiv scroll-shadows">
          <List
            size="large"
            header={null}
            footer={null}
            dataSource={value.listSubmenu}
            renderItem={(item, i) => (
              <List.Item key={i}>
                <Button
                  href={value.routerNewPage}
                  type="text"
                  block
                  disabled={value.itemDisabledMenu[i]}
                  onMouseDown={(e) => func.onMouseDownClickedMenu(value.keyMenu, item)}
                  onClick={(e) =>
                    func.onClickedMenu(value.keyMenu, "submenu", item, value.titleMenu, e)
                  }
                >
                  {item.description}
                </Button>
              </List.Item>
            )}
          />
        </div>
      </Modal>

      <Layout
        style={{
          backgroundColor: "#f5f7f9",
          overflow: "auto",
        }}
      >
        <Content>
          <Outlet />
        </Content>
      </Layout>

      <NotificationComponent
        status={value.notifRedux.status}
        message={value.notifRedux.message}
      />
    </Layout>
  );
};

export default MainPage;
