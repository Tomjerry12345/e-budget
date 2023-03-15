import { Table, Form, Button, Select, Spin } from "antd";
import { Card } from "@mui/material";
import React from "react";
import OthersSummaryLogic from "./OthersSummaryLogic";
import FilterComponent from "../../../../component/filter/FilterComponent";
import HeaderComponent from "../../../../component/header/HeaderComponent";
import TableComponent from "../../../../component/table/TableComponent";

const OthersSummary = () => {
  const { value, func } = OthersSummaryLogic();

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

      <FilterComponent
        onFinish={func.onFinish}
        form={value.form}
        isCodeIcp
        isCodeProject
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

export default OthersSummary;
