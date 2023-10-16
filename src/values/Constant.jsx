import MainServices from "../services/MainServices";
import { getLocal, log } from "./Utilitas";

export const allItemSummarySubMenu = [
  // 1 Dashboard
  [],
  // 2 Revenue & COGS
  [
    {
      description: "Revenue & COGS HK",
    },
    {
      description: "Revenue & COGS KIU",
    },
    {
      description: "Revenue & COGS GMM",
    },
    {
      description: "Revenue & COGS KIA",
    },
    {
      description: "Revenue & COGS BJU",
    },
    {
      description: "Revenue & COGS BLT",
    },
    {
      description: "Revenue & COGS BLU",
    },
    {
      description: "Revenue & COGS BK",
    },
    {
      description: "Revenue & COGS BSU",
    },
    {
      description: "Revenue & COGS BSB",
    },
    {
      description: "Revenue & COGS KIK",
    },
    {
      description: "Revenue & COGS IKP",
    },
    {
      description: "Revenue & COGS BAND",
    },
    {
      description: "Input Direct Revenue & COGS",
    },
    {
      description: "Summary Revenue & COGS",
    },
  ],
  // 3 Opex
  [
    // "Input By Iklan & Advertensi",
    // "Input By Pemasaran Lainnya",
    // "Input By Sewa",
    // "Input By Pemeliharaan",
    // "Input By Perlengkapan Kantor",
    // "Input By Pengiriman Dokumen",
    // "Input By FC, Cetakan & Jilid",
    // "Input By Listrik, Air & Telepon",
    // "Input By Surat Kabar",
    // "Input By Pantri",
    // "Input By Asuransi",
    // "Input By Keamanan & Kebersihan",
    // "Input By Internet",
    // "Input By Tender",
    // "Input By Kontraktual, Rapat, Clearance",
    // "Input By BBM, Tol, Parkir",
    // "Input By Transportasi",
    // "Input By Perjalanan Dinas",
    // "Input By Pajak Kendaraan",
    // "Input By Pajak",
    // "Input By Pajak Parkir & Resto",
    // "Input By Izin & Konsultan",
    // "Input By Administrasi Lainnya",
    // "Input By Opex Direct",
    // "Summary By Iklan & Advertensi",
    // "Summary By Pemasaran Lainnya",
    // "Summary By Sewa",
    // "Summary By Pemeliharaan",
    // "Summary By Perlengkapan Kantor",
    // "Summary By Pengiriman Dokumen",
    // "Summary By FC, Cetakan & Jilid",
    // "Summary By Listrik, Air & Telepon",
    // "Summary By Surat Kabar",
    // "Summary By Pantri",
    // "Summary By Asuransi",
    // "Summary By Keamanan & Kebersihan",
    // "Summary By Internet",
    // "Summary By Tender",
    // "Summary By Kontraktual, Rapat, Clearance",
    // "Summary By BBM, Tol, Parkir",
    // "Summary By Transportasi",
    // "Summary By Perjalanan Dinas",
    // "Summary By Pajak Kendaraan",
    // "Summary By Pajak",
    // "Summary By Pajak Parkir & Resto",
    // "Summary By Izin & Konsultan",
    // "Summary By Administrasi Lainnya",
    // "Summary Budget Opex",
  ],
  // 4 Capex
  [
    {
      description: "Input Load Saldo Awal",
    },
    {
      description: "Input New Aset",
    },
    {
      description: "Input Direct Capex",
    },
    {
      description: "Summary Existing Aset",
    },
    {
      description: "Summary Penyusutan Existing Aset",
    },
    {
      description: "Summary Saldo Awal Akumulasi Penyusutan",
    },
    {
      description: "Summary New Aset",
    },
    {
      description: "Summary Penyusutan New Aset",
    },
    {
      description: "Summary Akumulasi Penyusutan New Aset",
    },
    {
      description: "Summary Disposal Aset",
    },
    {
      description: "Summary Penyusutan Disposal Aset",
    },
    {
      description: "Summary Akumulasi Penyusutan Disposal Aset",
    },
    {
      description: "Summary Nilai Jual Aset",
    },
    {
      description: "Summary Total Aset",
    },
    {
      description: "Summary Total Penyusutan",
    },
    {
      description: "Summary Total Akumulasi Penyusutan",
    },
    {
      description: "Summary Capex",
    },
  ],
  // 5 MPP
  [
    {
      description: "Input MPP General Asumption",
    },
    {
      description: "Input Rate Assumption",
    },
    {
      description: "Input Rate Salary",
    },

    {
      description: "Input Headcount Salary",
    },
    {
      description: "Input Headcount Assumption",
    },
    {
      description: "Input Days",
    },
    {
      description: "Input Jam Lembur",
    },
    {
      description: "Input Biaya Pengobatan",
    },
    {
      description: "Input Biaya PPh 21",
    },
    {
      description: "Input Biaya BPJS Kesehatan",
    },
    {
      description: "Input Biaya Pendidikan & Latihan",
    },
    {
      description: "Input Biaya Rekrutment & Assessment",
    },
    {
      description: "Input Biaya Uniform & Safety",
    },
    {
      description: "Input Biaya MPP Lainnya",
    },
    {
      description: "Input MPP Direct",
    },
    {
      description: "Summary Gaji",
    },
    {
      description: "Summary By THR",
    },
    {
      description: "Summary By Lembur",
    },
    {
      description: "Summary By Makan dan Minum",
    },
    {
      description: "Summary By Pengobatan",
    },
    {
      description: "Summary By PPh Pasal 21",
    },
    {
      description: "Summary By BPJS TK",
    },
    {
      description: "Summary By BPJS Kesehatan",
    },
    {
      description: "Summary By Transportasi",
    },
    {
      description: "Summary By Komunikasi",
    },
    {
      description: "Summary By Pendidikan & Pelatihan",
    },
    {
      description: "Summary By Rekrutment & Assessment",
    },
    {
      description: "Summary By Uniform & Safety",
    },
    // {
    //   description: "Summary By DPLK",
    // },
    {
      description: "Summary By MPP Lainnya",
    },
    {
      description: "Summary MPP",
    },
  ],
  // 6 Others
  [
    {
      description: "Input Direct Pendapatan Non Operasional",
    },
    {
      description: "Input Direct Biaya Non Operasional",
    },
    {
      description: "Input Direct All",
    },
    {
      description: "Fasilitas Kredit",
    },
    {
      description: "Summary Direct All",
    },
    {
      description: "Summary Biaya Non Operasional",
    },
    {
      description: "Summary Pendapatan Non Operasional",
    },
    {
      description: "Input Asumsi",
    },
  ],
  // 7 Report
  [
    {
      description: "Laba Rugi",
    },
    {
      description: "Cash Flow",
    },
    {
      description: "Neraca",
    },
  ],
  // 8 Master COA
  [
    {
      description: "Kode perusahaan",
    },
    {
      description: "Kode produk",
    },
    {
      description: "Kode lokasi",
    },
    {
      description: "Kode departemen",
    },
    {
      description: "Kode akun",
    },
    {
      description: "Kode projek",
    },
    {
      description: "Kode ICP",
    },
  ],
  // 9 Akun
  [{ description: "Profile" }, { description: "Logout" }],
];

