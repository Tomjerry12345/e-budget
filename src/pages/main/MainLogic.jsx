import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainLogic = () => {
  const navigate = useNavigate();
  const [namePage, setNamePage] = useState("");

  const [isListMenuActivated, setListMenuActivated] = useState([true, false, false, false, false, false, false, false]);

  const itemCoa = ["Kode perusahaan", "Kode produk", "Kode Lokasi", "Kode Departemen", "Kode Akun", "Kode Projek", "Kode ICP", "Kode ICP 1", "Kode ICP 2", "Kode ICP 3", "Kode ICP 4"];

  const onClickedMenu = (key) => {
    let isActivated = [false, false, false, false, false, false, false, false];

    const listKey = key.split("_");

    const index = parseInt(listKey[0]);
    const nameMenu = listKey[1];

    isActivated[index] = true;
    setListMenuActivated(isActivated);
    if (index === 0) {
      console.log("Dashboard");
      navigate(`/`);
    } else if (index === 7) {
      console.log("COA");
      navigate(`/coa/input/${nameMenu}`);
    } else {
      console.log("not selected");
    }
  };

  const onChangeSegmented = (value) => {
    console.log(`segmented value => ${value}`);
  };

  return {
    func: {
      onClickedMenu,
      onChangeSegmented,
    },
    value: {
      namePage,
      itemCoa,
      isListMenuActivated,
    },
  };
};

export default MainLogic;
