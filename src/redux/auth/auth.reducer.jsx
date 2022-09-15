import actionTypes from "../response/response.actionType";

const initialState = {
  isLoading: false,
  response: null,
  errorMessage: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.LOAD_START: {
      console.log(`LOAD_START => ${type}`);
      return {
        ...state,
        isLoading: true,
        response: null,
        errorMessage: null,
      };
    }

    case actionTypes.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: payload,
      };

    case actionTypes.LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
