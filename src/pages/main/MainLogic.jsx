import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainLogic = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [keyMenu, setKeyMenu] = useState(0);
  const [iEMenu, setiEmenu] = useState(0);
  const [item, setItem] = useState(0);
  const [segmentedValue, setSegmentedValue] = useState("input");

  const [isListMenuActivated, setListMenuActivated] = useState([2, 0, 0, 0, 0, 0, 0, 0]);

  const allItem = [[], [], [], [], [], [], ["Kode perusahaan", "Kode produk", "Kode Lokasi", "Kode Departemen", "Kode Akun", "Kode Projek", "Kode ICP"], []];

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
      isActivated[iEMenu] = 2;
      isActivated[index] = 1;
      setItem(allItem[index]);
      isShowMenu();
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