export const disabledItemSummaryMenu = [
  // 1 Dashboard
  [],
  // 2 Revenue & COGS
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  // 3 Opex
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,

    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  // 4 Capex
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  // 5 MPP
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    // false,
    false,
    false,
  ],
  // 6 Others
  [false, false, false, false, false, false, true],
  // 7 Report
  [false],
  // 8 Master COA
  [false, false, false, false, false, false, false],
  // 9 Akun
  [true, false],
];

export const urlPageRevenue = {
  "Revenue & COGS HK": "hk",
  "Revenue & COGS KIU": "kiu",
  "Revenue & COGS GMM": "gmm",
  "Revenue & COGS KIA": "kia",
  "Revenue & COGS BJU": "bju",
  "Revenue & COGS BLT": "blt",
  "Revenue & COGS BLU": "blu",
  "Revenue & COGS BK": "bk",
  "Revenue & COGS BSU": "bsu",
  "Revenue & COGS BSB": "bsb",
  "Revenue & COGS KIK": "kik",
  "Revenue & COGS IKP": "ikp",
  "Revenue & COGS BAND": "band",
  "Input Direct Revenue & COGS": "input",
  "Summary Revenue & COGS": "summary",
};

export const urlGetMenu = ["", "", "config/opex"];

export const selectionMenu = async (i) => {
  const user = getLocal("user_group");

  // if (user === "superadmin" || user === "usersbu" || user === "reviewer") {
  //   return await superAdmin(i);
  // }

  if (user === "superadmin") {
    return superAdmin(i);
  } else if (user === "sbu") {
    console.log("test");
    return userBu(i);
  } else if (user === "subholding") {
    return subholding(i);
  } else if (user === "hc") {
    return hc(i);
  } else if (user === "holding") {
    return holding(i);
  }
};

