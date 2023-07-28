import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal, Typography } from "antd";

const NotifComponent = ({ open, onOk, onCancel }) => {
  return (
    <Modal title="Notification" open={open} onOk={onOk} onCancel={onCancel}>
      <div className="root-notif-custom">
        <CloseCircleOutlined style={{ fontSize: "100px" }} />
        <Typography.Text>Password Gagal</Typography.Text>
      </div>
    </Modal>
  );
};

export default NotifComponent;
