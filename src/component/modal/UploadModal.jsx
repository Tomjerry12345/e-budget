import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./UploadModal.scss";

const { Title, Text } = Typography;

const CustomFooterModal = () => (
  <>
    <Button className="btn-cancel" type="text">
      Cancel
    </Button>
    <Button className="btn-upload" type="primary">
      Upload
    </Button>
  </>
);

const UploadModal = ({ open, onCancel, value }) => {
  return (
    <Modal
      open={open}
      className="custom-upload-modal"
      footer={<CustomFooterModal />}
      onCancel={onCancel}
    >
      <Title level={4}>Upload Template</Title>
      <div className="root-content-upload" {...value.getRootProps()}>
        <Text className="title-upload">Upload Dokumen Template</Text>
        <div className="layout-upload-file">
          <input {...value.getInputProps()} />
          <CloudUploadOutlined />
          <Text className="txt-drag">Drag And Drop File</Text>
          <Text className="txt">or</Text>
          <Text className="txt-browse">Browse files</Text>

          {value.acceptedFiles.map((file) => (
            <Text className="txt-file">{file.path}</Text>
          ))}
        </div>

        <div className="layout-download-template">
          <Text className="txt-accepted">Accepted File Type .xlsx</Text>
          <Text className="txt-belum-mempunyai-template">
            Anda Belum Mempunyai Template ?
          </Text>
          <Button
            className="btn-download-template"
            type="primary"
            icon={<UploadOutlined className="custom-icon" />}
          >
            Download Template
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
