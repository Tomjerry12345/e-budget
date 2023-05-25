import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadStart } from "../../redux/response/response";
import {
  allItemSummarySubMenu,
  disabledItemSummaryMenu,
  selectionMenu,
  urlPageRevenue,
} from "../../values/Constant";
import {
  routingMasterCoa,
  routingOpex,
  routingOthers,
  routingReport,
} from "../../values/RoutingPage";
import { cekToken, getLocal, getToken, log, setLocal } from "../../values/Utilitas";

const MainLogic = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [keyMenu, setKeyMenu] = useState(0);
  const [iEMenu, setiEmenu] = useState(0);
  const [listSubmenu, setListSubmenu] = useState([]);
  const [itemDisabledMenu, setitemDisabledMenu] = useState();
  const [titleMenu, setTitleMenu] = useState();
  const [isListMenuActivated, setListMenuActivated] = useState([2, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [header, setHeader] = useState("");
  const [routerNewPage, setRouterNewPage] = useState("#");

  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname;
  const spliter = pathName?.split("/");

  const notifRedux = useSelector((state) => state.notif);

  useEffect(() => {
    const movePage = getLocal("move-page");

    cekToken(navigate);

    if (movePage !== "null") {
      navigate(movePage);
    }

    if (spliter[2] === "") {
      setLocal("index-menu", 0);
      setLocal("name-menu", "Dashboard");
      navigate("/main");
    }

    onRefreshBrowser();
    onClosingTab();
    onActivatedMenu();
    // setLocal("move-page", null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   log("notifRedux", notifRedux)
  // }, [notifRedux])

  const onRefreshBrowser = () => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      console.info("This page is reloaded");
      onActivatedMenu();
    }
  };

  const onActivatedMenu = () => {
    let isActivated = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const index = getLocal("index-menu");
    isActivated[index] = 2;
    setiEmenu(index);
    setListMenuActivated(isActivated);
  };

  const onClosingTab = () => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  };

  const alertUser = (event) => {
    // setLocal("index-menu", null);
    // setLocal("move-page", null);
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

  const onClickedMenu = (key, item, subMenu, title, e) => {
    if (e !== undefined) e.preventDefault();

    let isActivated = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let pageNavigation = "";
    const index = parseInt(key);

    setTitleMenu(title);
    setKeyMenu(index);

    if (item === "menu") {
      if (index === 0) {
        setHeader("Dashboard");

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
      cekToken(navigate);
      dispatch(loadStart());
      setLocal("index-menu", index);
      setLocal("name-menu", subMenu.description);

      setiEmenu(keyMenu);
      isActivated[index] = 2;
      setListSubmenu([]);
      setShowMenu(false);
      // setTitleHeader(title);

      setHeader(subMenu.description);

      pageNavigation = onPageNavigation(index, subMenu);

      navigate(pageNavigation, {
        state: {
          item: subMenu,
        },
      });

      setLocal("move-page", pageNavigation);
    }

    setListMenuActivated(isActivated);
  };

  const onMouseDownClickedMenu = (key, subMenu) => {
    const index = parseInt(key);
    let pageNavigation = onPageNavigation(index, subMenu);
    setRouterNewPage(pageNavigation);
    setLocal("index-menu", index);
    setLocal("name-menu", subMenu.description);
    setLocal("move-page", pageNavigation);
  };

  const onPageNavigation = (index, subMenu) => {
    let pageNavigation = "";
    const nameMenu = subMenu.description;
    const name = nameMenu.split(" ");
    const pathMove = name[0].toLowerCase();
    const inputOrSummary = pathMove !== "input" ? "summary" : pathMove;

    if (index === 1) {
      if (nameMenu === "Summary Revenue & COGS" || nameMenu === "Input Direct Revenue & COGS") {
        pageNavigation = `/main/revenue-cogs/${urlPageRevenue[nameMenu]}`;
      } else {
        pageNavigation = `/main/revenue-cogs/${urlPageRevenue[nameMenu]}/penjualan`;
      }
    } else if (index === 2) {
      const routing = routingOpex[nameMenu];
      pageNavigation = `/main/opex/${inputOrSummary}/${routing}`;
    } else if (index === 3) {
      pageNavigation = `/main/capex/${inputOrSummary}/${nameMenu}`;
    } else if (index === 4) {
      pageNavigation = `/main/mpp/${inputOrSummary}/${nameMenu}`;
    } else if (index === 5) {
      const routing = routingOthers[nameMenu];
      pageNavigation = `/main/others/${inputOrSummary}/${routing}`;
      // if (nameMenu === "Input Asumsi") {
      //   pageNavigation = `/main/others/others-input/Input Asumsi`;
      // } else {
      //   pageNavigation = `/main/others/${inputOrSummary}/${nameMenu}`;
      // }
    } else if (index === 6) {
      const routing = routingReport[nameMenu];
      pageNavigation = `/main/report/${routing}`;
    } else if (index === 7) {
      const routing = routingMasterCoa[nameMenu];
      pageNavigation = `/main/coa/${routing}`;
    } else if (index === 8) {
      log("nameMenu", nameMenu);

      if (nameMenu === "Logout") {
        pageNavigation = `/login`;
      }
    }

    return pageNavigation;
  };

  const getSubmenu = async (index) => {
    const sMenu = await selectionMenu(index);
    log("sMenu.submenu", sMenu.submenu);
    setListSubmenu(sMenu.submenu);
    setitemDisabledMenu(sMenu.disabled);
  };

  return {
    func: {
      onClickedMenu,
      handleCancel,
      onMouseDownClickedMenu,
    },
    value: {
      listSubmenu,
      isListMenuActivated,
      showMenu,
      keyMenu,
      itemDisabledMenu,
      titleMenu,
      params,
      header,
      routerNewPage,
      navigate,
      notifRedux,
    },
  };
};

export default MainLogic;
