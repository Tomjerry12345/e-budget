import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import FilterComponent from "../../../../component/filter/FilterComponent";
import UploadModal from "../../../../component/modal/UploadModal";
import TableComponent from "../../../../component/table/TableComponent";
import CapexInputLogic from "./CapexInputLogic";

const CapexInputPage = () => {
  const { value, func } = CapexInputLogic();

  return (
    <>
      <FilterComponent type={2} isCodeProduct={true} onFinish={func.onFinish} />

      <div className="custom-root-layout">
        {value.dataColumnInput.length > 1 ? (
          <div className="layout-btn-action">
            <Button className="btn-update" type="primary" icon={<UploadOutlined className="custom-icon" />} onClick={func.onOpenUploadModal}>
              Update
            </Button>
          </div>
        ) : null}

        <TableComponent variant="input" dataSource={value.dataColumnInput} columns={value.columns} loading={value.loading} listKeyParent={value.listKeyParent} test="" />
      </div>
      <UploadModal open={value.openUploadModal} onCancel={func.onCloseUploadModal} value={value} onOk={func.onUploadFile} file="file/capex.xlsx" />
    </>
  );
};

export default CapexInputPage;