const superAdmin = (i) => {
  return new Promise(async (resolve) => {
    let listSubMenu = [];
    if (i === 2) {
      let listSubmenuInput = [];
      let listSubmenuSummary = [];
      const anotherMenuInput = [
        {
          description: "Input By Opex Direct",
          children: [],
        },
      ];

      const anotherMenuSummary = [
        {
          description: "Summary Budget Opex",
          children: [],
        },
      ];

      const res = await MainServices.get(urlGetMenu[i]);

      res.data.data.forEach((e) => {
        listSubmenuInput.push({
          ...e,
          description: `Input By ${e.description}`,
        });
        listSubmenuSummary.push({
          ...e,
          description: `Summary By ${e.description}`,
        });
      });

      listSubmenuInput = listSubmenuInput.concat(anotherMenuInput);
      listSubmenuSummary = listSubmenuSummary.concat(anotherMenuSummary);

      listSubMenu = listSubmenuInput.concat(listSubmenuSummary);
    } else {
      listSubMenu = allItemSummarySubMenu[i];
    }

    resolve({
      submenu: listSubMenu,
      disabled: disabledItemSummaryMenu[i],
    });
  });
};

const userBu = (i) => {
  return new Promise(async (resolve) => {
    let v = {
      submenu: allItemSummarySubMenu[i],
      disabled: disabledItemSummaryMenu[i],
    };

    if (i === 1) {
      const codeCompany = getLocal("code_company");

      if (codeCompany === "311") {
        resolve(changeMenu(i, [0, 14]));
      } else if (codeCompany === "326") {
        resolve(changeMenu(i, [1, 14]));
      } else if (codeCompany === "328") {
        resolve(changeMenu(i, [2, 14]));
      } else if (codeCompany === "313") {
        resolve(changeMenu(i, [3, 14]));
      } else if (codeCompany === "312") {
        resolve(changeMenu(i, [4, 14]));
      } else if (codeCompany === "421") {
        resolve(changeMenu(i, [5, 14]));
      } else if (codeCompany === "422") {
        resolve(changeMenu(i, [6, 14]));
      } else if (codeCompany === "221") {
        resolve(changeMenu(i, [7, 14]));
      } else if (codeCompany === "411") {
        resolve(changeMenu(i, [8, 14]));
      } else if (codeCompany === "413") {
        resolve(changeMenu(i, [9, 14]));
      } else if (codeCompany === "241") {
        resolve(changeMenu(i, [10, 14]));
      } else if (codeCompany === "242") {
        resolve(changeMenu(i, [11, 14]));
      } else if (codeCompany === "231") {
        resolve(changeMenu(i, [12, 14]));
      }
    } else if (i === 2) {
      let listSubmenuInput = [];
      let listSubmenuSummary = [];
      const anotherMenuInput = [
        // {
        //   description: "Input By Opex Direct",
        //   children: [],
        // },
      ];

      const anotherMenuSummary = [
        {
          description: "Summary Budget Opex",
          children: [],
        },
      ];

      const res = await MainServices.get(urlGetMenu[i]);

      res.data.data.forEach((e) => {
        listSubmenuInput.push({
          ...e,
          description: `Input By ${e.description}`,
        });
        listSubmenuSummary.push({
          ...e,
          description: `Summary By ${e.description}`,
        });
      });

      listSubmenuInput = listSubmenuInput.concat(anotherMenuInput);
      listSubmenuSummary = listSubmenuSummary.concat(anotherMenuSummary);

      const listSubMenu = listSubmenuInput.concat(listSubmenuSummary);
      resolve({
        ...v,
        submenu: listSubMenu,
      });
    } else if (i === 3) {
      resolve(changeMenu(i, [2], true));
    } else if (i === 5) {
      resolve(changeMenu(i, [2, 3, 6, 7, 8], true));
    } else {
      resolve(v);
    }
  });
};

