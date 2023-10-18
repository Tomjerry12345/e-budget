import { Button, Layout, List, Modal, Space, Typography } from "antd";
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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { KeyOutlined, LogoutOutlined } from "@ant-design/icons";

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
            <AccountCircleOutlinedIcon />
            <Box className="ml-16">
              <Typography.Title className="txt-title">HI, {value.user.name}</Typography.Title>
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
          <Button className="no-padding" type="link" icon={<KeyOutlined />}>
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

const MainPage = () => {
  const { func, value } = MainLogic();

  // cekToken(value.navigate);

  return (
    <Layout>
      <NavComponent func={func} value={value} />

      <ModalListMenu value={value} func={func} />

      <ModalProfil value={value} func={func} />

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
