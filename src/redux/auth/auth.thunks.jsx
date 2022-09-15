import AuthServices from "../../services/AuthServices";
import { loadStart, loadSuccess, loadError } from "../response/response";

const loginAsync = (req) => (dispatch) => {
  dispatch(loadStart());

  AuthServices.login(req)
    .then((response) => dispatch(loadSuccess(response.data)))
    .catch((error) => dispatch(loadError(error.message)));
};

export default loginAsync;
