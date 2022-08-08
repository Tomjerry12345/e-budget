import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import NavComponent from "../../component/navbar/NavComponent";
import MainLogic from "./MainLogic";

const { Content, Footer } = Layout;

const MainPage = () => {
  const { func, value } = MainLogic();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {console.log("mainPage")}

      <NavComponent func={func} value={value} />

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
