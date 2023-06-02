import MainServices from "../services/MainServices";
import { getLocal, log, logO } from "./Utilitas";

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
    "Input By Iklan & Advertensi",
    "Input By Pemasaran Lainnya",
    "Input By Sewa",
    "Input By Pemeliharaan",
    "Input By Perlengkapan Kantor",
    "Input By Pengiriman Dokumen",
    "Input By FC, Cetakan & Jilid",
    "Input By Listrik, Air & Telepon",
    "Input By Surat Kabar",
    "Input By Pantri",
    "Input By Asuransi",
    "Input By Keamanan & Kebersihan",
    "Input By Internet",
    "Input By Tender",
    "Input By Kontraktual, Rapat, Clearance",
    "Input By BBM, Tol, Parkir",
    "Input By Transportasi",
    "Input By Perjalanan Dinas",
    "Input By Pajak Kendaraan",
    "Input By Pajak",
    "Input By Pajak Parkir & Resto",
    "Input By Izin & Konsultan",
    "Input By Administrasi Lainnya",
    "Input By Risiko",
    "Input By Operasional Lainnya",
    "Input By Opex Direct",
    "Summary By Iklan & Advertensi",
    "Summary By Pemasaran Lainnya",
    "Summary By Sewa",
    "Summary By Pemeliharaan",
    "Summary By Perlengkapan Kantor",
    "Summary By Pengiriman Dokumen",
    "Summary By FC, Cetakan & Jilid",
    "Summary By Listrik, Air & Telepon",
    "Summary By Surat Kabar",
    "Summary By Pantri",
    "Summary By Asuransi",
    "Summary By Keamanan & Kebersihan",
    "Summary By Internet",
    "Summary By Tender",
    "Summary By Kontraktual, Rapat, Clearance",
    "Summary By BBM, Tol, Parkir",
    "Summary By Transportasi",
    "Summary By Perjalanan Dinas",
    "Summary By Pajak Kendaraan",
    "Summary By Pajak",
    "Summary By Pajak Parkir & Resto",
    "Summary By Izin & Konsultan",
    "Summary By Administrasi Lainnya",
    "Summary By Risiko",
    "Summary By Operasional Lainnya",
    "Summary Budget Opex",
  ],
  // 4 Capex
  [
    "Load Saldo Awal",
    "Input New Aset",
    "Retired Aset",
    "Input Direct Capex",
    "Summary Existing Aset",
    "Summary Penyusutan Existing Aset",
    "Summary Saldo Awal Akumulasi Penyusutan",
    "Summary New Aset",
    "Summary Penyusutan New Aset",
    "Summary Akumulasi Penyusutan New Aset",
    "Summary Disposal Aset",
    "Summary Penyusutan Disposal Aset",
    "Summary Akumulasi Penyusutan Disposal Aset",
    "Summary Total Aset",
    "Summary Total Penyusutan",
    "Summary Total Akumulasi Penyusutan",
  ],
  // 5 MPP
  [
    "MPP General Asumption",
    "Input Rate Assumption",
    "Input Rate Salary",
    "Input Headcount Salary",
    "Input Headcount Assumption",
    "Input Days",
    "Input Jam Lembur",
    "Input by lembur",
    "Input Biaya Pengobatan",
    "Input Biaya PPh 21",
    "Input Biaya BPJS TK",
    "Input Biaya BPJS Kesehatan",
    "Input Biaya Pendidikan & Latihan",
    "Input Biaya Rekrutment & Assessment",
    "Input Biaya Uniform & Safety",
    "Input Biaya DPLK",
    "Input Biaya MPP Lainnya",
    "Input MPP Direct",
    "Summary Gaji",
    "Summary By THR",
    "Summary By Lembur",
    "Summary By Makan dan Minum",
    "Summary By Pengobatan",
    "Summary By PPh Pasal 21",
    "Summary By BPJS TK",
    "Summary By BPJS Kesehatan",
    "Summary By Transportasi",
    "Summary By Komunikasi",
    "Summary By Pendidikan & Pelatihan",
    "Summary By Rekrutment & Assessment",
    "Summary By Uniform & Safety",
    "Summary By DPLK",
    "Summary By MPP Lainnya",
    "Summary MPP",
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
  ["Profile", "Logout"],
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
    true,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    true,
    true,
    false,
  ],
  // 4 Capex
  [
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
  ],
  // 5 MPP
  [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
  ],
  // 6 Others
  [false, false, false, false, false, false, true],
  // 7 Report
  [false],
  // 8 Master COA
  [false, false, false, false, false, false, false],
  // 9 Akun
  [false, false],
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

  if (user === "superadmin") {
    return await superAdmin(i);
  } else if (user === "usersbu") {
    return userBu(i);
  } else {
    return reviewer(i);
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
          description: "Input By Operasional Lainnya",
          children: [],
        },

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
      logO({ res });
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

    // return {
    //   fulldata: listFullDataSubMenu,
    //   submenu: listSubMenu,
    //   disabled: disabledItemSummaryMenu[i],
    // };
  });
};

