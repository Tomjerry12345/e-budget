import React, { useState } from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./styles.css";
import { logO } from "../../values/Utilitas";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Typography } from "antd";

const col = [
  { columnId: "produk", width: 100, isExpand: false, reorderable: true, resizable: false },
  { columnId: "jan1", width: 150, isExpand: false, reorderable: true, resizable: false },
  { columnId: "feb1", width: 150, reorderable: true, resizable: false },
];

const headerRow = {
  rowId: "header",
  reorderable: false,
  cells: [
    { type: "header", text: "Produk", isExpand: false, indexExpand: 0 },
    { type: "header", text: "Januari 1", isExpand: false, indexExpand: 1 },
    { type: "header", text: "Februari 1" },
  ],
};

const getRows = () => [
  // headerRow,
  {
    rowId: 1,
    cells: [
      {
        type: "chevron",
        text: "Ayam bakar",
        expandText: "Ayam bakar",
        isExpand: false,
        isExpanded: true,
      },
      { type: "text", text: "1", expandText: "1", isExpand: false, nonEditable: false },
      { type: "text", text: "0" },
    ],
  },
  {
    rowId: 2,
    cells: [
      {
        type: "chevron",
        text: "Roti",
        expandText: "Roti",
        isExpand: false,
        parentId: 1,
        nonEditable: false,
      },
      { type: "text", text: "0", expandText: "0", isExpand: false },
      { type: "text", text: "1" },
    ],
  },
];

const findChevronCell = (row) => row.cells.find((cell) => cell.type === "chevron");

const findParentRow = (rows, row) =>
  rows.find((r) => {
    const foundChevronCell = findChevronCell(row);
    return foundChevronCell ? r.rowId === foundChevronCell.parentId : false;
  });

const hasChildren = (rows, row) =>
  rows.some((r) => {
    const foundChevronCell = findChevronCell(r);
    return foundChevronCell ? foundChevronCell.parentId === row.rowId : false;
  });

const isRowFullyExpanded = (rows, row) => {
  const parentRow = findParentRow(rows, row);
  if (parentRow) {
    const foundChevronCell = findChevronCell(parentRow);
    if (foundChevronCell && !foundChevronCell.isExpanded) return false;
    return isRowFullyExpanded(rows, parentRow);
  }
  return true;
};

const getExpandedRows = (rows) =>
  rows.filter((row) => {
    const areAllParentsExpanded = isRowFullyExpanded(rows, row);
    return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
  });

const getDirectChildRows = (rows, parentRow) =>
  rows.filter(
    (row) =>
      !!row.cells.find((cell) => cell.type === "chevron" && cell.parentId === parentRow.rowId)
  );

const assignIndentAndHasChildren = (rows, parentRow, indent = 0) => {
  ++indent;
  getDirectChildRows(rows, parentRow).forEach((row) => {
    const foundChevronCell = findChevronCell(row);
    const hasRowChildrens = hasChildren(rows, row);
    if (foundChevronCell) {
      foundChevronCell.indent = indent;
      foundChevronCell.hasChildren = hasRowChildrens;
    }
    if (hasRowChildrens) assignIndentAndHasChildren(rows, row, indent);
  });
};

const buildTree = (rows) =>
  rows.map((row) => {
    const foundChevronCell = findChevronCell(row);
    if (foundChevronCell && !foundChevronCell.parentId) {
      const hasRowChildrens = hasChildren(rows, row);
      foundChevronCell.hasChildren = hasRowChildrens;
      if (hasRowChildrens) assignIndentAndHasChildren(rows, row);
    }
    return row;
  });

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

function TestingBertahap() {
  const normalHeaderCell = (i, title) => ({
    type: "text",
    text: title,
    nonEditable: true,
    renderer: (text) => (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          background: "green",
        }}
      >
        <Typography.Text style={{ color: "white" }}>{text}</Typography.Text>
        <ChevronRightIcon onClick={() => onClickchevronHeader(i)} />
      </div>
    ),
    isExpand: false,
    indexExpand: i,
  });

  const newHeaderCell = (i) => ({
    type: "text",
    text: "",
    nonEditable: true,
    renderer: (text) => (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          background: "blue",
        }}
        onClick={() => onClickchevronHeader(i)}
      >
        <ChevronLeftIcon />
      </div>
    ),
    isExpand: true,
    indexExpand: i,
  });

  const expandedRowChecked = (nRow) => {
    return nRow.map((d, i) => {
      return {
        ...d,
        cells: d.cells.map((cell) => {
          if (cell.isExpand !== undefined) {
            if (i === 0) {
              if (cell.isExpand) {
                return newHeaderCell(cell.indexExpand);
              } else {
                return normalHeaderCell(cell.indexExpand, cell.text);
              }
            } else {
              if (cell.isExpand) {
                cell.text = "";
              } else {
                cell.text = cell.expandText;
              }

              if (cell.nonEditable !== undefined) {
                cell.nonEditable = cell.isExpand;
              }
            }

            return cell;
          }

          return cell;
        }),
      };
    });
  };

  const expandedColChecked = (nCol) => {
    return nCol.map((d) => {
      if (d.isExpand !== undefined) {
        if (d.isExpand) {
          d.width = 8;
        } else {
          d.width = 150;
        }
        return d;
      }

      return d;
    });
  };

  const changeIsExpandedCol = (i, nCol) => {
    nCol[i].isExpand = !nCol[i].isExpand;
    return nCol;
  };

  const changeIsExpandedRow = (i, nRow) => {
    return nRow.map((d) => {
      d.cells[i].isExpand = !d.cells[i].isExpand;
      return d;
    });
  };

  // const rowTree = buildTree(getRows());
  const [rowTree] = useState(() => buildTree(getRows()));
  const rowsToRender = [headerRow, ...getExpandedRows(rowTree)];

  const eRow = expandedRowChecked(rowsToRender);
  const eCol = expandedColChecked(col);

  const [rows, setRows] = useState(eRow);
  const [columns, setColumns] = useState(eCol);

  const onClickchevronHeader = (i) => {
    const newCol = changeIsExpandedCol(i, columns);
    const newRows = changeIsExpandedRow(i, rows);

    const eCol = expandedColChecked(newCol);
    const eRow = expandedRowChecked(newRows);

    setColumns(eCol);
    setRows(eRow);
  };

  const handleChanges = (changes) => {
    if (!changes[0].newCell.isExpand) {
      const newRows = [...rowTree];
      changes.forEach((change) => {
        const changeRowIdx = rowTree.findIndex((el) => el.rowId === change.rowId);
        const changeColumnIdx = columns.findIndex((el) => el.columnId === change.columnId);
        newRows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
      });

      const rToRender = [rows[0], ...getExpandedRows(newRows)];

      setRows(rToRender);
    }
  };

  return (
    <div>
      <ReactGrid
        rows={rows}
        columns={columns}
        onCellsChanged={handleChanges}
        enableFillHandle
        enableRangeSelection
      />
    </div>
  );
}

export default TestingBertahap;
