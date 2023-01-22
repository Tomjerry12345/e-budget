import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { CircularProgress } from "@mui/material";
import { Button, Form, Input, Progress, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect } from "react";
import "./style.scss";

const { Title, Text } = Typography;

const PopupModal = ({ open, succes, onOk, textSucces, textProses }) => {
  return (
    <Modal
      open={open}
      className="custom-upload-modal"
      footer={null}
      // onCancel={onCancel}
      closable={true}
      closeIcon={true}
    >
      {succes ? (
        <>
          <Progress percent={100} type="circle" />
          <Title
            style={{
              marginTop: 16,
            }}
            level={4}
          >
            {textSucces}
          </Title>
          <Button className="btn-succes" onClick={onOk} success>
            Oke
          </Button>
        </>
      ) : (
        <>
          <CircularProgress size={100} />
          <Title
            style={{
              marginTop: 16,
            }}
            level={4}
          >
            {textProses}
          </Title>
        </>
      )}
    </Modal>
  );
};

export default PopupModal;
