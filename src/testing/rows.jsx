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
      { type: "chevron", text: "1", isExpanded: true },
      { type: "text", text: "1" },
      { type: "text", text: "e989109363ec42610" }
    ]
  },
  {
    rowId: 2,
    // height,
    // reorderable,
    cells: [
      { type: "chevron", text: "2", isExpanded: true, parentId: 1 },
      { type: "text", text: "1" },

      { type: "text", text: "ey5seefv1o" }
    ]
  },
  {
    rowId: 3,
    // height,
    // reorderable,
    cells: [
      { type: "chevron", text: "3", isExpanded: false },
      { type: "text", text: "1" },

      { type: "text", text: "u61x66unzgl9" }
    ]
  },
  {
    rowId: 4,
    // height,
    // reorderable,
    cells: [
      { type: "chevron", text: "4", isExpanded: true, parentId: 3 },
      { type: "text", text: "1" },

      { type: "text", text: "v2dwm51y0k874" }
    ]
  }
  /*  {
    rowId: 5,
    height,
    reorderable,
    cells: [
      { type: "chevron", text: "5", isExpanded: true, parentId: 4 },
      { type: "text", text: "jqk6nn3wktt2nwituttafuvpv7hlzo2grelvs7vo" }
    ]
  },
  {
    rowId: 6,
    height,
    reorderable,
    cells: [
      { type: "chevron", text: "6", isExpanded: true, parentId: 4 },
      { type: "text", text: "ppsqily4doxz27uw6tznvc3qfvfhc37500k59jw9" }
    ]
  },
  {
    rowId: 7,
    height,
    reorderable,
    cells: [
      { type: "chevron", text: "7", isExpanded: true },
      { type: "text", text: "uc75daha01rnk3dfcghvkgav13igsb87b0w1jzft" }
    ]
  },
  {
    rowId: 8,
    height,
    reorderable,
    cells: [
      { type: "chevron", text: "8", isExpanded: true, parentId: 7 },
      { type: "text", text: "bmwz5y30ypjgixzh3aic3vpjlnh1q1hrie2pv5mg" }
    ]
  },
  {
    rowId: 9,
    height,
    reorderable,
    cells: [
      { type: "chevron", text: "9", isExpanded: true, parentId: 7 },
      { type: "text", text: "rc3hmvkwh4to6iq8mo68ju9vyx2zcmqbgn73zrw9" }
    ]
  },
  {
    rowId: 10,
    height,
    reorderable,
    cells: [
      { type: "chevron", text: "10", isExpanded: true, parentId: 7 },
      { type: "text", text: "1ooxkvmvwotxicvawyh0wb1ur8jtin12egyayee8" }
    ]
  } */
];
