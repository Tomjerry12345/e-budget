import { Breadcrumb, Button, Layout, List, Modal, Typography } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import NavComponent from "../../component/navbar/NavComponent";
import { getLocal } from "../../values/Utilitas";
import MainLogic from "./MainLogic";
import "./MainStyles.scss";

const { Header, Content } = Layout;
const { Text } = Typography;

// const data = ["Kode produk", "Kode company"];

const title = ["Dashboard", "Revenue & COGS", "Opex", "Capex", "MPP", "Others", "Report", "Master COA"];

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
          <div key="test">
            <Typography.Text>{value.titleMenu}</Typography.Text>

            {/* <Segmented
              options={[
                { value: "Input", label: "Input" },
                { value: "Summary", label: "Summary" },
              ]}
              className="segmented-style"
              defaultValue="Input"
              value={value.segmentedValue}
              onChange={func.onChangeSegmented}
            /> */}
          </div>,
        ]}
        // bodyStyle={{ overflowY: "scroll" }}
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
                <Button type="text" block disabled={value.itemDisabledMenu[i]} onClick={() => func.onClickedMenu(value.keyMenu, "submenu", item, value.titleMenu)}>
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
        <Header
          className="site-layout-background"
          style={{
            padding: 20,
            backgroundColor: "#fafafa",
            minHeight: 100,
            // minHeight: 300,
          }}
        >
          <Breadcrumb
          // style={{
          //   margin: "16px 0",
          // }}
          >
            <Breadcrumb.Item>{title[getLocal("index-menu")]}</Breadcrumb.Item>
            <Breadcrumb.Item>{value.params.item}</Breadcrumb.Item>
          </Breadcrumb>
          <Text strong>Summary {value.params.item}</Text>

          {/* <Card>
          <Form layout="vertical">
            <Row>
              <Col span={5}>
                <Form.Item label="Field A">
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Field A">
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Field A">
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Field A">
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Field A">
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card> */}
        </Header>
        <Content>
          <Outlet />
        </Content>

        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default MainPage;
