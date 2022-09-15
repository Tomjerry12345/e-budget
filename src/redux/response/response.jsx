import actionTypes from "./response.actionType";

const loadStart = () => ({
  type: actionTypes.LOAD_START,
});

const loadSuccess = (data) => ({
  type: actionTypes.LOAD_SUCCESS,
  payload: data,
});

const loadError = (errorMessage) => ({
  type: actionTypes.LOAD_ERROR,
  payload: errorMessage,
});

export { loadStart, loadSuccess, loadError };
