import { Table, Form, Button, Select, Spin } from "antd";
import { Card } from "@mui/material";
import React from "react";
import MppSummaryLogic from "./MppSummaryLogic";
import FilterComponent from "../../../../component/filter/FilterComponent";
import HeaderComponent from "../../../../component/header/HeaderComponent";
import TableComponent from "../../../../component/table/TableComponent";

const MppSummary = () => {
  const { value, func } = MppSummaryLogic();

  return (
    <>
      <HeaderComponent
        type="summary"
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        onExport={func.downloadFile}
        disabledImportExport={value.dataColumn.length <= 1}
      />

      <FilterComponent onFinish={func.onFinish} isCodeIcp isCodeProject />

      <div className="custom-root-layout">
        <TableComponent
          dataSource={value.dataColumn}
          columns={value.tableColumn}
          loading={value.loading}
          type="type-2"
        />
      </div>
    </>
  );
};

export default MppSummary;
