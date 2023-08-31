import React from "react";
import FilterComponent from "component/filter/FilterComponent";
import HeaderComponent from "component/header/HeaderComponent";
import { Typography } from "antd";
import { ReactGrid } from "@silevis/reactgrid/dist";
import Logic from "./Logic";

const PerlengkapanKantorSummaryPage = () => {
  const { value, func } = Logic();

  return (
    <>
      <HeaderComponent
        type="summary"
        disabledImportExport={
          value.rows.pemasaran.length === 0 && value.rows.administrasi.length === 0
        }
        // listMenu={value.items.pemasaran.concat(value.items.administrasi)}
        listMenu={value.listMenu}
        disabledMenu={value.rows.pemasaran.length === 0 && value.rows.administrasi.length === 0}
        linkExport={value.linkExport}
      />

      <FilterComponent onFinish={func.onFinish} isCodeLocation={false} />

      <div className="custom-root-layout">
        {value.rows.pemasaran.length > 0 ? (
          <Typography.Text className="section-header-table">Pemasaran</Typography.Text>
        ) : null}

        {value.rows.pemasaran.length > 0
          ? value.rows.pemasaran.map((e, i) => (
              <div style={{ margin: "10px" }}>
                <Typography.Text>{value.items.pemasaran[i].description}</Typography.Text>
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
          <Typography.Text className="section-header-table">Administrasi</Typography.Text>
        ) : null}

        {value.rows.administrasi.length > 0
          ? value.rows.administrasi.map((e, i) => (
              <div style={{ margin: "10px" }}>
                <Typography.Text>{value.items.administrasi[i].description}</Typography.Text>
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

export default PerlengkapanKantorSummaryPage;
