import { createArray, log } from "values/Utilitas";
import { rowTotal } from "./rowTotal";
import { TOTAL_DATA } from "./Constant";

const type1 = (data, key) => {
  const list = createArray(TOTAL_DATA[key]);

  data.forEach((e) => {
    if (e !== null) {
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
    }
  });

  return rowTotal("Total", list, key);
};

const type2 = (data, key) => {
  const list = createArray(TOTAL_DATA[key]);

  data.forEach((e) => {
    if (e !== null) {
      list[0] += e["jan_sd"] ?? 0;
      list[1] += e["jan"] ?? 0;
      list[2] += e["feb_sd"] ?? 0;
      list[3] += e["feb"] ?? 0;
      list[4] += e["mar_sd"] ?? 0;
      list[5] += e["mar"] ?? 0;
      list[6] += e["apr_sd"] ?? 0;
      list[7] += e["apr"] ?? 0;
      list[8] += e["mei_sd"] ?? 0;
      list[9] += e["mei"] ?? 0;
      list[10] += e["jun_sd"] ?? 0;
      list[11] += e["jun"] ?? 0;
      list[12] += e["jul_sd"] ?? 0;
      list[13] += e["jul"] ?? 0;
      list[14] += e["agu_sd"] ?? 0;
      list[15] += e["agu"] ?? 0;
      list[16] += e["sep_sd"] ?? 0;
      list[17] += e["sep"] ?? 0;
      list[18] += e["okt_sd"] ?? 0;
      list[19] += e["okt"] ?? 0;
      list[20] += e["nov_sd"] ?? 0;
      list[21] += e["nov"] ?? 0;
      list[22] += e["des_sd"] ?? 0;
      list[23] += e["des"] ?? 0;

      list[24] += e["total_1"] ?? 0;

      list[25] += e["jan_p_sd"] ?? 0;
      list[26] += e["jan_p"] ?? 0;
      list[27] += e["feb_p_sd"] ?? 0;
      list[28] += e["feb_p"] ?? 0;
      list[29] += e["mar_p_sd"] ?? 0;
      list[30] += e["mar_p"] ?? 0;
      list[31] += e["apr_p_sd"] ?? 0;
      list[32] += e["apr_p"] ?? 0;
      list[33] += e["mei_p_sd"] ?? 0;
      list[34] += e["mei_p"] ?? 0;
      list[35] += e["jun_p_sd"] ?? 0;
      list[36] += e["jun_p"] ?? 0;
      list[37] += e["jul_p_sd"] ?? 0;
      list[38] += e["jul_p"] ?? 0;

      list[39] += e["agu_p_sd"] ?? 0;
      list[40] += e["agu_p"] ?? 0;
      list[41] += e["sep_p_sd"] ?? 0;
      list[42] += e["sep_p"] ?? 0;
      list[43] += e["okt_p_sd"] ?? 0;
      list[44] += e["okt_p"] ?? 0;
      list[45] += e["nov_p_sd"] ?? 0;
      list[46] += e["nov_p"] ?? 0;
      list[47] += e["des_p_sd"] ?? 0;
      list[48] += e["des_p"] ?? 0;

      list[49] += e["total_2"] ?? 0;
    }
  });

  return rowTotal("Total", list, key);
};

export const firstLoadTotalRow = (data, key) => {
  const l = {
    "Stok Awal": type1(data, key),
    "Asumsi unit beli": type1(data, key),
    "Harga beli per unit": type1(data, key),
    "Stok akhir": type1(data, key),
    "Asumsi unit jual": type1(data, key),
    "Harga jual per unit": type1(data, key),
    "Volume / Unit": type1(data, key),
    Tarif: type1(data, key),
    "Asumsi trip": type1(data, key),
    Penjualan: type1(data, key),
    "All data": type1(data, key),
    "Potongan penjualan": type2(data, key),
    "Pendapatan Operasional Lainnya": type1(data, key),
    "HPP Variable": type2(data, key),
    "HPP Lainnya": type1(data, key),
  };

  return l[key];
};
