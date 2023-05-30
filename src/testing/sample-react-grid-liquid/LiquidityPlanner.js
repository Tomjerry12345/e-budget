import { ReactGrid } from "@silevis/reactgrid";
import { CASHBOXBANK_ROW_ID, CREDITLINE_ROW_ID, getRows } from "./getRows";
import { getColumns } from "./getColumns";
import { useState } from "react";
import { inflows as emptyInflows, outflows as emptyOutflows } from "./rawData";
import { calculateOutputVariables } from "./plannerOutputVariables";
import "./style.css";

const applyChange = (change) => (groups) =>
  groups.map((group) =>
    group.title === change.rowId
      ? {
          ...group,
          values: group.values.map((value, idx) =>
            change.columnId === idx + 1 ? change.newCell.value : value
          ),
        }
      : group
  );

const LiquidityPlanner = () => {
  const [openingBalance, setOpeningBalance] = useState(10000);
  const [creditLine, setCreditLine] = useState(3000);
  const [cashInflow, setCashInflow] = useState(() => [...emptyInflows]);
  const [cashOutflow, setCashOutflow] = useState(() => [...emptyOutflows]);

  const columns = getColumns();

  const inputVariables = {
    cashInflow,
    cashOutflow,
    openingBalance,
    creditLine,
  };

  const outputVariables = calculateOutputVariables(inputVariables);

  const plannerData = {
    ...inputVariables,
    ...outputVariables,
  };

  const rows = getRows(plannerData);

  const handleChanges = (changes) => {
    changes.forEach((change) => {
      if (change.rowId === CASHBOXBANK_ROW_ID && change.columnId === 1) {
        setOpeningBalance(change.newCell.value);
      }
      if (change.rowId === CREDITLINE_ROW_ID && change.columnId === 1) {
        setCreditLine(change.newCell.value);
      }
      setCashInflow((cashInflow) => applyChange(change)(cashInflow));
      setCashOutflow((cashOutflow) => applyChange(change)(cashOutflow));
    });
  };

  return (
    <>
      <div style={{ width: 1523 }} className="liquidity-planner-app">
        {alert("test")}
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <ReactGrid
          rows={rows}
          columns={columns}
          onCellsChanged={handleChanges}
          stickyTopRows={1}
          stickyLeftColumns={1}
          stickyRightColumns={1}
          // props below are availble for PRO version
          enableFillHandle
          enableRangeSelection
        />
      </div>
    </>
  );
};

export default LiquidityPlanner;
