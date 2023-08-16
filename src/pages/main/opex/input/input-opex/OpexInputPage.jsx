import React from "react";
import FilterComponent from "component/filter/FilterComponent";
import HeaderComponent from "component/header/HeaderComponent";
import { ReactGrid } from "@silevis/reactgrid";
import Logic from "./Logic";
import { constantExcellFile } from "values/Constant";

const OpexInputPage = () => {
  const { value, func } = Logic();

  return (
    <>
      <HeaderComponent
        className="more-modal-width-type1"
        type="input"
        // onFinish={func.onFinish}
        onUploadFile={func.onUploadFile}
        accesFile={value}
        downloadFile={constantExcellFile["opex"]["template-4"]}
        disabledImportExport={value.rows.length === 0}
        showType={true}
        listMenuImport={[
          {
            description: "opex",
            code_account: 0,
          },
        ]}
        dynamicFile={true}
      />

      <FilterComponent onFinish={func.onFinish} isCodeIcp isCodeProject type="input" />

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
                onCellsChanged={(change) => func.onChangeTable(change)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpexInputPage;
