import { Column } from "@silevis/reactgrid";

export const columns = (reorderable, resizable) => [
  { columnId: "id", reorderable, resizable, width: 150 },
  { columnId: "Unit", reorderable, resizable, width: 100 },
  { columnId: "hash", reorderable, resizable, width: 200 }
];
