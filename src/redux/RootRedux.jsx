import { combineReducers } from "redux";
import reducer from "./reducer";
import { importSlice, notifSlice, revenueSlice } from "./action/action.reducer";
import { dataGlobalSlice } from "./data-global/data.reducer";
import { cellTemplateSlice } from "./action/cell.template.reducer";

const RootRedux = () =>
  combineReducers({
    reducer: reducer,
    notif: notifSlice.reducer,
    import: importSlice.reducer,
    data: dataGlobalSlice.reducer,
    revenue: revenueSlice.reducer,
    cellTemplate: cellTemplateSlice.reducer
  });

export default RootRedux;
