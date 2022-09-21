import {
  constantGetCoa,
  constantUploadCoa,
} from "../../pages/main/coa/ConstantCoa";
import MainServices from "../../services/MainServices";
import { loadStart, loadSuccess, loadError } from "../response/response";

// const getCoaAsync = (path) => (dispatch) => {
//   dispatch(loadStart(constantGetCoa));
//   MainServices.getCoa(path)
//     .then((response) => dispatch(loadSuccess(response.data)))
//     .catch((error) => dispatch(loadError(error.message)));
// };

// const uploadCoaAsync = (path, req) => (dispatch) => {
//   dispatch(loadStart(constantUploadCoa));
//   MainServices.uploadCoa(path, req)
//     .then((response) => dispatch(loadSuccess(response.data)))
//     .catch((error) => dispatch(loadError(error.message)));
// };

const getAsync = (path, nameReducer) => (dispatch) => {
  dispatch(loadStart(nameReducer));
  MainServices.get(path)
    .then((response) => dispatch(loadSuccess(response.data)))
    .catch((error) => dispatch(loadError(error.message)));
};

const postAsync = (path, req, nameReducer) => (dispatch) => {
  dispatch(loadStart(nameReducer));
  MainServices.post(path, req)
    .then((response) => dispatch(loadSuccess(response.data)))
    .catch((error) => dispatch(loadError(error.message)));
};

export { getAsync, postAsync };
