import { createArray, log } from "values/Utilitas";
import { getGroupRows } from "./getGroupRows";
import { firstLoadTotalRow } from "./firstLoadTotalRow";
import { END_TOTAL, FIRST_TOTAL, TOTAL_DATA } from "./Constant";
import { rowTotal } from "./rowTotal";
import { reactgridNewRow } from "./reactgridNewRow";

export const HEADER_ROOT_ROW_ID = "header-root";

export const updateTotalRow = (data, key) => {
  const newData = data.slice(1, data.length - 1);

  const list = newData
    .map((e) => {
      const values = [];
      for (let i = FIRST_TOTAL[key]; i < END_TOTAL(key); i++) {
        if (key === "Potongan penjualan") {
          if (i > 24) {
            const isEven = i % 2 === 0;
            const valueToPush = isEven ? parseInt(e.cells[i].text) : e.cells[i].value;
            values.push(valueToPush ?? 0);
          } else {
            const isEven = i % 2 === 1;
            const valueToPush = isEven ? parseInt(e.cells[i].text) : e.cells[i].value;
            values.push(valueToPush ?? 0);
          }
        } else {
          values.push(e.cells[i].value ?? 0);
        }
      }

      return values;
    })
    .reduce((acc, curr) => acc.map((v, i) => v + curr[i]), createArray(TOTAL_DATA[key]));

  return rowTotal("Total", list, key);
};

export function getRows({ header, data, key, col }) {
  return [header, ...getGroupRows(data, key, col), firstLoadTotalRow(data, key)];
}

export function fullNewRow(header, id, key) {
  const list = createArray(TOTAL_DATA[key]);
  return [header, reactgridNewRow(id, key), rowTotal("Total", list, key)];
}
