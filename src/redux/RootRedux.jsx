import { combineReducers } from "redux";
import reducer from "./reducer";
import { importSlice, notifSlice } from "./action/action.reducer";
import { dataGlobalSlice } from "./data-global/data.reducer";

const RootRedux = () =>
  combineReducers({
    reducer: reducer,
    notif: notifSlice.reducer,
    import: importSlice.reducer,
    data: dataGlobalSlice.reducer,
  });

export default RootRedux;
