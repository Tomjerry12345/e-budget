import { Breadcrumb, Button, Layout, List, Modal, Typography } from "antd";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavComponent from "../../component/navbar/NavComponent";
import { getLocal, log } from "../../values/Utilitas";
import MainLogic from "./MainLogic";
import "./MainStyles.scss";
import "./InputStyles.scss";
import "./SummaryStyle.scss";

const { Header, Content } = Layout;
const { Text } = Typography;

// const data = ["Kode produk", "Kode company"];

const title = [
  "Dashboard",
  "Revenue & COGS",
  "Opex",
  "Capex",
  "MPP",
  "Others",
  "Report",
  "Master COA",
  "Akun",
];

const getPath = (pathName, item) => {
  const spliter = pathName?.split("/");

  let path = "";
  if (typeof spliter[3] === "undefined") {
    path = "Dashboard";
  } else {
    const path1 = spliter[3].charAt(0).toUpperCase() + spliter[3].slice(1);
    const pathSplit = path1.split("%20").join(" ");
    log(`path1 => ${pathSplit}`);

    if (pathSplit === "Summary") {
      path = item;
    } else if (pathSplit === "Input") {
      path = `${path1} ${item}`;
    } else {
      path = pathSplit;
    }
  }

  return path;
};

const MainPage = () => {
  const { func, value } = MainLogic();
  const location = useLocation();
  const pathName = location.pathname;
  const path = getPath(pathName, value.params.item);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
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
        <div className="scrollableDiv">
          <List
            size="large"
            header={null}
            footer={null}
            dataSource={value.item}
            renderItem={(item, i) => (
              <List.Item key={i}>
                <Button
                  type="text"
                  block
                  disabled={value.itemDisabledMenu[i]}
                  onClick={() =>
                    func.onClickedMenu(
                      value.keyMenu,
                      "submenu",
                      item,
                      value.titleMenu
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
        <Header className="custom-header">
          <Breadcrumb className="custom-breadcrumb" separator=">">
            <Breadcrumb.Item>{title[getLocal("index-menu")]}</Breadcrumb.Item>
            <Breadcrumb.Item>{value.params.item}</Breadcrumb.Item>
          </Breadcrumb>
          {value.params.item !== "" ? (
            <Text className="header-title">
              {path}
              {/* {value.params.item} */}
            </Text>
          ) : null}
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPage;
