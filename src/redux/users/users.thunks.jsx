import UsersServices from "../../services/UsersServices";
import { usersLoadStart, usersLoadSuccess, usersLoadError } from "./users.actions";

const loadUsersAsync = () => (dispatch) => {
  dispatch(usersLoadStart());

  UsersServices.getAllUsers()
    .then((response) => dispatch(usersLoadSuccess(response.data)))
    .catch((error) => dispatch(usersLoadError(error.message)));
};

export default loadUsersAsync;
