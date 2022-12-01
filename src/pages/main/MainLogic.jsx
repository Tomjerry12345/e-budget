import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadStart } from "../../redux/response/response";
import { allItemSummarySubMenu, disabledItemSummaryMenu } from "../../values/Constant";
import { getLocal, getToken, log, setLocal } from "../../values/Utilitas";

const MainLogic = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [keyMenu, setKeyMenu] = useState(0);
  const [iEMenu, setiEmenu] = useState(0);
  const [item, setItem] = useState(0);
  const [itemDisabledMenu, setitemDisabledMenu] = useState();
  const [titleMenu, setTitleMenu] = useState();

  const [header, setHeader] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();
  const pathName = location.pathname;

  const spliter = pathName?.split("/");

  const token = getToken();

  // const [segmentedValue, setSegmentedValue] = useState("Input");

  const [isListMenuActivated, setListMenuActivated] = useState([2, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const movePage = getLocal("move-page");

    if (token === null) {
      navigate("/login");
    }
    if (movePage !== "null") {
      navigate(movePage);
    }

    onRefreshBrowser();
    onClosingTab();

    setLocal("move-page", null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onRefreshBrowser = () => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      let isActivated = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      console.info("This page is reloaded");
      const index = getLocal("index-menu");
      isActivated[index] = 2;
      setiEmenu(index);
      setListMenuActivated(isActivated);
    }
  };

  const onClosingTab = () => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  };

  const alertUser = (event) => {
    // setLocal("index-menu", null);
    setLocal("move-page", null);
  };

  const handleCancel = () => {
    const isActivated = [...isListMenuActivated];
    const i = isActivated.findIndex((val) => val === 2);

    if (i !== -1) {
      isActivated[keyMenu] = 0;
    } else {
      isActivated[keyMenu] = 2;
    }

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
    let isActivated = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    let pageNavigation = "";

    setTitleMenu(title);

    const index = parseInt(key);

    setKeyMenu(index);

    if (item === "menu") {
      // setSegmentedValue("Input");

      if (index === 0) {
        // setHeader("Dashboard");
        isActivated[index] = 2;
        setLocal("index-menu", index);
        setLocal("name-menu", "Dashboard");
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
      dispatch(loadStart());
      setLocal("index-menu", index);
      setLocal("name-menu", nameMenu);
      setiEmenu(keyMenu);
      isActivated[index] = 2;
      setItem([]);
      setShowMenu(false);
      // setTitleHeader(title);

      setHeader(nameMenu);

      const name = nameMenu.split(" ");
      const pathMove = name[0].toLowerCase();
      const inputOrSummary = pathMove !== "input" ? "summary" : pathMove;

      if (index === 1) {
        if (nameMenu === "Summary Revenue & COGS" || nameMenu === "Input Direct Revenue & COGS") {
          pageNavigation = `/main/revenue-cogs/${inputOrSummary}/${nameMenu}`;
        } else {
          pageNavigation = `/main/revenue-cogs/others/${nameMenu}/penjualan`;
        }
      } else if (index === 2) {
        pageNavigation = `/main/opex/${inputOrSummary}/${nameMenu}`;
      } else if (index === 3) {
        pageNavigation = `/main/capex/${inputOrSummary}/${nameMenu}`;
      } else if (index === 4) {
        pageNavigation = `/main/mpp/${inputOrSummary}/${nameMenu}`;
      } else if (index === 5) {
        if (nameMenu === "Input Asumsi") {
          pageNavigation = `/main/others/others-input/Input Asumsi`;
        } else {
          pageNavigation = `/main/others/${inputOrSummary}/${nameMenu}`;
        }
      } else if (index === 6) {
        const baseReport = `/main/report`;
        if (nameMenu === "Laba Rugi") {
          pageNavigation = `${baseReport}/laba-rugi`;
        }
      } else if (index === 7) {
        pageNavigation = `/main/coa/${nameMenu}`;
      } else if (index === 8) {
        log("nameMenu", nameMenu);

        if (nameMenu === "Logout") {
          pageNavigation = `/login`;
        }
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
    setItem(allItemSummarySubMenu[index]);
    setitemDisabledMenu(disabledItemSummaryMenu[index]);
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
      header,
      // segmentedValue,
    },
  };
};

export default MainLogic;
