import * as types from "./types";

const initialState = {
  errorIndex: null,
  errorNotes: null,
  index: [],
  isLoadingIndex: false,
  isLoadingNotes: false,
  list: [],
};

const reducer = (state = initialState, action = null) => {
  let newState;
  switch (action?.type) {
    case types.GET_NOTES_ALL_START:
      newState = { ...(!!state ? state : {}) };
      newState.errorNotes = null;
      newState.isLoadingNotes = true;
      break;
    case types.GET_NOTES_ALL_SUCCESS:
      newState = { ...(!!state ? state : {}) };
      newState.errorNotes = null;
      newState.list = [...(Array.isArray(action.list) ? action.list : [])];
      break;
    case types.GET_NOTES_ALL_ERROR:
      newState = { ...(!!state ? state : {}) };
      newState.errorNotes = action.error || "GENERAL ERROR";
      break;
    case types.GET_NOTES_ALL_COMPLETED:
      newState = { ...(!!state ? state : {}) };
      newState.isLoadingNotes = false;
      break;

    case types.GET_NOTE_INDEX_START:
      newState = { ...(!!state ? state : {}) };
      newState.isLoadingIndex = true;
      break;
    case types.GET_NOTE_INDEX_SUCCESS:
      newState = { ...(!!state ? state : {}) };
      newState.notes = [Array.isArray(action.index) ? action.index : []];
      break;
    case types.GET_NOTE_INDEX_ERROR:
      newState = { ...(!!state ? state : {}) };
      newState.errorIndex = action.error || "GENERAL ERROR";
      break;
    case types.GET_NOTE_INDEX_COMPLETED:
      newState = { ...(!!state ? state : {}) };
      newState.isLoadingIndex = false;
      break;

    default:
      newState = state;
  }
  return newState;
};

export default reducer;
