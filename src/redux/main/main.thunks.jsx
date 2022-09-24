import MainServices from "../../services/MainServices";
import { loadStart, loadSuccess, loadError } from "../response/response";

const getAsync = (path, nameReducer, start) => (dispatch) => {
  dispatch(loadStart(nameReducer, start));
  MainServices.get(path)
    .then((response) => dispatch(loadSuccess(response.data)))
    .catch((error) => dispatch(loadError(error.message)));
};

const postAsync = (path, req, nameReducer, start) => (dispatch) => {
  dispatch(loadStart(nameReducer, start));
  MainServices.post(path, req)
    .then((response) => dispatch(loadSuccess(response.data)))
    .catch((error) => dispatch(loadError(error.message)));
};

export { getAsync, postAsync };
