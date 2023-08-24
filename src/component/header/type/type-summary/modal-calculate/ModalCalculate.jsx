import { UploadOutlined } from "@ant-design/icons";
import { Button, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { formDataUtils, log } from "values/Utilitas";
import { useState } from "react";
import MainServices from "services/MainServices";
import { val } from "redux/action/action.reducer";

const { Title } = Typography;

const ModalCalculate = ({ open, onCancel, title, linkCalculate }) => {
  const [dataPeriode, setDataPeriode] = useState(null);

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

  const dispatch = useDispatch();

  const showNotif = (status, message) => {
    dispatch(
      val({
        status: status,
        message: message,
      })
    );
  };

  const onCalculate = async () => {
    try {
      const url = `${linkCalculate}`;

      await MainServices.get(url, {
        year: dataPeriode,
      });
      showNotif(200, "Sukses calculate data");
      onCancel();
    } catch (e) {
      showNotif(400, e.message);
    }
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
          onClick={onCalculate}
          disabled={dataPeriode === null}
          // icon={<UploadOutlined className="custom-icon" />}
        >
          Calculate data
        </Button>
      </div>
    </Modal>
  );
};

export default ModalCalculate;
