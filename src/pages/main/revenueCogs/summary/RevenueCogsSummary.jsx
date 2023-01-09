import React from "react";
import RevenueCogsSummaryLogic from "./RevenueCogsSummaryLogic";
import TableComponent from "../../../../component/table/TableComponent";
import HeaderComponent from "../../../../component/header/HeaderComponent";

const RevenueCogsSummary = () => {
  const { value, func } = RevenueCogsSummaryLogic();

  return (
    <>
      <HeaderComponent
        type="summary"
        onFinish={func.onFinish}
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        onExport={func.downloadFile}
        disabledImportExport={value.dataColumn.length <= 1}
      />

      <div className="custom-root-layout">
        <TableComponent
          dataSource={value.dataColumn}
          columns={value.tableColumn}
          loading={value.loading}
        />
      </div>
    </>
  );
};

export default RevenueCogsSummary;
