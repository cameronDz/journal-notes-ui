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
    case _types.GET_TOKEN_START:
      newState = { ...(state ? state : {}) };
      newState.isFetching = true;
      newState.token = null;
      break;
    case _types.GET_TOKEN_SUCCESS:
      newState = { ...(state ? state : {}) };
      newState.error = null;
      newState.token = action.data;
      break;
    case _types.GET_TOKEN_ERROR:
      newState = { ...(state ? state : {}) };
      newState.error = action.error || "GENERAL ERROR";
      newState.token = null;
      break;
    case _types.GET_TOKEN_COMPLETED:
      newState = { ...(state ? state : {}) };
      newState.isFetching = false;
      break;

    case _types.CLEAR_ERROR:
      newState = { ...(state ? state : {}) };
      newState.error = null;
      break;
    case _types.CLEAR_TOKEN:
      newState = { ...(state ? state : {}) };
      newState.token = null;
      break;
    case _types.LIVENESS_PROBE:
      newState = { ...(state ? state : {}) };
      newState.isLive = true;
      break;

    default:
      newState = { ...state };
  }
  return newState;
};

export default reducer;
