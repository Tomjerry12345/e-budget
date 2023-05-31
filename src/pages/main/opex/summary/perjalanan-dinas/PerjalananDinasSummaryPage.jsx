import React from "react";
import FilterComponent from "../../../../../component/filter/FilterComponent";
import HeaderComponent from "../../../../../component/header/HeaderComponent";
import { Button, Typography } from "antd";
import { ReactGrid } from "@silevis/reactgrid";
import PerjalananDinasSummaryLogic from "./PerjalananDinasSummaryLogic";

const PerjalananDinasSummaryPage = () => {
  const { value, func } = PerjalananDinasSummaryLogic();

  return (
    <>
      <HeaderComponent
        type="summary"
        onUploadFile={func.onUploadFile}
        accesFile={value}
        downloadFile="file/detail-opex.xlsx"
        onChangeSelect={func.onChangeTahun}
        listMenuImport={["export"]}
        onChangeFilter={() => {}}
      />

      <FilterComponent onFinish={func.onFinish} isCodeIcp isCodeProject />

      <div className="custom-root-layout">
        {value.rows.pemasaran.length > 0 ? (
          <Typography.Text className="section-header-table">
            Pemasaran
          </Typography.Text>
        ) : null}

        {value.rows.pemasaran.length > 0
          ? value.rows.pemasaran.map((e, i) => (
              <div style={{ margin: "10px" }}>
                <Typography.Text>
                  {value.items.pemasaran[i].description}
                </Typography.Text>
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
                    />
                  </div>
                </div>
              </div>
            ))
          : null}

        {value.rows.administrasi.length > 0 ? (
          <Typography.Text className="section-header-table">
            Administrasi
          </Typography.Text>
        ) : null}

        {value.rows.administrasi.length > 0
          ? value.rows.administrasi.map((e, i) => (
              <div style={{ margin: "10px" }}>
                <Typography.Text>
                  {value.items.administrasi[i].description}
                </Typography.Text>
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

export default PerjalananDinasSummaryPage;
