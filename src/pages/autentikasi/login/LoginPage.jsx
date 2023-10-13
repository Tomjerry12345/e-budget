// @flow
import { Col, Row, Form, Input, Button, Typography, Card, Checkbox } from "antd";
import Layout from "antd/lib/layout/layout";
import React from "react";
import "./LoginStyle.scss";
import logo from "../../../assets/img/logo.png";
import LoginLogic from "./LoginLogic";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import ilustrasi from "../../../assets/img/ilustrasi.svg";

const LoginPage = () => {
  const { value, func } = LoginLogic();
  const { form, checked } = value;
  const { onFinish } = func;

  return (
    <div>
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
                  // ref={ref}
                  form={form}
                  layout="vertical"
                  style={{
                    marginTop: "16px",
                  }}
                  className="custom-form"
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
                    style={{
                      marginBottom: 8,
                    }}
                    rules={[{ required: true, message: "Please input your password!" }]}
                  >
                    <Input.Password
                      placeholder="input password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>

                  <Checkbox
                    className="remember-password"
                    checked={checked}
                    onChange={func.onCheckRemember}
                  >
                    Remember password
                  </Checkbox>

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
      </Layout>
    </div>
  );
};

export default LoginPage;
