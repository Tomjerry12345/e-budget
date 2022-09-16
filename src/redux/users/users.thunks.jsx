import UsersServices from "../../services/UsersServices";
import { loadError, loadStart, loadSuccess } from "../response/response";

const loadUsersAsync = () => (dispatch) => {
  dispatch(loadStart());

  UsersServices.getAllUsers()
    .then((response) => dispatch(loadSuccess(response.data)))
    .catch((error) => dispatch(loadError(error.message)));
};

export default loadUsersAsync;
