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
        // onFinish={func.onFinish}
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        disabledImportExport={value.dataColumn.length <= 1}
      />

      <FilterComponent onFinish={func.onFinish} isCodeIcp isCodeProject />

      <div className="custom-root-layout">
        {value.dataColumn.length > 1 ? (
          <TableComponent
            dataSource={value.dataColumn}
            columns={value.tableColumn}
            loading={value.loading}
            type="type-2"
          />
        ) : null}
      </div>
    </>
  );
};

export default OpexSummary;
