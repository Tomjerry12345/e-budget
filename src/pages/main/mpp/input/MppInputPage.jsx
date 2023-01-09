import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import FilterComponent from "../../../../component/filter/FilterComponent";
import HeaderComponent from "../../../../component/header/HeaderComponent";
import UploadModal from "../../../../component/modal/UploadModal";
import TableComponent from "../../../../component/table/TableComponent";
import MppInputLogic from "./MppInputLogic";

const MppInputPage = () => {
  const { value, func } = MppInputLogic();

  return (
    <>
      <HeaderComponent
        type="input"
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
        downloadFile="file/mpp.xlsx"
        disabledImportExport={value.dataColumnInput.length <= 1}
        onChangeSelect={func.onChangeTahun}
      />

      <div className="custom-root-layout">
        <TableComponent
          variant="input"
          dataSource={value.dataColumnInput}
          columns={value.columns}
          loading={value.loading}
          listKeyParent={value.listKeyParent}
        />
      </div>
    </>
  );
};

export default MppInputPage;
