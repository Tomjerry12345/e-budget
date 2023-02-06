import { combineReducers } from "redux";
import notifSlice from "./action/action.reducer";
import reducer from "./reducer";

const RootRedux = () =>
  combineReducers({
    reducer: reducer,
    notif: notifSlice
  });

export default RootRedux;
