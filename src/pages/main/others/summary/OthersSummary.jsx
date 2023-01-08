import { Table, Form, Button, Select, Spin } from "antd";
import { Card } from "@mui/material";
import React from "react";
import OthersSummaryLogic from "./OthersSummaryLogic";
import FilterComponent from "../../../../component/filter/FilterComponent";

const OthersSummary = () => {
  const { value, func } = OthersSummaryLogic();

  return (
    <>
      <FilterComponent
        type={2}
        isCodeProduct={true}
        form={value.form}
        onFinish={func.onFinish}
      />

      <div className="custom-root-layout">
        {/* <Button style={{ marginBottom: "16px" }} onClick={func.onTambahData}>
          Tambah Data
        </Button> */}

        {value.dataColumn.length > 1 ? (
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
        ) : null}
      </div>
    </>
  );
};

export default OthersSummary;
