import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import { Button, Divider, notification, Space } from "antd";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { val } from "../../redux/action/action.reducer";
const Context = React.createContext({
  name: "Default",
});

const NotificationComponent = ({ status, message }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    // var doc = new DOMParser().parseFromString(message, "text/xml");
    if (parseInt(status) === 200) {
      api.success({
        message: `Notifikasi`,
        description: <div style={{ whiteSpace: "pre-line" }}>{message}</div>,
        placement,
        className: "style-notif",
        duration: 1,
      });
    } else {
      api.error({
        message: `Notifikasi`,
        description: <Context.Consumer>{({ name }) => message}</Context.Consumer>,
        placement,
        className: "style-notif",
        duration: 1,
      });
    }
  };
  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const dispacth = useDispatch();

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      {status !== 0
        ? setTimeout(() => {
            openNotification("bottomRight");

            dispacth(val({ status: 0, message: "" }));
          }, 100)
        : null}
    </Context.Provider>
  );
};

export default NotificationComponent;