const userBu = (i) => {
  let v = {
    submenu: allItemSummarySubMenu[i],
    disabled: disabledItemSummaryMenu[i],
  };

  if (i === 1) {
    const codeCompany = getLocal("code_company");

    if (codeCompany === "412") {
      return changeMenu(i, [13, 14]);
    } else if (codeCompany === "326") {
      return changeMenu(i, [1, 13, 14]);
    } else if (codeCompany === "411") {
      return changeMenu(i, [8, 13, 14]);
    } else if (codeCompany === "422") {
      return changeMenu(i, [6, 13, 14]);
    } else if (codeCompany === "311") {
      return changeMenu(i, [0, 13, 14]);
    } else if (codeCompany === "312") {
      return changeMenu(i, [4, 13, 14]);
    } else if (codeCompany === "231") {
      return changeMenu(i, [12, 13, 14]);
    } else if (codeCompany === "328") {
      return changeMenu(i, [2, 13, 14]);
    } else if (codeCompany === "211") {
      return changeMenu(i, [13, 14]);
    } else if (codeCompany === "242") {
      return changeMenu(i, [11, 13, 14]);
    } else if (codeCompany === "241") {
      return changeMenu(i, [10, 13, 14]);
    } else if (codeCompany === "313") {
      return changeMenu(i, [3, 13, 14]);
    } else if (codeCompany === "421") {
      return changeMenu(i, [5, 13, 14]);
    } else if (codeCompany === "221") {
      return changeMenu(i, [13, 14]);
    } else if (codeCompany === "413") {
      return changeMenu(i, [9, 13, 14]);
    } else if (codeCompany === "399") {
      return changeMenu(i, [13, 14]);
    }
  }

  return v;
};

const reviewer = (i) => {
  let v = {
    submenu: allItemSummarySubMenu[i],
    disabled: disabledItemSummaryMenu[i],
  };

  if (i === 1) {
    const codeCompany = getLocal("code_company");

    if (codeCompany === "312, 421, 422, 328, 311, 313, 326") {
      return changeMenu(i, [0, 1, 2, 3, 4, 5, 6, 13, 14]);
    } else if (codeCompany === "231, 242, 241") {
      return changeMenu(i, [10, 11, 12, 13, 14]);
    } else if (codeCompany === "221, 413, 411") {
      return changeMenu(i, [7, 8, 9, 13, 14]);
    }
  }

  return v;
};

const changeMenu = (i, a = []) => {
  let s = [];
  let d = [];

  a.forEach((item) => {
    s.push(allItemSummarySubMenu[i][item]);
    d.push(disabledItemSummaryMenu[i][item]);
  });

  log("s", s);
  log("d", d);

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
};
