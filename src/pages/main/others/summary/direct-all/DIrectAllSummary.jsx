import React from "react";
import FilterComponent from "component/filter/FilterComponent";
import HeaderComponent from "component/header/HeaderComponent";
import { ReactGrid } from "@silevis/reactgrid";
import Logic from "./Logic";

const DIrectAllSummary = () => {
  const { value, func } = Logic();

  return (
    <>
      <HeaderComponent
        type="summary-direct-all"
        listMenu={[
          // {
          //   description: "direct all",
          //   before: value.linkExport === null,
          // },
          {
            description: "direct all",
            disabled: value.rows.length === 0,
          },
          {
            description: "data oracle",
            disabled: false,
          },
        ]}
        linkExport={value.linkExport}
      />

      <FilterComponent onFinish={func.onFinish} isCodeIcp isCodeProject type="summary" />

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
                stickyLeftColumns={2}
                onCellsChanged={(change) => func.onChangeTable(change)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DIrectAllSummary;
