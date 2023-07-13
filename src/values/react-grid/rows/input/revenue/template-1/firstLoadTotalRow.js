import { createArray } from "values/Utilitas";
import { rowTotal } from "./rowTotal";
import { TOTAL_DATA } from "./Constant";

const type1 = (data, key) => {
  const list = createArray(TOTAL_DATA[key]);

  data.forEach((e) => {
    list[0] += e["jan"] ?? 0;
    list[1] += e["feb"] ?? 0;
    list[2] += e["mar"] ?? 0;
    list[3] += e["apr"] ?? 0;
    list[4] += e["mei"] ?? 0;
    list[5] += e["jun"] ?? 0;
    list[6] += e["jul"] ?? 0;
    list[7] += e["agu"] ?? 0;
    list[8] += e["sep"] ?? 0;
    list[9] += e["okt"] ?? 0;
    list[10] += e["nov"] ?? 0;
    list[11] += e["des"] ?? 0;
    list[12] += e["total"] ?? 0;
  });

  return rowTotal("Total", list, key);
};

const type2 = (data, key) => {
  if (key === "Asumsi unit jual") console.log("data:", data);
  const list = createArray(TOTAL_DATA[key]);

  data.forEach((e) => {
    list[0] += e["jan"] ?? 0;
    list[1] += e["feb"] ?? 0;
    list[2] += e["mar"] ?? 0;
    list[3] += e["apr"] ?? 0;
    list[4] += e["mei"] ?? 0;
    list[5] += e["jun"] ?? 0;
    list[6] += e["jul"] ?? 0;
    list[7] += e["agu"] ?? 0;
    list[8] += e["sep"] ?? 0;
    list[9] += e["okt"] ?? 0;
    list[10] += e["nov"] ?? 0;
    list[11] += e["des"] ?? 0;
    list[12] += e["total_1"] ?? 0;
    list[13] += e["jan_p"] ?? 0;
    list[14] += e["feb_p"] ?? 0;
    list[15] += e["mar_p"] ?? 0;
    list[16] += e["apr_p"] ?? 0;
    list[17] += e["mei_p"] ?? 0;
    list[18] += e["jun_p"] ?? 0;
    list[19] += e["jul_p"] ?? 0;
    list[20] += e["agu_p"] ?? 0;
    list[21] += e["sep_p"] ?? 0;
    list[22] += e["okt_p"] ?? 0;
    list[23] += e["nov_p"] ?? 0;
    list[24] += e["des_p"] ?? 0;
    list[25] += e["total_2"] ?? 0;
    if (key === "Asumsi unit jual") console.log("e:", e);
    if (key === "Asumsi unit jual") console.log("list:", list);
  });

  return rowTotal("Total", list, key);
};

const type3 = (data, key) => {
  const list = createArray(TOTAL_DATA[key]);

  data.forEach((e) => {
    list[0] += e["potongan"] ?? 0;
    list[1] += e["jan"] ?? 0;
    list[2] += e["feb"] ?? 0;
    list[3] += e["mar"] ?? 0;
    list[4] += e["apr"] ?? 0;
    list[5] += e["mei"] ?? 0;
    list[6] += e["jun"] ?? 0;
    list[7] += e["jul"] ?? 0;
    list[8] += e["agu"] ?? 0;
    list[9] += e["sep"] ?? 0;
    list[10] += e["okt"] ?? 0;
    list[11] += e["nov"] ?? 0;
    list[12] += e["des"] ?? 0;
    list[13] += e["total"] ?? 0;
  });

  return rowTotal("Total", list, key);
};

export const firstLoadTotalRow = (data, key) => {
  const l = {
    "Stok Awal": type2(data, key),
    "Asumsi unit beli": type2(data, key),
    "Harga beli per unit": type2(data, key),
    "Stok akhir": type2(data, key),
    "Asumsi unit jual": type2(data, key),
    "Harga jual per unit": type2(data, key),
    Penjualan: type2(data, key),
    // "Potongan penjualan": type3(data, key),
  };

  return l[key];
};
