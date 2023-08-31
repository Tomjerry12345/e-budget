import { Typography } from "antd";
import Logic from "./Logic.jsx";
import { ReactGrid } from "@silevis/reactgrid/dist";
import { capitalize } from "values/react-grid/helpers";

const PenjualanBkPage = () => {
  const { value, func } = Logic();

  return (
    <>
      <div
        className="section-table"
        style={{
          height: "calc(100vh - 292px)",
        }}
      >
        {value.rows.length > 0 ? (
          <div style={{ margin: "10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Text>{capitalize("Penjualan")}</Typography.Text>
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
                  rows={value.rows}
                  columns={value.columns}
                  stickyTopRows={1}
                  stickyLeftColumns={1}
                  enableRangeSelection
                  onCellsChanged={(change) => {
                    func.onChangeTable(change);
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PenjualanBkPage;
