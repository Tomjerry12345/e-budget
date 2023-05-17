import React, { useState } from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import "./styles.css";
import { log, logO } from "../../values/Utilitas";

// eslint-disable-next-line no-extend-native
Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

const getPeople = () => [
  { id: 1, name: "Thomas", surname: "Goldman" },
  { id: 2, name: "Susie", surname: "Quattro" },
  { id: 3, name: "", surname: "" },
];

const col = [
  { columnId: "chevron", width: 40 },
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 },
];

const getColumns = (c) => c;

const headerRow = {
  rowId: "header",
  cells: [
    { type: "header", text: "" },
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" },
  ],
};

const getRows = (people) => [
  headerRow,
  ...people.map((person) => ({
    rowId: person.id.toString(),
    cells: [
      { columnId: "chevron", type: "text", text: "" },
      { columnId: "name", type: "text", text: person.name },
      { columnId: "surname", type: "text", text: person.surname },
    ],
  })),
];

const expandedHeader = (nRow, nCol, num) => {
  nRow.map((d) => delete d.cells[num]);
  delete nCol[num];

  return { nRow, nCol };
};

function TestingUsingChatGpt1() {
  const [people] = useState(getPeople());

  const [rows, setRows] = useState(getRows(people));
  const [columns, setColumns] = useState(getColumns(col));

  const [isColumnHidden, setIsColumnHidden] = useState(false);

  const handleToggleColumn = () => {
    setIsColumnHidden(!isColumnHidden);
    if (!isColumnHidden) {
      const { r, c } = expandedHeader(rows, columns, 2);
    } else {
      setRows(getRows(people));
      setColumns(getColumns(col));
    }
    // setRows(r);
    // setColumns(c);
  };

  return (
    <div>
      <div className="toggle-button" onClick={handleToggleColumn}>
        {isColumnHidden ? "Show Column" : "Hide Column"}
      </div>
      <ReactGrid rows={rows} columns={columns} />
    </div>
  );
}

export default TestingUsingChatGpt1;
