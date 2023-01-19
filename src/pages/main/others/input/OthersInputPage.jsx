import { Card } from "@mui/material";
import { Table, Form, Input, Select, Button, Spin } from "antd";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { areEqual, log } from "../../../../values/Utilitas";
import OthersInputLogic from "./OthersInputLogic";
import { useParams } from "react-router-dom";
import FilterComponent from "../../../../component/filter/FilterComponent";
import TableComponent from "../../../../component/table/TableComponent";
import { UploadOutlined } from "@ant-design/icons";
import UploadModal from "../../../../component/modal/UploadModal";
import HeaderComponent from "../../../../component/header/HeaderComponent";

const othersInputPage = () => {
  const { value, func } = OthersInputLogic();

  return (
    <>
      <HeaderComponent
        type="input"
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
        downloadFile={value.endPFile}
        disabledImportExport={value.dataColumnInput.length <= 1}
        onChangeSelect={func.onChangeTahun}
        // form={value.form}
      />

      <FilterComponent onFinish={func.onFinish} form={value.form} />

      <div className="custom-root-layout">
        <TableComponent
          variant="input"
          dataSource={value.dataColumnInput}
          columns={value.columns}
          loading={value.loading}
          listKeyParent={value.listKeyParent}
        />
      </div>
      <UploadModal
        open={value.openUploadModal}
        onCancel={func.onCloseUploadModal}
        value={value}
        onOk={func.onUploadFile}
        file={`file/${value.endPFile}`}
      />
    </>
  );
};

export default othersInputPage;
