import { combineReducers } from "redux";
import reducer from "./reducer";
import { importSlice, notifSlice, revenueSlice } from "./action/action.reducer";
import { dataGlobalSlice } from "./data-global/data.reducer";
import { dataSubmenuSlice } from "./data-global/data.submenu.reducer";

const RootRedux = () =>
  combineReducers({
    reducer: reducer,
    notif: notifSlice.reducer,
    import: importSlice.reducer,
    data: dataGlobalSlice.reducer,
    submenu: dataSubmenuSlice.reducer,
    revenue: revenueSlice.reducer,
  });

export default RootRedux;
