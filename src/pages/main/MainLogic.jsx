import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allItemInputSubMenu, allItemSummarySubMenu, disabledItemInputMenu, disabledItemSummaryMenu } from "../../values/Constant";

const MainLogic = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [keyMenu, setKeyMenu] = useState(0);
  const [iEMenu, setiEmenu] = useState(0);
  const [item, setItem] = useState(0);
  const [itemDisabledMenu, setitemDisabledMenu] = useState();
  const [segmentedValue, setSegmentedValue] = useState("Input");

  const [isListMenuActivated, setListMenuActivated] = useState([2, 0, 0, 0, 0, 0, 0, 0]);

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
        getSubmenu(index, segmentedValue);
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
  };

  const onChangeSegmented = (value) => {
    console.log(`segmented value => ${value}`);
    setSegmentedValue(value);
    getSubmenu(keyMenu, value);
  };

  const getSubmenu = (index, value) => {
    if (value === "Input") {
      setItem(allItemInputSubMenu[index]);
      setitemDisabledMenu(disabledItemInputMenu[index]);
    } else {
      setItem(allItemSummarySubMenu[index]);
      setitemDisabledMenu(disabledItemSummaryMenu[index]);
    }
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
      itemDisabledMenu,
    },
  };
};

export default MainLogic;
