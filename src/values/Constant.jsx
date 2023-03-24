import { getLocal, log } from "./Utilitas";

export const allItemSummarySubMenu = [
  // 1 Dashboard
  [],
  // 2 Revenue & COGS
  [
    "Revenue & COGS HK", // 0
    "Revenue & COGS KIU", // 1
    "Revenue & COGS GMM", // 2
    "Revenue & COGS KIA", // 3
    "Revenue & COGS BJU", // 4
    "Revenue & COGS BLT", // 5
    "Revenue & COGS BLU", // 6
    "Revenue & COGS BK", // 7
    "Revenue & COGS BSU", // 8
    "Revenue & COGS BSB", // 9
    "Revenue & COGS KIK", // 10
    "Revenue & COGS IKP", // 11
    "Revenue & COGS BAND", // 12
    "Input Direct Revenue & COGS", // 13
    "Summary Revenue & COGS", // 14
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
    "Input Direct Pendapatan Non Operasional",
    "Input Direct Biaya Non Operasional",
    "Input Direct All",
    "Summary Biaya Non Operasional",
    "Summary Pendapatan Non Operasional",
    "Input Asumsi",
  ],
  // 7 Report
  ["Laba Rugi"],
  // 8 Master COA
  [
    "Kode perusahaan",
    "Kode produk",
    "Kode lokasi",
    "Kode departemen",
    "Kode akun",
    "Kode projek",
    "Kode ICP",
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
  [false, false, false, false, false, true],
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

export const selectionMenu = (i) => {
  const user = getLocal("user_group");

  if (user === "superadmin") {
    return superAdmin(i);
  } else if (user === "usersbu") {
    return userBu(i);
  }
};

export const superAdmin = (i) => {
  return {
    submenu: allItemSummarySubMenu[i],
    disabled: disabledItemSummaryMenu[i],
  };
};

export const userBu = (i) => {
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
    }
  }

  return v;
};

export const changeMenu = (i, a = []) => {
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
