import { UploadOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import Input from "antd/lib/input/Input";
import UploadModal from "../../../../component/modal/UploadModal";
import TableComponent from "../../../../component/table/TableComponent";
import DepartementLogic from "./DepartementLogic";

const DepartementPage = () => {
  const { value, func } = DepartementLogic();
  return (
    <>
      <div className="custom-root-layout">
        <div className="top-content">
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
        </div>
        <TableComponent
          dataSource={value.dataColumn}
          columns={value.columns}
          loading={value.loading}
          scroll={{
            y: value.size.y - 246,
          }}
        />
      </div>

      <UploadModal open={value.openUploadModal} onCancel={func.onCloseUploadModal} value={value} onOk={func.onUploadFile} file={`file/departement.xlsx`} />
    </>
  );
};

export default DepartementPage;
