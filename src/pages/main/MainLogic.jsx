import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allItemInputSubMenu, disabledItemInputMenu } from "../../values/Constant";
import { getLocal, setLocal } from "../../values/Utilitas";

const MainLogic = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [keyMenu, setKeyMenu] = useState(0);
  const [iEMenu, setiEmenu] = useState(0);
  const [item, setItem] = useState(0);
  const [itemDisabledMenu, setitemDisabledMenu] = useState();
  const [titleMenu, setTitleMenu] = useState();
  const [titleHeader, setTitleHeader] = useState();
  // const [segmentedValue, setSegmentedValue] = useState("Input");

  const [isListMenuActivated, setListMenuActivated] = useState([2, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const movePage = getLocal("move-page");
    if (movePage !== "null") {
      navigate(movePage);
    }

    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      let isActivated = [0, 0, 0, 0, 0, 0, 0, 0];
      console.info("This page is reloaded");
      const index = getLocal("index-menu");
      isActivated[index] = 2;
      setiEmenu(index);
      setListMenuActivated(isActivated);
    }
    setLocal("move-page", null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const onClickedMenu = (key, item, nameMenu, title) => {
    let isActivated = [0, 0, 0, 0, 0, 0, 0, 0];

    let pageNavigation = "";

    setTitleMenu(title);

    const index = parseInt(key);

    setKeyMenu(index);

    if (item === "menu") {
      // setSegmentedValue("Input");

      if (index === 0) {
        isActivated[index] = 2;
        setLocal("index-menu", index);
        pageNavigation = "/";
        navigate(pageNavigation);
        setLocal("move-page", pageNavigation);
      } else {
        isActivated[iEMenu] = 2;
        isActivated[index] = 1;
        getSubmenu(index);
        isShowMenu();
      }
    } else {
      setLocal("index-menu", index);
      setiEmenu(keyMenu);
      isActivated[index] = 2;
      setItem([]);
      setShowMenu(false);
      // setTitleHeader(title);

      if (index === 2) {
        pageNavigation = `/main/opex/summary/${nameMenu}`;
      } else if (index === 7) {
        pageNavigation = `/main/coa/${nameMenu}`;
      }

      navigate(pageNavigation);

      setLocal("move-page", pageNavigation);
    }

    setListMenuActivated(isActivated);
  };

  // const onChangeSegmented = (value) => {
  //   setSegmentedValue(value);
  //   getSubmenu(keyMenu, value);
  // };

  const getSubmenu = (index) => {
    setItem(allItemInputSubMenu[index]);
    setitemDisabledMenu(disabledItemInputMenu[index]);
  };

  return {
    func: {
      onClickedMenu,
      // onChangeSegmented,
      handleCancel,
    },
    value: {
      item,
      isListMenuActivated,
      showMenu,
      keyMenu,
      itemDisabledMenu,
      titleMenu,
      params,
      // segmentedValue,
    },
  };
};

export default MainLogic;
