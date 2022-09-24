import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
// import { Link } from "react-router-dom";
import { log } from "../../values/Utilitas";
import "./UploadModal.scss";

const { Title, Text } = Typography;

const CustomFooterModal = ({ onOk, onCancel }) => (
  <>
    <Button className="btn-cancel" type="text" onClick={onCancel}>
      Cancel
    </Button>
    <Button className="btn-upload" type="primary" onClick={onOk}>
      Upload
    </Button>
  </>
);

const UploadModal = ({ open, onCancel, value, onOk }) => {
  log(`${process.env.PUBLIC_URL}/file/${value.params.item}.xlsx`);
  return (
    <Modal
      open={open}
      className="custom-upload-modal"
      footer={<CustomFooterModal onOk={onOk} onCancel={onCancel} />}
      onCancel={onCancel}
    >
      <Title level={4}>Upload Template</Title>
      <div className="root-content-upload" {...value.getRootProps()}>
        <Text className="title-upload">Upload Dokumen Template</Text>
        <div className="layout-upload-file">
          <input key="1011" {...value.getInputProps()} />
          <CloudUploadOutlined />
          <Text className="txt-drag">Drag And Drop File</Text>
          <Text className="txt">or</Text>
          <Text className="txt-browse">Browse files</Text>

          {value.acceptedFiles.map((file) => (
            <Text key="1000" className="txt-file">
              {file.path}
            </Text>
          ))}
        </div>

        <div className="layout-download-template">
          <Text className="txt-accepted">Accepted File Type .xlsx</Text>
          <Text className="txt-belum-mempunyai-template">
            Anda Belum Mempunyai Template ?
          </Text>
          {/* <Link
            to={`${process.env.PUBLIC_URL}/file/${value.params.item}.xlsx`}
            target="_blank"
            download
          >
            Download
          </Link> */}
          <Button
            className="btn-download-template"
            type="primary"
            href={`${process.env.PUBLIC_URL}/file/${value.params.item}.xlsx`}
            icon={<UploadOutlined className="custom-icon" />}
            download={`${value.params.item}.xlsx`}
            // download="code_account.xlsx"
          >
            Download Template
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
