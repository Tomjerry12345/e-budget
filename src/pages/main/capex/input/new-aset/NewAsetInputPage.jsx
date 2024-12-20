import React from "react";
import FilterComponent from "component/filter/FilterComponent";
import HeaderComponent from "component/header/HeaderComponent";
import { ReactGrid } from "@silevis/reactgrid";
import LogicNew from "./LogicNew";
import { constantExcellFile } from "values/Constant";
import { Button } from "antd";
import { ActionCellTemplate } from "./ActionCellTemplate";

const NewAsetInputPage = () => {
  const { value, func } = LogicNew();

  return (
    <>
      <HeaderComponent
        className="more-modal-width-type1"
        type="input"
        // onFinish={func.onFinish}
        onUploadFile={func.onUploadFile}
        accesFile={value}
        downloadFile={constantExcellFile["opex"]["template-5"]}
        // disabledImportExport={
        //   value.rows.pemasaran.length === 0 && value.rows.administrasi.length === 0
        // }
        onChangeSelect={func.onChangeTahun}
        hideAction={true}
        // listMenuImport={value.items.pemasaran.concat(value.items.administrasi)}
      />

      <FilterComponent
        onFinish={func.onFinish}
        isCodeProduct
        isCodeProject
        isCodeLocation
        isCodeIcp
        isCodeDept
        type="input"
      />

      <div className="custom-root-layout">
        <div style={{ margin: "10px" }}>
          {value.rows.length > 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button className="btn-tambah-row" onClick={() => func.onTambahRow()}>
                Tambah Data
              </Button>
            </div>
          ) : null}

          <div
            style={{
              overflowX: "auto",
              overflowY: "auto",
              marginBottom: 16,
              paddingBottom: 16,
              height: "100%",
            }}
          >
            <div
              style={{ width: "100%", height: "calc(100vh - 348px)" }}
              className="liquidity-planner-app"
            >
              <ReactGrid
                rows={value.rows}
                columns={value.columns}
                stickyTopRows={2}
                stickyLeftColumns={2}
                customCellTemplates={{ id: new ActionCellTemplate() }}
                onCellsChanged={(change) => func.onChangeTable(change, "administrasi")}
              />
            </div>
          </div>
        </div>
        {value.contextHolder}
      </div>
    </>
  );
};

export default NewAsetInputPage;
