import * as _types from "./types";

const initialState = {
  isFetching: false,
  isLive: false,
  error: null,
  token: null,
};

const reducer = (state = initialState, action = null) => {
  let newState;
  switch (action?.type) {
    case _types.CLEAR_ERROR:
      newState = { ...state, error: null };
      break;
    case _types.CLEAR_TOKEN:
      newState = { ...state, token: null };
      break;
    case _types.GET_TOKEN_COMPLETED:
      newState = { ...state, isFetching: false };
      break;
    case _types.GET_TOKEN_ERROR:
      newState = {
        ...state,
        error: action.error,
        isFetching: false,
        token: null,
      };
      break;
    case _types.GET_TOKEN_SUCCESS:
      newState = {
        ...state,
        error: null,
        isFetching: false,
        token: action.data,
      };
      break;
    case _types.GET_TOKEN_START:
      newState = { ...state, error: null, isFetching: true, token: null };
      break;
    case _types.LIVENESS_PROBE:
      newState = { ...state, isLive: true };
      break;
    default:
      newState = { ...state };
  }
  return newState;
};

export default reducer;
