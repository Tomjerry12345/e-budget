import React from "react";
import CapexSummaryLogic from "./CapexSummaryLogic";
import TableComponent from "../../../../component/table/TableComponent";
import HeaderComponent from "../../../../component/header/HeaderComponent";
import FilterComponent from "../../../../component/filter/FilterComponent";

const CapexSummary = () => {
  const { value, func } = CapexSummaryLogic();

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
        // form={value.form}
      />

      <FilterComponent onFinish={func.onFinish} form={value.form} />

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

export default CapexSummary;
