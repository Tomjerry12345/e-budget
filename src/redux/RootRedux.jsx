import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import usersReducer from "./users/users.reducer";

const RootRedux = () =>
  combineReducers({
    users: usersReducer,
    auth: authReducer,
  });

export default RootRedux;
