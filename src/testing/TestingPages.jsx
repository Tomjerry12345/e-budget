import { ReactGrid } from "@silevis/reactgrid";
import { useState } from "react";
import "@silevis/reactgrid/styles.scss";
import '@silevis/reactgrid/default-colors.scss';
import '@silevis/reactgrid/default-sizing.scss';
import '@silevis/reactgrid/cell-templates-default-colors.scss';

const getPeople = () => [
  { name: "Thomas", surname: "Goldman" },
  { name: "Susie", surname: "Quattro" },
  { name: {childreen: [
    {name: "test"}
  ]}, surname: "" },
];

const getColumns = () => [
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 },
];

const headerRow = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" },
  ],
};

const getRows = (people) => [
  headerRow,
  ...people.map((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.name },
      { type: "text", text: person.surname },
    ],
  })),
];

const applyChangesToPeople = (changes, prevPeople) => {
  changes.forEach((change) => {
    const personIndex = change.rowId;
    const fieldName = change.columnId;
    prevPeople[personIndex][fieldName] = change.newCell.text;
  });
  return [...prevPeople];
};

const TestingPages = () => {
  const [people, setPeople] = useState(getPeople());

  const rows = getRows(people);
  const columns = getColumns();

  const handleChanges = (changes) => {
    console.log(changes);
    setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
  };

  return (
    <ReactGrid
      rows={rows}
      columns={columns}
      enableRangeSelection
      onCellsChanged={handleChanges}
    />
  );
};

export default TestingPages;
