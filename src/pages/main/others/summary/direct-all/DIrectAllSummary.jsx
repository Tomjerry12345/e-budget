import React from "react";

import DirectAllSummaryLogic from "./DirectAllSummaryLogic";
import HeaderComponent from "../../../../../component/header/HeaderComponent";
import FilterComponent from "../../../../../component/filter/FilterComponent";
import { ReactGrid } from "@silevis/reactgrid";
import "./style.css";

const DirectAllSummary = () => {
  const { value, func } = DirectAllSummaryLogic();

  return (
    <>
      <HeaderComponent
        type="summary"
        // onFinish={func.onFinish}
        onChangeFilter={(set) => {
          set(value.filter);
        }}
        onExport={func.downloadFile}
        disabledImportExport={value.rows.length <= 1}
      />

      <FilterComponent onFinish={func.onFinish} form={value.form} isCodeIcp isCodeProject />

      <div className="custom-root-layout">
        <div style={{ overflowX: "auto", overflowY: "auto" }}>
          <div
            style={{ width: "100%", height: "calc(100vh - 239px)" }}
            className="liquidity-planner-app"
          >
            <ReactGrid
              rows={value.rows}
              columns={value.columns}
              stickyTopRows={1}
              stickyLeftColumns={1}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectAllSummary;
