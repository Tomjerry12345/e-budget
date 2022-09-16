// @flow
import { Col, Row, Form, Input, Button, Typography, Card } from "antd";
import Layout from "antd/lib/layout/layout";
import React from "react";
import "./LoginStyle.scss";
import logo from "../../../assets/img/logo.png";
import LoginLogic from "./LoginLogic";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import ModalComponent from "../../../component/modal/ModalComponent";

const LoginPage = () => {
  const { value, func } = LoginLogic();
  return (
    <Layout className="custom-layout-root">
      <Row gutter={16} className="custom-row">
        <Col
          span={14}
          style={{
            backgroundColor: "#02AAB0",
            height: "100vh",
          }}
        ></Col>
        <Col>
          <Layout className="custom-layout">
            <Card className="custom-card" style={{ width: 300 }}>
              <div className="custom-layout-image">
                <img
                  src={logo}
                  style={{
                    width: "91px",
                  }}
                />
              </div>

              <Typography.Text
                style={{
                  fontSize: "24px",
                  display: "block",
                  fontWeight: "700",
                  lineHeight: "34px",
                  marginTop: "24px",
                }}
              >
                Masuk Akun
              </Typography.Text>
              <Typography.Text
                style={{
                  lineHeight: "20px",
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#717171",
                }}
              >
                Selamat Datang di Application Budget Controlling
              </Typography.Text>

              <Form
                onSubmit={() => {}}
                layout="vertical"
                style={{
                  marginTop: "16px",
                }}
                className="custom-form"
                autoComplete="off"
              >
                <Form.Item label="Masukkan username" required>
                  <Input placeholder="Masukkan NIK disini..." />
                </Form.Item>
                <Form.Item label="Masukkan Password" required>
                  <Input.Password
                    placeholder="input password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{
                      width: "100%",
                      backgroundColor: "#008041",
                      color: "white",
                      borderRadius: "8px",
                      height: "40px",
                    }}
                  >
                    Masuk
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Layout>
        </Col>
      </Row>

      <ModalComponent open={false} />
    </Layout>
  );
};

export default LoginPage;
