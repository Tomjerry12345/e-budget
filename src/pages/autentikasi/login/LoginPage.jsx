// @flow
import { Col, Row, Form, Input, Button, Typography } from "antd";
import Layout from "antd/lib/layout/layout";
import React from "react";
// import LoginLogic from "./LoginLogic";

const LoginPage = () => {
  //   const { value, func } = LoginLogic();
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Row gutter={16}>
        <Col
          span={12}
          style={{
            backgroundColor: "#000",
            height: "100vh",
          }}
        >
          col-12
        </Col>
        <Col span={12}>
          <Layout
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <Typography.Text>Test</Typography.Text>
            <Form
              onSubmit={() => {}}
              layout="vertical"
              style={{
                width: "300px",
                marginTop: "50px",
              }}
            >
              <Form.Item label="Masukkan username">
                <Input />
              </Form.Item>
              <Form.Item label="Masukkan Password">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  style={{
                    width: "100%",
                  }}
                >
                  Masuk
                </Button>
              </Form.Item>
            </Form>
          </Layout>
        </Col>
      </Row>
    </Layout>
  );
};

export default LoginPage;
