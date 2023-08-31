import { ReactGrid } from "@silevis/reactgrid/dist";
import { useRef, useState } from "react";
import "@silevis/reactgrid/dist/styles.scss";
import "@silevis/reactgrid/dist/default-colors.scss";
import "@silevis/reactgrid/dist/default-sizing.scss";
import "@silevis/reactgrid/dist/cell-templates-default-colors.scss";
import { Button, Typography } from "antd";
import { log } from "../../values/Utilitas";
import "./styles.scss";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { nonEditable } from "./cells";

const getPeople = () => [
  { name: "Thomas", surname: "Goldman" },
  { name: "Susie", surname: "Quattro" },
];

const getColumns = () => [
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 },
];

const style = {
  background: "#107C41",
  color: "white",
  padding: "16px 8px",
};

const headerRow = {
  rowId: "header",
  cells: [
    nonEditable({
      type: "text",
      text: "Hello",
      style: style,
      renderer: (text) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <Typography.Text style={{ color: "white" }}>{text}</Typography.Text>
          <Inventory2OutlinedIcon />
        </div>
      ),
    }),
    { type: "header", text: "Surname" },
  ],
};

const getRows = () => [
  headerRow,
  {
    rowId: 1,
    cells: [
      {
        type: "chevron",
        text: "kerdil",
        hasChildren: true,
      },
    ],
  },
  {
    rowId: 2,
    cells: [
      {
        hasChildren: false,
        indent: 1,
        parentId: 1,
        type: "chevron",
        text: "andri",
      },
    ],
  },
  {
    rowId: 3,
    cells: [
      {
        type: "text",
        text: "test",
        style: style,
      },
      {
        type: "text",
        text: "test",
      },
    ],
  },
  // ...people.map((person, idx) => ({
  //   rowId: idx,
  //   cells: [
  //     {
  //       type: "text",
  //       text: person.name,
  //     },
  //     { type: "text", text: person.surname },
  //   ],
  // })),
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
  const [isShow, setIsShow] = useState(false);

  const ref = useRef();

  const handleChanges = (changes) => {
    console.log(changes);
    setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
  };

  const onHide = () => {
    const q = document.querySelectorAll('[data-cell-colidx="0"]');
    q.forEach((e) => {
      if (isShow) {
        e.classList.remove("hide");
      } else {
        e.classList.add("hide");
      }
    });

    setIsShow(!isShow);
  };

  return (
    <>
      <Button
        style={{
          marginBottom: 16,
        }}
        onClick={onHide}
      >
        {isShow ? "Show Column" : "Hide Column"}
      </Button>
      <ReactGrid
        ref={ref}
        rows={rows}
        columns={columns}
        enableRangeSelection
        onCellsChanged={handleChanges}
      />
    </>
  );
};

export default TestingPages;
