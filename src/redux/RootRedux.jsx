import { combineReducers } from "redux";
import reducer from "./reducer";

const RootRedux = () =>
  combineReducers({
    reducer: reducer,
  });

export default RootRedux;
