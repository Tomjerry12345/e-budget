import React from "react";
import FilterComponent from "../../../../../component/filter/FilterComponent";
import HeaderComponent from "../../../../../component/header/HeaderComponent";
import { Button, Typography } from "antd";
import { ReactGrid } from "@silevis/reactgrid";
import KontraktualRapatClearanceInputLogic from "./KontraktualRapatClearanceInputLogic";

const KontraktualRapatClearanceInputPage = () => {
  const { value, func } = KontraktualRapatClearanceInputLogic();

  return (
    <>
      <HeaderComponent
        className="more-modal-width-type1"
        type="input"
        // onFinish={func.onFinish}
        onUploadFile={func.onUploadFile}
        accesFile={value}
        downloadFile="file/detail-opex.xlsx"
        disabledImportExport={value.rows.pemasaran.length === 0}
        onChangeSelect={func.onChangeTahun}
        listMenuImport={value.items.pemasaran.concat(value.items.administrasi)}
      />

      <FilterComponent onFinish={func.onFinish} isCodeIcp isCodeProject type="input" />

      <div className="custom-root-layout">
        {value.rows.pemasaran.length > 0 ? (
          <Typography.Text className="section-header-table">Pemasaran</Typography.Text>
        ) : null}

        {value.rows.pemasaran.length > 0
          ? value.rows.pemasaran.map((e, i) => (
              <div style={{ margin: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography.Text>{value.items.pemasaran[i].description}</Typography.Text>
                  <Button
                    className="btn-tambah-row"
                    onClick={() => func.onTambahRow(i, "pemasaran")}
                  >
                    Tambah Data
                  </Button>
                </div>

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
                      rows={e}
                      columns={value.columns}
                      stickyTopRows={1}
                      stickyLeftColumns={1}
                      onCellsChanged={(change) => func.onChangeTable(change, i, "pemasaran")}
                    />
                  </div>
                </div>
              </div>
            ))
          : null}

        {value.rows.pemasaran.length > 0 ? (
          <Typography.Text className="section-header-table">Administrasi</Typography.Text>
        ) : null}

        {value.rows.administrasi.length > 0
          ? value.rows.administrasi.map((e, i) => (
              <div style={{ margin: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography.Text>{value.items.administrasi[i].description}</Typography.Text>
                  <Button
                    className="btn-tambah-row"
                    onClick={() => func.onTambahRow(i, "administrasi")}
                  >
                    Tambah Data
                  </Button>
                </div>

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
                      rows={e}
                      columns={value.columns}
                      stickyTopRows={1}
                      stickyLeftColumns={1}
                      onCellsChanged={(change) => func.onChangeTable(change, i, "administrasi")}
                    />
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default KontraktualRapatClearanceInputPage;
