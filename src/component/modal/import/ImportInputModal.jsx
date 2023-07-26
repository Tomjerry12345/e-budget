import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Radio, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { actionData } from "redux/data-global/data.reducer";
import { log } from "values/Utilitas";

const { Title, Text } = Typography;

const CustomFooterModal = ({ onOk, onCancel, loading }) => (
  <>
    <Button className="btn-cancel" type="text" onClick={onCancel}>
      Cancel
    </Button>
    <Button className="btn-upload" type="primary" onClick={onOk} loading={loading}>
      Upload
    </Button>
  </>
);

const ImportInputModal = ({
  open,
  onCancel,
  value,
  onOk,
  file,
  loading,
  title,
  type = false,
}) => {
  const dispatch = useDispatch();
  const dataGlobalRedux = useSelector((state) => state.data);

  const downloadFile = () => {
    window.location.href = `${process.env.PUBLIC_URL}/${file}`;
  };

  const onChange = (e) => {
    dispatch(actionData({ typeRevenueImport: e.target.value }));
  };

  return (
    <Modal
      open={open}
      className="custom-upload-modal"
      footer={<CustomFooterModal onOk={onOk} onCancel={onCancel} loading={loading} />}
      onCancel={onCancel}
    >
      <Title level={4}>{title}</Title>
      <div className="root-content-upload">
        <div {...value.getRootProps()}>
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
        </div>

        {type ? (
          <Radio.Group
            className="type-style"
            onChange={onChange}
            value={dataGlobalRedux.typeRevenueImport ?? "actual"}
          >
            <Radio value="actual">Actual - Forecast</Radio>
            <Radio value="budget">Budget</Radio>
          </Radio.Group>
        ) : null}

        <div className="layout-download-template">
          <Text className="txt-accepted">Accepted File Type .xlsx</Text>
          <Text className="txt-belum-mempunyai-template">Anda Belum Mempunyai Template ?</Text>
          <Button
            className="btn-download-template"
            type="primary"
            onClick={downloadFile}
            icon={<UploadOutlined className="custom-icon" />}
          >
            Download Template
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImportInputModal;
