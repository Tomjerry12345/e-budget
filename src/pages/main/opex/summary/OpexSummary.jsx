import { Table, Form, Button, Select, Spin } from "antd";
import { Card } from "@mui/material";
import React from "react";
import OpexSummaryLogic from "./OpexSummaryLogic";
import FilterComponent from "../../../../component/filter/FilterComponent";
import HeaderComponent from "../../../../component/header/HeaderComponent";
import TableComponent from "../../../../component/table/TableComponent";

const OpexSummary = () => {
  const { value, func } = OpexSummaryLogic();

  return (
    <>
      <HeaderComponent
        type="summary"
        onFinish={func.onFinish}
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        onChangeLoadingUpload={(set, setImport) => {
          set(value.loadingUpload);

          if (value.uploadSucces === true) {
            setImport(false);
          }
        }}
        onUploadFile={func.onUploadFile}
        downloadFile="file/opex.xlsx"
        disabledImportExport={value.dataColumn.length <= 1}
      />

      <div className="custom-root-layout">
        {/* {value.dataColumn.length > 1 ? (
          <Table
            rowClassName="child"
            bordered
            dataSource={value.dataColumn}
            columns={value.tableColumn}
            pagination={false}
            size="small"
            loading={value.loading}
            scroll={{
              y: value.size.y - 313,
            }}
            rowKey="id"
          />
        ) : value.loading === true ? (
          <div className="style-progress">
            <Spin />
          </div>
        ) : null} */}
        {value.dataColumn.length > 1 ? (
          <TableComponent
            dataSource={value.dataColumn}
            columns={value.tableColumn}
            loading={value.loading}
          />
        ) : null}
      </div>
    </>
  );
};

export default OpexSummary;
