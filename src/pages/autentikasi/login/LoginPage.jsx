// @flow
import { Col, Row, Form, Input, Button, Typography, Card } from "antd";
import Layout from "antd/lib/layout/layout";
import React from "react";
import "./LoginStyle.scss";
import logo from "../../../assets/img/logo.png";
import LoginLogic from "./LoginLogic";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import ilustrasi from "../../../assets/img/ilustrasi.svg";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  const { value, func } = LoginLogic();
  const { ref } = value;
  const { onFinish } = func;

  return (
    <div>
      <Helmet>
        <title>Test</title>
        <meta property="og:title" content="luffy" />
        <meta property="og:description" content="adakah" />
        <meta
          property="og:image"
          content="https://i.pinimg.com/originals/e6/36/a6/e636a664f860a1ec9f7b5f3c4e2f634b.jpg"
        />
      </Helmet>
      <Layout className="custom-layout-root">
        <Row gutter={16} className="custom-row">
          <Col
            span={14}
            style={{
              // backgroundColor: "#02AAB0",
              backgroundImage: `url(${ilustrasi})`,
              backgroundSize: "cover",
              backgroundPositionY: "50%",
              backgroundPosition: "center",
              // backgroundAttachment: "fixed",
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
                    alt=""
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
                  ref={ref}
                  layout="vertical"
                  style={{
                    marginTop: "16px",
                  }}
                  className="custom-form"
                  autoComplete="off"
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Masukkan username"
                    name="username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                  >
                    <Input placeholder="Masukkan username disini..." />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Masukkan Password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                  >
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
                      htmlType="submit"
                    >
                      Masuk
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Layout>
          </Col>
        </Row>

        {/* <NotifComponent
        open={value.open}
        onOk={func.handleOk}
        onCancel={func.handleCancel}
      /> */}
      </Layout>
    </div>
  );
};

export default LoginPage;
