import React from "react";
import FilterComponent from "component/filter/FilterComponent";
import HeaderComponent from "component/header/HeaderComponent";
import { ReactGrid } from "@silevis/reactgrid";
import LoginNew from "./LogicNew";
import { constantExcellFile } from "values/Constant";
import { Button } from "antd";

const NewAsetInputPage = () => {
  const { value, func } = LoginNew();

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
        <div style={{ margin: "10px", height: "100%" }}>
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
              height: "100%"
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
                onCellsChanged={(change) => func.onChangeTable(change, "administrasi")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAsetInputPage;