const subholding = (i) => {
  return new Promise(async (resolve) => {
    let v = {
      submenu: allItemSummarySubMenu[i],
      disabled: disabledItemSummaryMenu[i],
    };

    if (i === 1) {
      const codeCompany = getLocal("code_company");

      const listCompany = [];

      codeCompany.split(",").forEach((v, i) => {
        if (v === "311") {
          listCompany.push(0);
        } else if (v === "326") {
          listCompany.push(1);
        } else if (v === "328") {
          listCompany.push(2);
        } else if (v === "313") {
          listCompany.push(3);
        } else if (v === "312") {
          listCompany.push(4);
        } else if (v === "421") {
          listCompany.push(5);
        } else if (v === "422") {
          listCompany.push(6);
        } else if (v === "221") {
          listCompany.push(7);
        } else if (v === "411") {
          listCompany.push(8);
        } else if (v === "413") {
          listCompany.push(9);
        } else if (v === "241") {
          listCompany.push(10);
        } else if (v === "242") {
          listCompany.push(11);
        } else if (v === "231") {
          listCompany.push(12);
        }
      });

      const l = [...listCompany, 13, 14];
      log({ l });

      resolve(changeMenu(i, [...listCompany, 13, 14]));
    } else if (i === 2) {
      let listSubmenuInput = [];
      let listSubmenuSummary = [];
      const anotherMenuInput = [
        // {
        //   description: "Input By Opex Direct",
        //   children: [],
        // },
      ];

      const anotherMenuSummary = [
        // {
        //   description: "Summary Budget Opex",
        //   children: [],
        // },
      ];

      const res = await MainServices.get(urlGetMenu[i]);

      res.data.data.forEach((e) => {
        listSubmenuInput.push({
          ...e,
          description: `Input By ${e.description}`,
        });
        listSubmenuSummary.push({
          ...e,
          description: `Summary By ${e.description}`,
        });
      });

      listSubmenuInput = listSubmenuInput.concat(anotherMenuInput);
      listSubmenuSummary = listSubmenuSummary.concat(anotherMenuSummary);

      const listSubMenu = listSubmenuInput.concat(listSubmenuSummary);
      resolve({
        ...v,
        submenu: listSubMenu,
      });
    } else if (i === 3) {
      resolve(changeMenu(i, [2, 15], true));
    } else {
      resolve(v);
    }
  });
};

const hc = (i) => {
  return new Promise(async (resolve) => {
    let v = {
      submenu: allItemSummarySubMenu[i],
      disabled: disabledItemSummaryMenu[i],
    };
    if (i === 4) {
      resolve(changeMenu(i, [], true));
    } else {
      resolve(v);
    }
  });
  // if (i === 4) {
  //   return changeMenu(i, [], true);
  // }
};

const holding = (i) => {
  return new Promise(async (resolve) => {
    let listSubMenu = [];
    if (i === 2) {
      let listSubmenuInput = [];
      let listSubmenuSummary = [];
      const anotherMenuInput = [
        {
          description: "Input By Opex Direct",
          children: [],
        },
      ];

      const anotherMenuSummary = [
        {
          description: "Summary Budget Opex",
          children: [],
        },
      ];

      const res = await MainServices.get(urlGetMenu[i]);

      res.data.data.forEach((e) => {
        listSubmenuInput.push({
          ...e,
          description: `Input By ${e.description}`,
        });
        listSubmenuSummary.push({
          ...e,
          description: `Summary By ${e.description}`,
        });
      });

      listSubmenuInput = listSubmenuInput.concat(anotherMenuInput);
      listSubmenuSummary = listSubmenuSummary.concat(anotherMenuSummary);

      listSubMenu = listSubmenuInput.concat(listSubmenuSummary);
    } else {
      listSubMenu = allItemSummarySubMenu[i];
    }

    resolve({
      submenu: listSubMenu,
      disabled: disabledItemSummaryMenu[i],
    });
  });
};

