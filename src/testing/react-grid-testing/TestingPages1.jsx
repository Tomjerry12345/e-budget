import React, { useState } from "react";
import { columns as dataColumns } from "./columns";
import { rows as dataRows, headerRow } from "./rows";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./styles.scss";
import { log } from "../../values/Utilitas";

/* 
  searches for a chevron cell in given row
*/
const findChevronCell = (row) =>
  row.cells.find((cell) => cell.type === "chevron") || undefined;

/* 
  searches for a parent of given row
*/
const findParentRow = (rows, row) =>
  rows.find((r) => {
    const foundChevronCell = findChevronCell(row);
    return foundChevronCell ? r.rowId === foundChevronCell.parentId : false;
  });

/* 
  check if the row has children
*/
const hasChildren = (rows, row) =>
  rows.some((r) => {
    const foundChevronCell = findChevronCell(r);
    return foundChevronCell ? foundChevronCell.parentId === row.rowId : false;
  });

/* 
  Checks is row expanded
*/
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
      !!row.cells.find(
        (cell) => cell.type === "chevron" && cell.parentId === parentRow.rowId
      )
  );

const assignIndentAndHasChildren = (rows, parentRow, indent = 0) => {
  ++indent;
  getDirectChildRows(rows, parentRow).forEach((row) => {
    const foundChevronCell = findChevronCell(row);
    const hasRowChildrens = hasChildren(rows, row);
    if (foundChevronCell) {
      foundChevronCell.indent = indent;
      foundChevronCell.hasChildren = hasRowChildrens;
      // log("foundChevronCell", foundChevronCell)
    }
    if (hasRowChildrens) assignIndentAndHasChildren(rows, row, indent);
  });
};

const buildTree = (rows) =>
  rows.map((row) => {
    // log("row", row)
    const foundChevronCell = findChevronCell(row);
    if (foundChevronCell && !foundChevronCell.parentId) {
      const hasRowChildrens = hasChildren(rows, row);
      // foundChevronCell.hasChildren = hasRowChildrens;
      foundChevronCell.hasChildren = hasRowChildrens;
      // log("foundChevronCell", foundChevronCell);
      if (hasRowChildrens) {
        assignIndentAndHasChildren(rows, row);
      } 
    }
    // row.hasChildren = true;
    return row;
  });

export const TestingPages1 = () => {
  const [columns] = useState(() => dataColumns(true, false));
  const [rows, setRows] = useState(() => buildTree(dataRows(true)));
  log("buildTree", buildTree(dataRows(true)))
  const [rowsToRender, setRowsToRender] = useState([
    headerRow,
    ...getExpandedRows(rows),
  ]);

  const handleChanges = (changes) => {
    const newRows = [...rows];
    changes.forEach((change) => {
      const changeRowIdx = rows.findIndex((el) => el.rowId === change.rowId);
      const changeColumnIdx = columns.findIndex(
        (el) => el.columnId === change.columnId
      );
      newRows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
    });
    setRows(buildTree(newRows));
    setRowsToRender([headerRow, ...getExpandedRows(newRows)]);
  };

  return (
    <ReactGrid
      rows={rowsToRender}
      columns={columns}
      onCellsChanged={handleChanges}
      enableRangeSelection
    />
  );
};
