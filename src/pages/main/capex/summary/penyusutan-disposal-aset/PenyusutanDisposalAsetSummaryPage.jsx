import React from "react";
import FilterComponent from "component/filter/FilterComponent";
import HeaderComponent from "component/header/HeaderComponent";
import { ReactGrid } from "@silevis/reactgrid";
import Logic from "./Logic";

const PenyusutanDisposalAsetSummaryPage = () => {
  const { value, func } = Logic();

  return (
    <>
      <HeaderComponent type="summary" listMenu={[]} disabledMenu={true} linkExport={""} />

      <FilterComponent
        onFinish={func.onFinish}
        isCodeProduct={false}
        isCodeProject={false}
        isCodeLocation={false}
        isCodeIcp={false}
        isCodeDept={false}
      />

      <div className="custom-root-layout">
        <div style={{ margin: "10px" }}>
          <div
            style={{
              overflowX: "auto",
              overflowY: "auto",
              marginBottom: 16,
              paddingBottom: 16,
            }}
          >
            <div
              style={{ width: "100%", maxHeight: "calc(100vh - 239px)" }}
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
      </div>
    </>
  );
};

export default PenyusutanDisposalAsetSummaryPage;
