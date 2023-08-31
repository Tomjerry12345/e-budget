import { ReactGrid } from "@silevis/reactgrid/dist";
import { getColumns } from "./getColumns";
import { useState } from "react";
import { data as emptyData } from "./rawData";
import "./style.css";
import { getRows } from "./getRows";

const applyChange = (change) => (groups) =>
  groups.map((group) =>
    group.title === change.rowId
      ? change.columnId <= 12
        ? {
            ...group,
            year1: group.year1.map((value, idx) =>
              change.columnId === idx + 1 ? change.newCell.value : value
            ),
          }
        : {
            ...group,
            year2: group.year2.map((value, idx) =>
              change.columnId === idx + 12 + 1 ? change.newCell.value : value
            ),
          }
      : group
  );

const TestingRealProject = () => {
  const [data, setData] = useState(() => [...emptyData]);

  const columns = getColumns();

  const rows = getRows({ data });

  const handleChanges = (changes) => {
    changes.forEach((change) => {
      setData((e) => applyChange(change)(e));
    });
  };

  return (
    <>
      <div style={{ width: 1700 }} className="liquidity-planner-app">
        <h1>test</h1>
        <ReactGrid
          rows={rows}
          columns={columns}
          onCellsChanged={handleChanges}
          stickyTopRows={1}
          stickyLeftColumns={1}
          //   stickyRightColumns={1}
          // props below are availble for PRO version
          enableFillHandle
          enableRangeSelection
        />
      </div>
    </>
  );
};

export default TestingRealProject;
