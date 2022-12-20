import { Button } from "antd";
import FilterComponent from "../../../../component/filter/FilterComponent";
import TableComponent from "../../../../component/table/TableComponent";
import LabaRugiLogic from "./LabaRugiLogic";
import { UploadOutlined } from "@ant-design/icons";
import UploadModal from "../../../../component/modal/UploadModal";

const LabaRugiPage = () => {
  const { value, func } = LabaRugiLogic();
  return (
    <>
      <FilterComponent type={2} isCodeProduct={true} onFinish={func.onFinish} />

      <div className="custom-root-layout">
        <div className="layout-btn-action">
          <Button className="btn-update" type="primary" icon={<UploadOutlined className="custom-icon" />} onClick={func.onOpenUploadModal}>
            Update
          </Button>
        </div>
        <TableComponent dataSource={value.data} columns={value.columns} loading={value.loading} />
      </div>

      <UploadModal open={value.openUploadModal} onCancel={func.onCloseUploadModal} value={value} onOk={func.onUploadFile} />
    </>
  );
};

export default LabaRugiPage;
