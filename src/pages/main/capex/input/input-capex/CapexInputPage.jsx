import React from "react";
import FilterComponent from "component/filter/FilterComponent";
import HeaderComponent from "component/header/HeaderComponent";
import { ReactGrid } from "@silevis/reactgrid";
import Logic from "./Logic";

const CapexInputPage = () => {
  const { value, func } = Logic();

  return (
    <>
      <HeaderComponent
        className="more-modal-width-type1"
        type="input"
        onUploadFile={func.onUploadFile}
        accesFile={value}
        downloadFile="file/capex/capex_direct.xlsx"
        // disabledImportExport={value.rows.length === 0}
        showType={true}
        showYear={true}
        listMenuImport={[
          {
            description: "capex",
            code_account: 0,
          },
        ]}
        dynamicFile={false}
      />

      <FilterComponent
        onFinish={func.onFinish}
        isCodeIcp
        isCodeProject
        type="input"
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

export default CapexInputPage;
