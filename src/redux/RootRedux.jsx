import { combineReducers } from "redux";
import reducer from "./reducer";
import { importSlice, notifSlice, revenueSlice } from "./action/action.reducer";
import { dataGlobalSlice } from "./data-global/data.reducer";

const RootRedux = () =>
  combineReducers({
    reducer: reducer,
    notif: notifSlice.reducer,
    import: importSlice.reducer,
    data: dataGlobalSlice.reducer,
    revenue: revenueSlice.reducer,
  });

export default RootRedux;
