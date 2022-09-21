import actionTypes from "./response.actionType";

const loadStart = (nameReducer, start) => ({
  type: actionTypes.LOAD_START,
  payload: { nameReducer, start },
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
