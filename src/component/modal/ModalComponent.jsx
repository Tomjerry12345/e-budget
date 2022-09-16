import { Modal } from "antd";

const ModalComponent = ({ open }) => {
  return (
    <Modal title="Basic Modal" open={open}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ModalComponent;
