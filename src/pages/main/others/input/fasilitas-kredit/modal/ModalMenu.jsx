const { Modal, Button } = require("antd");

export const ModalMenu = ({ open, onCancel, disabled, listMenu }) => {
  return (
    <Modal
      className={`more-modal`}
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      closable={false}
      mask={false}
    >
      {listMenu.map((e, i) => (
        <Button
          key={i}
          className="btn"
          type="text"
          disabled={disabled}
          onClick={() => {
            e.func();
            onCancel();
          }}
        >
          {e.desc}
        </Button>
      ))}
    </Modal>
  );
};
