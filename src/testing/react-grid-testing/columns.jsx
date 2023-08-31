import { Column } from "@silevis/reactgrid/dist";

export const columns = (reorderable, resizable) => [
  { columnId: "id", reorderable, resizable, width: 150 },
  { columnId: "Unit", reorderable, resizable, width: 100 },
  { columnId: 555, reorderable: true, resizable: true, width: 300 },
];
