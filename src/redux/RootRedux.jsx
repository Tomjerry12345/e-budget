import { combineReducers } from "redux";
import usersReducer from "./users/users.reducer";

const RootRedux = () =>
  combineReducers({
    users: usersReducer,
  });

export default RootRedux;
