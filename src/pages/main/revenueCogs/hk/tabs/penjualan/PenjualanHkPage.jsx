import React from "react";
import FilterComponent from "component/filter/FilterComponent";
import HeaderComponent from "component/header/HeaderComponent";
import { Button, Typography } from "antd";
import { ReactGrid } from "@silevis/reactgrid";
import Logic from "./Logic";
import { constantExcellFile } from "values/Constant";

const PenjualanHkPage = () => {
  const { value, func } = Logic();

  return (
    <>
      <div className="section-table">
        {value.rows &&
          value.rows.map((e, i) => (
            <div style={{ margin: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography.Text>{e.title}</Typography.Text>
                <Button className="btn-tambah-row" onClick={() => func.onTambahRow(i, e.title)}>
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
                    rows={e.data}
                    columns={value.columns}
                    stickyTopRows={1}
                    stickyLeftColumns={1}
                    onCellsChanged={(change) => func.onChangeTable(change, i, e.title)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PenjualanHkPage;
