import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadStart } from "redux/response/response";
import { selectionMenu, urlPageRevenue } from "values/Constant";
import {
  routingCapex,
  routingMasterCoa,
  routingMpp,
  routingOpex,
  routingOthers,
  routingReport,
  routingRevenue,
} from "values/RoutingPage";
import { cekToken, formDataUtils, getLocal, log, setLocal } from "values/Utilitas";
import { actionRevenue, val } from "redux/action/action.reducer";
import { actionData } from "redux/data-global/data.reducer";
import MainServices from "services/MainServices";

const MainLogic = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [keyMenu, setKeyMenu] = useState(0);
  const [iEMenu, setiEmenu] = useState(0);
  const [listSubmenu, setListSubmenu] = useState([]);
  const [itemDisabledMenu, setitemDisabledMenu] = useState();
  const [titleMenu, setTitleMenu] = useState();
  const [isListMenuActivated, setListMenuActivated] = useState([2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [header, setHeader] = useState("");
  const [routerNewPage, setRouterNewPage] = useState("#");
  const [user, setUser] = useState({
    name: "",
    username: "",
    user_group: "",
    email: "",
    code_company: "",
    code_location: "",
    code_department: "",
    fullNameCompany: null,
  });
  const [openProfilModal, setOpenProfilModal] = useState(false);
  const [openModalForgetPassword, setOpenModalForgetPassword] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [dataPassword, setDataPassword] = useState();

  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname;
  const spliter = pathName?.split("/");

  const notifRedux = useSelector((state) => state.notif);

  useEffect(() => {
    // const movePage = getLocal("move-page");

    cekToken(navigate);

    // if (movePage !== "null") {
    //   navigate(movePage);
    // }

    if (spliter[2] === "") {
      setLocal("index-menu", 0);
      setLocal("name-menu", "Dashboard");
      navigate("/main");
    }

    onRefreshBrowser();
    onClosingTab();
    onActivatedMenu();
    onGetUser();
    // setLocal("move-page", null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   log("notifRedux", notifRedux)
  // }, [notifRedux])

  const showNotif = (status, message) => {
    dispatch(
      val({
        status: status,
        message: message,
      })
    );
  };

  const onRefreshBrowser = () => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      console.info("This page is reloaded");
      onActivatedMenu();
    }
  };

  const onActivatedMenu = () => {
    let isActivated = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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

  const onGetUser = async () => {
    const username = getLocal("username-get");
    try {
      let url = `users/${username}`;
      const { data } = await MainServices.get(url);
      const listCompany = [];

      const codeCompany = data.data?.code_company?.split(",");
      const companyNames = data.data?.company_names?.split(",");

      for (let i = 0; i < codeCompany?.length; i++) {
        listCompany.push(`${codeCompany[i]} - ${companyNames[i]}`);
      }

      setUser({ ...data.data, fullNameCompany: listCompany });
    } catch (error) {
      console.error(`Error fetching data`, error);
    }
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
    setOpenProfilModal(false);
    setOpenModalForgetPassword(false);
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

    let isActivated = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let pageNavigation = "";
    const index = parseInt(key);

    setTitleMenu(title);
    setKeyMenu(index);

    if (item === "menu") {
      // log({ index });
      if (index === 0) {
        setHeader("Dashboard");
        isActivated[index] = 1;
        pageNavigation = "/";
        navigate(pageNavigation);
        setLocal("move-page", pageNavigation);
        setLocal("index-menu", index);
        setLocal("name-menu", "Dashboard");
      } else if (index === 8) {
        isActivated[index] = 1;
        isActivated[iEMenu] = 2;
        setOpenProfilModal(true);
        setShowMenu(false);
      } else if (index === 9) {
        setHeader("Management User");
        isActivated[index] = 1;
        pageNavigation = "/main/management-user";
        navigate(pageNavigation);
        setLocal("move-page", pageNavigation);
        setLocal("index-menu", index);
        setLocal("name-menu", "Management user");
        setShowMenu(false);
        setOpenProfilModal(false);
      } else {
        isActivated[iEMenu] = 2;
        isActivated[index] = 1;
        getSubmenu(index);
        isShowMenu();
        if (openProfilModal === true) setOpenProfilModal(false);
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
      setOpenProfilModal(false);
      // setTitleHeader(title);

      setHeader(subMenu.description);

      pageNavigation = onPageNavigation(index, subMenu);

      navigate(pageNavigation);

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
        const routing = routingRevenue[nameMenu];
        pageNavigation = `/main/revenue-cogs/${inputOrSummary}/${routing}`;
      } else {
        pageNavigation = `/main/revenue-cogs/${urlPageRevenue[nameMenu]}/penjualan`;
      }
      dispatch(actionData({ sizeDataRevenue: 0 }));
      dispatch(
        actionRevenue({
          filterValuesPenjualan: undefined,
          filterValuesHpplain: undefined,
        })
      );
    } else if (index === 2) {
      const routing = routingOpex[nameMenu];
      pageNavigation = `/main/opex/${inputOrSummary}/${routing}`;
    } else if (index === 3) {
      const routing = routingCapex[nameMenu];
      pageNavigation = `/main/capex/${inputOrSummary}/${routing}`;
    } else if (index === 4) {
      const routing = routingMpp[nameMenu];
      pageNavigation = `/main/mpp/${inputOrSummary}/${routing}`;
    } else if (index === 5) {
      const routing = routingOthers[nameMenu];
      if (nameMenu === "Fasilitas Kredit") {
        pageNavigation = `/main/others/${routing}`;
      } else {
        pageNavigation = `/main/others/${inputOrSummary}/${routing}`;
      }
    } else if (index === 6) {
      const routing = routingReport[nameMenu];
      pageNavigation = `/main/report/${routing}`;
    } else if (index === 7) {
      const routing = routingMasterCoa[nameMenu];
      pageNavigation = `/main/coa/${routing}`;
    } else if (index === 8) {
      if (nameMenu === "Profile") {
        pageNavigation = `akun/profile`;
      } else if (nameMenu === "Logout") {
        pageNavigation = `/login`;
      }
    }
    // else if (index === 9) {
    //   pageNavigation = `/main/management-user`;
    // }

    return pageNavigation;
  };

  const getSubmenu = async (index) => {
    const sMenu = await selectionMenu(index);
    setListSubmenu(sMenu.submenu);
    setitemDisabledMenu(sMenu.disabled);
  };

  const onOpenModalForgetPassword = () => {
    setOpenModalForgetPassword(true);
  };

  const onClickYakin = (values) => {
    setOpenConfirm(true);
    setOpenModalForgetPassword(false);
    setDataPassword(values);
  };

  const onCancelYakin = () => {
    setOpenModalForgetPassword(false);
  };

  const onClickConfirm = async () => {
    try {
      const formData = formDataUtils({ ...dataPassword, id: user.id });
      const res = await MainServices.post("users/change-password", formData);
      showNotif(200, res.data.responseDescription);
      onCancelConfirm();
    } catch (e) {
      onOpenModalForgetPassword();
      onCancelConfirm();
      showNotif(400, e.response.data.responseDescription);
    }
  };

  const onCancelConfirm = () => {
    setOpenConfirm(false);
  };

  const onLogout = () => {
    navigate("/login");
  };

  return {
    func: {
      onClickedMenu,
      handleCancel,
      onMouseDownClickedMenu,
      onOpenModalForgetPassword,
      onLogout,
      onClickYakin,
      onCancelYakin,
      onClickConfirm,
      onCancelConfirm,
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
      openProfilModal,
      openModalForgetPassword,
      openConfirm,
      user,
    },
  };
};

export default MainLogic;
