import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect } from "react";
import "./style.scss";

const { Title, Text } = Typography;

const CustomFooterModal = ({ onOk, onCancel, loading }) => (
  <>
    <Button className="btn-cancel" type="text" onClick={onCancel}>
      Cancel
    </Button>
    <Button
      className="btn-upload"
      type="primary"
      onClick={onOk}
      loading={loading}
    >
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
  onChangeSelect,
}) => {
  const downloadFile = () => {
    window.location.href = `${process.env.PUBLIC_URL}/${file}`;
  };

  const dateNow = new Date().getFullYear();

  // const listTahun = [
  //   {
  //     label: "2012",
  //     value: "2012",
  //   },
  //   {
  //     label: "2013",
  //     value: "2013",
  //   },
  //   {
  //     label: "2014",
  //     value: "2014",
  //   },
  //   {
  //     label: "2015",
  //     value: "2015",
  //   },
  //   {
  //     label: "2016",
  //     value: "2016",
  //   },
  //   {
  //     label: "2017",
  //     value: "2017",
  //   },
  //   {
  //     label: "2018",
  //     value: "2018",
  //   },
  //   {
  //     label: "2019",
  //     value: "2019",
  //   },
  //   {
  //     label: "2020",
  //     value: "2020",
  //   },
  //   {
  //     label: "2021",
  //     value: "2021",
  //   },
  //   {
  //     label: "2022",
  //     value: "2022",
  //   },
  //   {
  //     label: "2023",
  //     value: "2023",
  //   },
  // ];

  const listTahun = [];

  for (let i = dateNow - 2; i <= dateNow + 1; i++) {
    listTahun.push({
      label: i,
      value: i,
    });
  }

  return (
    <Modal
      open={open}
      className="custom-upload-modal"
      footer={
        <CustomFooterModal onOk={onOk} onCancel={onCancel} loading={loading} />
      }
      onCancel={onCancel}
    >
      <Title level={4}>Import</Title>
      <div className="root-content-upload">
        <Text className="title-upload">Tahun</Text>
        <Select
          className="select-style"
          onSelect={onChangeSelect}
          options={listTahun}
          // value={}
          defaultValue={dateNow}
        />
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

          <div className="layout-download-template">
            <Text className="txt-accepted">Accepted File Type .xlsx</Text>
            <Text className="txt-belum-mempunyai-template">
              Anda Belum Mempunyai Template ?
            </Text>
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
      </div>
    </Modal>
  );
};

export default ImportInputModal;
