import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import HeaderComponent from "../../../../component/header/HeaderComponent";
import UploadModal from "../../../../component/modal/UploadModal";
import TableComponent from "../../../../component/table/TableComponent";
import OpexInputLogic from "./OpexInputLogic";

const OpexInputPage = () => {
  const { value, func } = OpexInputLogic();

  return (
    <>
      <HeaderComponent form={value.form} onFinish={func.onFinish} />
      <div className="custom-root-layout">
        {value.dataColumnInput.length > 1 ? (
          <div className="layout-btn-action">
            <Button className="btn-update" type="primary" icon={<UploadOutlined className="custom-icon" />} onClick={func.onOpenUploadModal}>
              Update
            </Button>
          </div>
        ) : null}
        <TableComponent variant="input" dataSource={value.dataColumnInput} columns={value.columns} loading={value.loading} listKeyParent={value.listKeyParent} />
      </div>
      <UploadModal open={value.openUploadModal} onCancel={func.onCloseUploadModal} value={value} onOk={func.onUploadFile} file="file/opex.xlsx" loading={value.loadingUpload} />
    </>
  );
};

export default OpexInputPage;
