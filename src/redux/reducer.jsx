import actionTypes from "./response/response.actionType";

const initialState = {
  isLoading: false,
  response: null,
  errorMessage: null,
  nameReducer: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.LOAD_START: {
      return {
        ...state,
        isLoading: true,
        response: null,
        errorMessage: null,
        nameReducer: payload,
      };
    }

    case actionTypes.LOAD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        response: payload,
      };
    }

    case actionTypes.LOAD_ERROR: {
      return {
        ...state,
        isLoading: false,
        response: null,
        errorMessage: payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