const changeMenu = (i, a = [], reverse = false) => {
  let s = [];
  let d = [];

  if (a.length > 0) {
    if (reverse) {
      s = allItemSummarySubMenu[i].filter((value, index) => !a.includes(index));
      d = disabledItemSummaryMenu[i].filter((value, index) => !a.includes(index));
    } else {
      a.forEach((item) => {
        s.push(allItemSummarySubMenu[i][item]);
        d.push(disabledItemSummaryMenu[i][item]);
      });
    }
  } else {
    s = allItemSummarySubMenu[i];
    d = disabledItemSummaryMenu[i];
  }

  return {
    submenu: s,
    disabled: d,
  };
};

export const changeDisabled = (a = []) => {
  let arr = [disabledItemSummaryMenu.map((_) => true)];

  a.forEach((v) => (arr[v] = false));

  return arr;
};

export const constantExcellFile = {
  opex: {
    "template-1": "file/detail-opex.xlsx",
    "template-2": "file/detail-opex-2.xlsx",
    "template-3": "file/detail-opex-3.xlsx",
    "template-4": "file/detail-opex-4.xlsx",
    "template-4-air": "file/detail-opex-4-air.xlsx",
    "template-4-asuransi-keamanan": "file/detail-opex-4-asuransi-keamanan.xlsx",
    "template-4-sewa": "file/detail-opex-4-sewa.xlsx",
    "template-5": "file/detail-opex-5.xlsx",
  },

  revenue: {
    "Stok Awal": "file/revenue-sample firststock.xlsx",
    "Asumsi unit beli": "file/revenue-sample purchasing assumption.xlsx",
    "Harga beli per unit": "file/revenue-sample purchasing price.xlsx",
    "Asumsi unit jual": "file/revenue-sample selling assumption.xlsx",
    Penjualan: "file/revenue-sample selling price.xlsx",
  },
};

export const keyRevenueTab = [
  "Input Penjualan dan Potongan penjualan",
  "Input HPP dan pendapatan lainnya",
];

export const urlRevenue = {
  "Input Penjualan dan Potongan penjualan": [
    {
      description: "Stok Awal",
      endpoint: "detailrevenue/firststock",
      insert: true,
      file: "stock_awal.xlsx",
    },
    {
      description: "Asumsi unit beli",
      endpoint: "detailrevenue/purchase-unit-assumption",
      insert: true,
      file: "asumsi_unit_beli.xlsx",
    },
    {
      description: "Harga beli per unit",
      endpoint: "detailrevenue/purchase-price-unit",
      insert: true,
      file: "harga_beli_unit.xlsx",
    },
    {
      description: "Stok akhir",
      endpoint: "detailrevenue/last-stock",
      insert: false,
    },
    {
      description: "Asumsi unit jual",
      endpoint: "detailrevenue/selling-unit-assumption",
      insert: true,
      file: "asumsi_unit_jual.xlsx",
    },
    {
      description: "Harga jual per unit",
      endpoint: "detailrevenue/selling-price-unit",
      insert: true,
      file: "harga_jual_unit.xlsx",
    },
    {
      description: "Penjualan",
      endpoint: "detailrevenue/selling",
      insert: false,
    },
    {
      description: "Potongan penjualan",
      endpoint: "detailrevenue/sale-discount",
      insert: false,
    },
  ],

  "Input HPP dan pendapatan lainnya": [
    {
      description: "Pendapatan Operasional Lainnya",
      endpoint: "detailrevenueother/pendapatan-lainnya",
      insert: true,
      file: "pendapatan_lainnya.xlsx",
    },
    {
      description: "HPP Variable",
      endpoint: "detailrevenueother/hpp-variable",
      insert: true,
      // file: "hpp_variable.xlsx",
    },
    {
      description: "HPP Lainnya",
      endpoint: "detailrevenueother/hpp-lainnya",
      insert: true,
      file: "hpp_lainnya.xlsx",
    },
  ],
};

