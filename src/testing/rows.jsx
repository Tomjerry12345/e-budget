import { Row } from "@silevis/reactgrid";

const height = 25;

export const headerRow = {
  rowId: "header",
  reorderable: false,
//   height,
  cells: [
    { type: "header", text: `` },
    { type: "header", text: `Unit` },
    { type: "header", text: `Unit` }
  ]
};

export const rows = (reorderable) => [
  {
    rowId: 1,
    // height,
    // reorderable,
    cells: [
      { type: "chevron", text: "1", isExpanded: true, nonEditable: true, },
      { type: "text", text: "1" },
      { type: "text", text: "e989109363ec42610" }
    ]
  },
  {
    rowId: 2,
    // height,
    // reorderable,
    cells: [
      { type: "chevron", text: "2", parentId: 1 },
      { type: "text", text: "1", nonEditable: true, },

      { type: "text", text: "ey5seefv1o" }
    ]
  },
  {
    rowId: 3,
    // height,
    // reorderable,
    cells: [
      { type: "chevron", text: "3" , parentId: 1 },
      { type: "text", text: "1" },

      { type: "text", text: "u61x66unzgl9" }
    ]
  },
  {
    rowId: 4,
    // height,
    // reorderable,
    cells: [
      { type: "chevron", text: "4" , parentId: 1 },
      { type: "text", text: "1" },

      { type: "text", text: "v2dwm51y0k874" }
    ]
  },
  {
    rowId: 5,
    // height,
    // reorderable,
    cells: [
      { type: "chevron", text: "5" , parentId: 1 },
      { type: "text", text: "1" },

      { type: "text", text: "v2dwm51y0k874" }
    ]
  },
];
