import {
  constantGetCoa,
  constantUploadCoa,
} from "../../pages/main/coa/input/ConstantCoa";
import MainServices from "../../services/MainServices";
import { loadStart, loadSuccess, loadError } from "../response/response";

const getCoaAsync = (path) => (dispatch) => {
  dispatch(loadStart(constantGetCoa));
  MainServices.getCoa(path)
    .then((response) => dispatch(loadSuccess(response.data)))
    .catch((error) => dispatch(loadError(error.message)));
};

const uploadCoaAsync = (path, req) => (dispatch) => {
  dispatch(loadStart(constantUploadCoa));
  MainServices.uploadCoa(path, req)
    .then((response) => dispatch(loadSuccess(response.data)))
    .catch((error) => dispatch(loadError(error.message)));
};

export { getCoaAsync, uploadCoaAsync };
