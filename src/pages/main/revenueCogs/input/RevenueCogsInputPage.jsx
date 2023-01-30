import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import FilterComponent from "../../../../component/filter/FilterComponent";
import HeaderComponent from "../../../../component/header/HeaderComponent";
import UploadModal from "../../../../component/modal/UploadModal";
import TableComponent from "../../../../component/table/TableComponent";
import RevenueCogsInputLogic from "./RevenueCogsInputLogic";

const RevenueCogsInputPage = () => {
  const { value, func } = RevenueCogsInputLogic();

  return (
    <>
      {/* <FilterComponent type={2} isCodeProduct={true} isCodeProject={true}   form={value.form} onFinish={func.onFinish} /> */}

      <HeaderComponent
        type="revenue-input"
        onFinish={func.onFinish}
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
        downloadFile="file/revenue.xlsx"
        disabledImportExport={value.dataColumnInput.length <= 1}
        onChangeSelect={func.onChangeTahun}
      />

      <FilterComponent
        onFinish={func.onFinish}
        isCodeIcp
        isCodeProject
        type="input"
      />

      <div className="custom-root-layout">
        {/* {value.dataColumnInput.length > 1 ? (
          <div className="layout-btn-action">
            <Button
              className="btn-update"
              type="primary"
              icon={<UploadOutlined className="custom-icon" />}
              onClick={func.onOpenUploadModal}
            >
              Update
            </Button>
          </div>
        ) : null} */}

        <TableComponent
          variant="input"
          dataSource={value.dataColumnInput}
          columns={value.columns}
          loading={value.loading}
          listKeyParent={value.listKeyParent}
        />
      </div>
      {/* <UploadModal
        open={value.openUploadModal}
        onCancel={func.onCloseUploadModal}
        value={value}
        onOk={func.onUploadFile}
        file="file/revenue-cogs.xlsx"
        loading={value.loadingUpload}
      /> */}
    </>
  );
};

export default RevenueCogsInputPage;
