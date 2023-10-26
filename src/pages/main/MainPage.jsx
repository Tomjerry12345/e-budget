import { Button, Form, Input, Layout, List, Modal, Space, Typography } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import NavComponent from "../../component/navbar/NavComponent";
import MainLogic from "./MainLogic";
import "./MainStyles.scss";
import "./InputStyles.scss";
import "./style-utils.scss";
// import "./SummaryStyle.scss";
import NotificationComponent from "../../component/notification/NotificationComponent";

import "@silevis/reactgrid/styles.scss";
import "@silevis/reactgrid/default-colors.scss";
import "@silevis/reactgrid/default-sizing.scss";
import "@silevis/reactgrid/cell-templates-default-colors.scss";
import { Box } from "@mui/material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const ModalListMenu = ({ value, func }) => {
  return (
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
  );
};

const ModalProfil = ({ value, func }) => {
  return (
    <Modal
      title={[
        <div key="test">
          <Typography.Text>{value.titleMenu}</Typography.Text>
        </div>,
      ]}
      open={value.openProfilModal}
      className="modal-menu"
      closable={false}
      onCancel={func.handleCancel}
      mask={false}
      footer={null}
    >
      <Box className="root-profile">
        <Box className="header-profile">
          <Box className="container-name" display="flex" flexDirection="row">
            {/* <img alt="logo" /> */}
            <AccountCircleTwoToneIcon />
            <Box className="ml-16">
              <Typography.Title className="txt-title">Hi, {value.user.name}</Typography.Title>
              <Typography.Text className="txt-sub">
                {value.user.username ?? "-"}
              </Typography.Text>
            </Box>
          </Box>
          <Box className="mt-16" display="flex" flexDirection="row">
            <GroupsOutlinedIcon />
            <Box className="ml-8">
              <Typography.Title className="txt-title">User group</Typography.Title>
              <Typography.Text className="txt-sub">
                {value.user.user_group ?? "-"}
              </Typography.Text>
            </Box>
          </Box>
          <Box className="mt-16" display="flex" flexDirection="row">
            <AlternateEmailRoundedIcon />
            <Box className="ml-8">
              <Typography.Title className="txt-title">Email</Typography.Title>
              <Typography.Text className="txt-sub">{value.user.email ?? "-"}</Typography.Text>
            </Box>
          </Box>
          <Box className="mt-16" display="flex" flexDirection="row">
            <BusinessRoundedIcon />
            <Box className="ml-8">
              <Typography.Title className="txt-title">Akses perusahaan</Typography.Title>
              <Box display="flex" flexDirection="column">
                {value.user.fullNameCompany !== null
                  ? value.user.fullNameCompany.map((e, i) => (
                      <Typography.Text key={i} className="txt-sub">
                        {e}
                      </Typography.Text>
                    ))
                  : "-"}
              </Box>
            </Box>
          </Box>
          <Box className="mt-16" display="flex" flexDirection="row">
            <PinDropOutlinedIcon />
            <Box className="ml-8">
              <Typography.Title className="txt-title">Kode Lokasi</Typography.Title>
              <Typography.Text className="txt-sub">
                {value.user.code_location ?? "-"}
              </Typography.Text>
            </Box>
          </Box>
          <Box className="mt-16" display="flex" flexDirection="row">
            <PeopleOutlineOutlinedIcon />
            <Box className="ml-8">
              <Typography.Title className="txt-title">kode Department</Typography.Title>
              <Typography.Text className="txt-sub">
                {value.user.code_department ?? "-"}
              </Typography.Text>
            </Box>
          </Box>
        </Box>

        <Box className="bottom-profile" display="flex" flexDirection="column">
          <Button
            className="no-padding"
            type="link"
            icon={<KeyOutlined />}
            onClick={func.onOpenModalForgetPassword}
          >
            Ganti Password
          </Button>
          <Button
            className="no-padding mt-2"
            type="link"
            danger
            icon={<LogoutOutlined />}
            onClick={func.onLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const ModalForgetPassword = ({ value, func }) => {
  return (
    <Modal
      open={value.openModalForgetPassword}
      className="modal-forget-password"
      // onCancel={func.onCancelYakin}
      footer={null}
    >
      <Typography.Title className="title" level={4}>
        Ganti Password
      </Typography.Title>
      <Form
        className="mt-16"
        onFinish={func.onClickYakin}
        layout="vertical"
        form={value.form}
        autoComplete="off"
      >
        <Form.Item name="old_password" label="Password Lama" required>
          <Input.Password
            placeholder="Input Password Lama"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item name="password" label="Password Baru" required>
          <Input.Password
            placeholder="Input Password Baru"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item name="password_confirmation" label="Konfirmasi Password baru" required>
          <Input.Password
            placeholder="Input Konfirmasi Password Baru"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item className="footer">
          <Button className="btn-kembali" type="text" onClick={func.onCancelYakin}>
            Cancel
          </Button>
          <Button className="btn-tambah" type="primary" htmlType="submit">
            Yakin
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalConfirm = ({ value, func }) => {
  return (
    <Modal
      open={value.openConfirm}
      className="modal-confirm"
      // onCancel={func.onCancelConfirm}
      footer={null}
      closable={false}
    >
      <Typography.Title className="title" level={4}>
        Anda Yakin Ingin Menyimpan Perubahan Ini ?
      </Typography.Title>
      <Box className="footer">
        <Button className="btn-kembali" type="text" onClick={func.onCancelConfirm}>
          Cancel
        </Button>
        <Button className="btn-confirm" type="primary" onClick={func.onClickConfirm}>
          Yakin
        </Button>
      </Box>
    </Modal>
  );
};

const MainPage = () => {
  const { func, value } = MainLogic();

  // cekToken(value.navigate);

  return (
    <Layout>
      <NavComponent func={func} value={value} />

      <ModalListMenu value={value} func={func} />
      <ModalProfil value={value} func={func} />
      <ModalForgetPassword value={value} func={func} />
      <ModalConfirm value={value} func={func} />

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
