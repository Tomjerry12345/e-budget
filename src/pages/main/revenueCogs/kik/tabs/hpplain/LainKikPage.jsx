import { Typography } from "antd";
import Logic from "./Logic";
import { ReactGrid } from "@silevis/reactgrid/dist";
import { capitalize } from "values/react-grid/helpers";
import { InputPercentTemplate } from "values/react-grid/rows/input/revenue/template-1/InputPercentTemplate";

const LainKikPage = () => {
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
                <Typography.Text>{capitalize(e.description)}</Typography.Text>
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
                    columns={value.columns[e.description]}
                    stickyTopRows={1}
                    stickyLeftColumns={1}
                    enableRangeSelection
                    customCellTemplates={{ percent: new InputPercentTemplate() }}
                    onCellsChanged={(change) => {
                      func.onChangeTable(change, i, e);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default LainKikPage;
