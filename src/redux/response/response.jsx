import actionTypes from "./response.actionType";

const loadStart = (name) => ({
  type: actionTypes.LOAD_START,
  payload: name,
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
