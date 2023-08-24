import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Radio, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { actionData } from "redux/data-global/data.reducer";
import { log } from "values/Utilitas";
import AutoCompleteElement from "component/element/auto-complete/AutoCompleteElement";
import { useState } from "react";
import MainServices from "services/MainServices";

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

const ModalExportSummaryDirectAll = ({
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

  const [dataPeriode, setDataPeriode] = useState(null);
  // const [disable, setDisable] = useState(true);

  const date = new Date();

  const periode = [
    {
      value: `${date.getFullYear() - 2}`,
      label: `${date.getFullYear() - 2}`,
    },
    {
      value: `${date.getFullYear() - 1}`,
      label: `${date.getFullYear() - 1}`,
    },
    {
      value: `${date.getFullYear()}`,
      label: `${date.getFullYear()}`,
    },
    {
      value: `${date.getFullYear() + 1}`,
      label: `${date.getFullYear() + 1}`,
    },
  ];

  const onExport = async () => {
    // window.location.href = `${process.env.PUBLIC_URL}/${file}`;
    const filename = "data-to-oracle";
    const url = `directall/export-to-oracle?year=${dataPeriode}&filename=${filename}`;
    const res = await MainServices.download(url);
    log({ res });
    const fileURL = URL.createObjectURL(res.data);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `summary_${filename}`;
    link.click();
    onCancel();
  };

  const onSelect = (e) => {
    log("e.target.value", e);
    setDataPeriode(e);
    // dispatch(actionData({ typeRevenueImport: e.target.value }));
  };

  return (
    <Modal open={open} className="summary-direct-all" footer={null} onCancel={onCancel}>
      <Title level={4}>{title}</Title>
      <div className="root-content-upload">
        <Select
          onSelect={onSelect}
          placeholder="periode"
          style={{
            width: "182px",
          }}
          options={periode}
        />
        <Button
          className="btn-download-template"
          type="primary"
          onClick={onExport}
          disabled={dataPeriode === null}
          icon={<UploadOutlined className="custom-icon" />}
        >
          Export data
        </Button>
      </div>
    </Modal>
  );
};

export default ModalExportSummaryDirectAll;
