import { Button } from "antd";
import FilterComponent from "../../../../component/filter/FilterComponent";
import TableComponent from "../../../../component/table/TableComponent";
import LabaRugiLogic from "./LabaRugiLogic";
import { UploadOutlined } from "@ant-design/icons";

const LabaRugiPage = () => {
  const { value, func } = LabaRugiLogic();
  return (
    <>
      <FilterComponent type={2} isCodeProduct={true} onFinish={func.onFinish} />

      <div className="custom-root-layout">
        {value.data.length > 1 ? (
          <div className="layout-btn-action">
            <Button className="btn-download-template" type="primary" onClick={func.downloadFile} icon={<UploadOutlined className="custom-icon" />}>
              Download
            </Button>
          </div>
        ) : null}

        <TableComponent dataSource={value.data} columns={value.columns} loading={value.loading} />
      </div>
    </>
  );
};

export default LabaRugiPage;
