import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainLogic = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [keyMenu, setKeyMenu] = useState(0);
  const [iEMenu, setiEmenu] = useState(0);
  const [item, setItem] = useState(0);
  const [segmentedValue, setSegmentedValue] = useState("input");

  const [isListMenuActivated, setListMenuActivated] = useState([
    2, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const allItem = [
    [],
    [
      " Revenue & COGS HK",
      " Revenue & COGS KIU",
      " Revenue & COGS BTS",
      " Revenue & COGS KIA",
      " Revenue & COGS BJU",
      " Revenue & COGS BLT",
      " Revenue & COGS BLU",
      " Revenue & COGS BK",
      " Revenue & COGS BSU",
      " Revenue & COGS BSB",
      " Revenue & COGS KIK",
      " Revenue & COGS IKP",
      " Revenue & COGS BAND",
      " Revenue & COGS",
    ],
    [
      "Iklan & Advertensi",
      "Pemasaran Lainnya",
      "Sewa",
      "Pemeliharaan",
      "Perlengkapan Kantor",
      "Pengiriman Dokumen",
      "FC, Cetakan & Jilid",
      "Listrik, Air & Telepon",
      "Surat Kabar",
      "Pantri",
      "Asuransi",
      "Keamanan & Kebersihan",
      "Internet",
      "Tender",
      "Kontraktual, Rapat, Clearance",
      "BBM, Tol, Parkir",
      "Transportasi",
      "Perjalanan Dinas",
      "Pajak Kendaraan",
      "Pajak",
      "Pajak Parkir & Resto",
      "Izin & Konsultan",
      "Administrasi Lainnya",
      "Risiko",
      "Operasional Lainnya",
      "Opex Direct",
    ],
    [
      "Existing Aset",
      "New Aset",
      "Capex Direct",
      "Existing Penyusutan",
      "Saldo Awal Akumulasi",
      "New Aset",
      "New Aset Penyusutan",
      "New Aset Akumulasi",
      "Total Aset",
      "Total Penyusutan",
      "Total Akumulasi Penyusutan",
    ],
    [
      "Rate",
      "Gaji",
      "Tunjangan",
      "Lembur",
      "THR & Bonus",
      "BPJS",
      "Kesejahteraan Karyawan",
      "PPH 21",
      "DPLK",
      "Pendidikan Dan Pelatihan",
      "MPP Direct",
    ],
    [
      "Pendapatan Non Operasional",
      "Biaya Non Operasional",
      "Direct All",
      "Asumsi",
    ],
    [],
    [
      "Kode perusahaan",
      "Kode produk",
      "Kode lokasi",
      "Kode departemen",
      "Kode akun",
      "Kode projek",
      "Kode ICP",
    ],
  ];

  const handleCancel = () => {
    const isActivated = [...isListMenuActivated];
    isActivated[keyMenu] = 0;
    setListMenuActivated(isActivated);
    setShowMenu(false);
  };

  const isShowMenu = () => {
    if (showMenu === true) {
      setShowMenu(false);
      setTimeout(() => {
        setShowMenu(true);
      }, 100);
    } else {
      setShowMenu(true);
    }
  };

  const onClickedMenu = (key, item, nameMenu) => {
    let isActivated = [0, 0, 0, 0, 0, 0, 0, 0];

    const index = parseInt(key);

    setKeyMenu(index);

    if (item === "menu") {
      if (index === 0) {
        isActivated[index] = 2;
        navigate(`/`);
      } else {
        isActivated[iEMenu] = 2;
        isActivated[index] = 1;
        setItem(allItem[index]);
        isShowMenu();
      }
    } else {
      setiEmenu(keyMenu);
      isActivated[index] = 2;
      setItem([]);
      setShowMenu(false);
      navigate(`/coa/${segmentedValue}/${nameMenu}`);
    }

    setListMenuActivated(isActivated);

    // if (index === 0) {
    //   console.log("Dashboard");
    //   navigate(`/`);
    // } else if (index === 7) {
    //   console.log("COA");
    //   navigate(`/coa/input/${nameMenu}`);
    // } else {
    //   console.log("not selected");
    // }
  };

  const onChangeSegmented = (value) => {
    console.log(`segmented value => ${value}`);
    setSegmentedValue(value);
  };

  return {
    func: {
      onClickedMenu,
      onChangeSegmented,
      handleCancel,
    },
    value: {
      item,
      isListMenuActivated,
      showMenu,
      keyMenu,
    },
  };
};

export default MainLogic;
