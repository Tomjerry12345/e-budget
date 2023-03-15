import MainServices from "../../services/MainServices";
import { log } from "../../values/Utilitas";
import { loadStart, loadSuccess, loadError } from "../response/response";

const getAsync = (path, nameReducer, start) => (dispatch) => {
  dispatch(loadStart(nameReducer, start));
  MainServices.get(path)
    .then((response) => dispatch(loadSuccess(response.data)))
    .catch((error) => {
      console.log(`error => ${error}`);
      dispatch(loadError(error.message));
    });
};

const postAsync = (path, req, nameReducer, start) => (dispatch) => {
  dispatch(loadStart(nameReducer, start));
  MainServices.post(path, req)
    .then((response) => dispatch(loadSuccess(response.data)))
    .catch((error) => {
      console.log(`error => ${error}`);
      dispatch(loadError(error.message));
    });
};

const deleteAsync = (path, req, nameReducer, start) => (dispatch) => {
  dispatch(loadStart(nameReducer, start));
  MainServices.delete(path, req)
    .then((response) => dispatch(loadSuccess(response.data)))
    .catch((error) => dispatch(loadError(error.message)));
};

export { getAsync, postAsync, deleteAsync };