export const getPerusahaan = (q) => {
  const listPerusahaan = {
    hk: {
      code: 311,
      description: "PT. Hadji Kalla",
    },
    kiu: {
      code: 326,
      description: "PT. Kars Inti Utama",
    },
    gmm: {
      code: 328,
      description: "PT. Gowa Modern Motor",
    },
    kia: {
      code: 313,
      description: "PT. Kars Inti Amanah",
    },
    bju: {
      code: 312,
      description: "PT. Bumi Jasa Utama",
    },
    blt: {
      code: 421,
      description: "PT. Bumi Lintas Tama",
    },
    blu: {
      code: 422,
      description: "PT. Bumi Logistik Utama",
    },
    bk: {
      code: 221,
      description: "PT. Bumi Karsa",
    },
    bsu: {
      code: 411,
      description: "PT. Bumi Sarana Utama",
    },
    bsb: {
      code: 413,
      description: "PT. Bumi Sarana Beton",
    },
    kik: {
      code: 241,
      description: "PT. Kalla Inti Karsa",
    },
    ikp: {
      code: 242,
      description: "PT. Inti Karsa Persada",
    },
    band: {
      code: 231,
      description: "PT. Baruga Asrinusa Development",
    },
  };

  return listPerusahaan[q];
};

export const getMonthDuration = () => {
  const listDuration = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
    {
      value: "5",
      label: "5",
    },
    {
      value: "6",
      label: "6",
    },
    {
      value: "7",
      label: "7",
    },
    {
      value: "8",
      label: "8",
    },
    {
      value: "9",
      label: "9",
    },
    {
      value: "10",
      label: "10",
    },
    {
      value: "11",
      label: "11",
    },
    {
      value: "12",
      label: "12",
    },
  ];
  return listDuration;
};

export const monthData = [
  {
    value: "jan",
    label: "Januari",
  },
  {
    value: "feb",
    label: "Februari",
  },
  {
    value: "mar",
    label: "Maret",
  },
  {
    value: "apr",
    label: "April",
  },
  {
    value: "mei",
    label: "Mei",
  },
  {
    value: "jun",
    label: "Juni",
  },
  {
    value: "jul",
    label: "Juli",
  },
  {
    value: "agu",
    label: "Agustus",
  },
  {
    value: "sep",
    label: "September",
  },
  {
    value: "okt",
    label: "Oktber",
  },
  {
    value: "nov",
    label: "November",
  },
  {
    value: "des",
    label: "Desember",
  },
];

export const getMonthName = () => {
  const listMonth = [
    {
      value: "1",
      label: "Januari",
    },
    {
      value: "2",
      label: "Februari",
    },
    {
      value: "3",
      label: "Maret",
    },
    {
      value: "4",
      label: "April",
    },
    {
      value: "5",
      label: "Mei",
    },
    {
      value: "6",
      label: "Juni",
    },
    {
      value: "7",
      label: "Juli",
    },
    {
      value: "8",
      label: "Agustus",
    },
    {
      value: "9",
      label: "September",
    },
    {
      value: "10",
      label: "Oktober",
    },
    {
      value: "11",
      label: "November",
    },
    {
      value: "12",
      label: "Desember",
    },
  ];
  return listMonth;
};

export const getMonthPrefix = () => {
  return [
    {
      value: "1",
      key: "jan_rates",
    },
    {
      value: "2",
      key: "feb_rates",
    },
    {
      value: "3",
      key: "mar_rates",
    },
    {
      value: "4",
      key: "apr_rates",
    },
    {
      value: "5",
      key: "mei_rates",
    },
    {
      value: "6",
      key: "jun_rates",
    },
    {
      value: "7",
      key: "jul_rates",
    },
    {
      value: "8",
      key: "agu_rates",
    },
    {
      value: "9",
      key: "sep_rates",
    },
    {
      value: "10",
      key: "okt_rates",
    },
    {
      value: "11",
      key: "nov_rates",
    },
    {
      value: "12",
      key: "des_rates",
    },
  ];
};
