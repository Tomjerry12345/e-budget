import { Table, Form, Input, Button, Modal, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CoaInputLogic from "./CoaLogic";
import "./CoaStyle.scss";
import UploadModal from "../../../component/modal/UploadModal";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { classx } from "../../../values/Utilitas";
import HeaderComponent from "../../../component/header/HeaderComponent";

const EditableContext = createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const setXColumn = (params) => {
  return params === "Kode perusahaan" ||
    params === "Kode departemen" ||
    params === "Kode akun" ||
    params === "Kode ICP"
    ? null
    : 1600;
};

const CustomFooter = ({ onOk, onCancel }) => (
  <>
    <Button onClick={onCancel}>Batal</Button>
    <Button onClick={onOk}>Hapus</Button>
  </>
);

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const CoaPage = () => {
  const { value, func } = CoaInputLogic();

  const status = value.openAction.status;

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const customClass = classx({
    "custom-action-modal":
      status === "edit"
        ? setXColumn(value.params.item) === null
          ? false
          : true
        : false,
  });

  return (
    <>
      <HeaderComponent
        type="coa"
        // onFinish={func.onFinish}
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        onChangeLoadingUpload={(set, setImport) => {
          set(value.loadingUpload);

          if (value.uploadSucces === true) {
            setImport(false);
            func.setUploadSucces(null);
          }
        }}
        onUploadFile={func.onUploadFile}
        accesFile={value}
        downloadFile="file/mpp.xlsx"
        onChangeSelect={func.onChangeTahun}
      />

      <div className="custom-root-layout">
        {/* <div className="top-content">
        <Form className="form-cari" layout="vertical">
          <Form.Item>
            <Input placeholder="Cari data di sini..." />
          </Form.Item>
          <Button className="btn-cari" type="primary">
            Cari
          </Button>
        </Form>

        <div className="layout-btn-action">
          <Button className="btn-update" type="primary" icon={<UploadOutlined className="custom-icon" />} onClick={func.onOpenUploadModal}>
            Update
          </Button>
        </div>
      </div> */}

        <Table
          rowKey="id"
          size="small"
          rowClassName="child"
          columns={value.columns}
          pagination={false}
          rowSelection={{
            ...rowSelection,
            // checkStrictly,
          }}
          dataSource={value.dataColumn}
          scroll={{
            x: setXColumn(value.params.item),
            y: value.size.y - 246,
          }}
        />

        <UploadModal
          open={value.openUploadModal}
          onCancel={func.onCloseUploadModal}
          value={value}
          onOk={func.onUploadFile}
          file={`file/${value.params.item}.xlsx`}
        />

        <Modal
          className={customClass}
          open={value.openAction.open}
          onCancel={func.onCancel}
          closable={true}
          title="Ubah Data"
          footer={
            status === "edit" ? null : (
              <CustomFooter onOk={func.onDelete} onCancel={func.onCancel} />
            )
          }
        >
          <Form layout="vertical" ref={value.ref} onFinish={func.onEdit}>
            {value.openAction.status === "edit" ? (
              <>
                {value.req.map((val, i) => (
                  <Form.Item
                    key={i}
                    name={val.key}
                    rules={[{ required: true, message: "Tidak Boleh Kosong" }]}
                  >
                    <Input placeholder={val.placeholder} />
                  </Form.Item>
                ))}

                <Form.Item>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <Button
                      onClick={func.onCancel}
                      style={{
                        marginRight: "16px",
                      }}
                    >
                      Batal
                    </Button>
                    <Button htmlType="submit">Ubah</Button>
                  </div>
                </Form.Item>
              </>
            ) : (
              <Typography.Text>
                Apakah Anda ingin menghapus item ?
              </Typography.Text>
            )}
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default CoaPage;
