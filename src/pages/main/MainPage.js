import { Button, Layout, List, Modal, Segmented, Tabs, Typography } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import NavComponent from "../../component/navbar/NavComponent";
import MainLogic from "./MainLogic";
import "./MainStyles.scss";

const { TabPane } = Tabs;
const { Content, Footer } = Layout;

// const data = ["Kode produk", "Kode company"];

const MainPage = () => {
  const { func, value } = MainLogic();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <NavComponent func={func} value={value} />

      <Modal
        title={[
          <div>
            <Typography.Text>Opex</Typography.Text>

            <Segmented
              options={[
                { value: "Input", label: "Input" },
                { value: "Summary", label: "Summary" },
              ]}
              className="segmented-style"
              defaultValue="Input"
              onChange={func.onChangeSegmented}
            />
          </div>,
        ]}
        visible={value.showMenu}
        className="modal-menu"
        closable={false}
        onCancel={func.handleCancel}
        mask={false}
        footer={null}
      >
        <List
          size="large"
          header={null}
          footer={null}
          dataSource={value.item}
          renderItem={(item, i) => (
            <List.Item>
              <Button
                type="text"
                block
                onClick={() => func.onClickedMenu(value.keyMenu, "submenu")}
              >
                {item}
              </Button>
            </List.Item>
          )}
        />
      </Modal>

      <Layout>
        <Content
          style={{
            backgroundColor: "white",
          }}
        >
          <div>
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainPage;
