import { Breadcrumb, Button, Layout, List, Modal, Typography } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import NavComponent from "../../component/navbar/NavComponent";
import MainLogic from "./MainLogic";
import "./MainStyles.scss";
import "./InputStyles.scss";
import "./SummaryStyle.scss";
import { cekToken } from "../../values/Utilitas";

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
            dataSource={value.item}
            renderItem={(item, i) => (
              <List.Item key={i}>
                <Button
                  href={value.routerNewPage}
                  type="text"
                  block
                  disabled={value.itemDisabledMenu[i]}
                  onMouseDown={(e) =>
                    func.onMouseDownClickedMenu(value.keyMenu, item)
                  }
                  onClick={(e) =>
                    func.onClickedMenu(
                      value.keyMenu,
                      "submenu",
                      item,
                      value.titleMenu,
                      e
                    )
                  }
                >
                  {item}
                </Button>
              </List.Item>
            )}
          />
        </div>
      </Modal>

      <Layout
        style={{
          backgroundColor: "white",
        }}
      >
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPage;
