import { Button, Switch, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import Title from "antd/lib/typography/Title";
import "./style.scss";



const CustomFooterModal = ({ onOk }) => (
  <>
    {/* <Button className="btn-cancel" type="text" onClick={onCancel}>
        Cancel
      </Button> */}
    <Button className="btn-ok" type="primary" onClick={onOk}>
      Ok
    </Button>
  </>
);

const ModalListPerusahaan = ({ open, data, onCancel, onOk }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={<CustomFooterModal onOk={onOk} />}
    >
      <Title level={4}>List perusahaan</Title>

      <div className="root-list-perusahaan">
        {data.map((val) => (
          <div className="children-list-perusahaan">
            <Typography.Text level={2}>{val.code} - {val.description}</Typography.Text>
            <Switch defaultChecked checked={val.status}/>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ModalListPerusahaan;
