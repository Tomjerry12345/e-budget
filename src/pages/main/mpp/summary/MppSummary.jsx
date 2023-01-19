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
        // onFinish={func.onFinish}
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        onExport={func.downloadFile}
        disabledImportExport={value.dataColumn.length <= 1}
      />

      <FilterComponent onFinish={func.onFinish} />

      <div className="custom-root-layout">
        {/* {value.dataColumn.length > 1 ? (
          
        ) : null} */}
        <TableComponent
          dataSource={value.dataColumn}
          columns={value.tableColumn}
          loading={value.loading}
        />
      </div>
    </>
  );
};

export default MppSummary;
