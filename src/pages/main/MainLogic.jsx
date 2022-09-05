import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allItemInputSubMenu, allItemSummarySubMenu, disabledItemInputMenu, disabledItemSummaryMenu } from "../../values/Constant";
import { getLocal, log, setLocal } from "../../values/Utilitas";

const MainLogic = () => {
  const navigate = useNavigate();
  let params = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [keyMenu, setKeyMenu] = useState(0);
  const [iEMenu, setiEmenu] = useState(0);
  const [item, setItem] = useState(0);
  const [itemDisabledMenu, setitemDisabledMenu] = useState();
  const [segmentedValue, setSegmentedValue] = useState("Input");

  const [isListMenuActivated, setListMenuActivated] = useState([2, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      let isActivated = [0, 0, 0, 0, 0, 0, 0, 0];
      console.info("This page is reloaded");
      const index = getLocal("index-menu");
      isActivated[index] = 2;
      setiEmenu(index);
      setListMenuActivated(isActivated);
    }
  }, []);

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
    log(`iEmenu => ${iEMenu}`);

    if (item === "menu") {
      setSegmentedValue("Input");

      log("menu clicked");
      if (index === 0) {
        isActivated[index] = 2;
        setLocal("index-menu", index);
        navigate(`/`);
      } else {
        isActivated[iEMenu] = 2;
        isActivated[index] = 1;
        getSubmenu(index, segmentedValue);
        isShowMenu();
      }
    } else {
      setLocal("index-menu", index);
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
      segmentedValue,
    },
  };
};

export default MainLogic;
