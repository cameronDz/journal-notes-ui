import { defaultUniqueArray } from "../../libs/defaults";
import * as types from "./types";

const initialState = {
  errorIndex: null,
  errorNotes: null,
  index: [],
  isLoadingIndex: false,
  isLoadingNotes: false,
  notes: [],
};

const reducer = (state = initialState, action = null) => {
  let newState;
  switch (action?.type) {
    case types.GET_NOTES_ALL_START:
      newState = { ...(state ? state : {}) };
      newState.errorNotes = null;
      newState.isLoadingNotes = true;
      break;
    case types.GET_NOTES_ALL_SUCCESS:
      newState = { ...(state ? state : {}) };
      newState.errorNotes = null;
      newState.isLoadedAll = action.isLoadedAll;
      newState.notes = defaultUniqueArray(action.notes);
      break;
    case types.GET_NOTES_ALL_ERROR:
      newState = { ...(state ? state : {}) };
      newState.errorNotes = action.error || "GENERAL ERROR";
      break;
    case types.GET_NOTES_ALL_COMPLETED:
      newState = { ...(state ? state : {}) };
      newState.isLoadingNotes = false;
      break;

    case types.GET_NOTE_INDEX_START:
      newState = { ...(state ? state : {}) };
      newState.isLoadingIndex = true;
      break;
    case types.GET_NOTE_INDEX_SUCCESS:
      newState = { ...(state ? state : {}) };
      newState.index = defaultUniqueArray(action.index);
      break;
    case types.GET_NOTE_INDEX_ERROR:
      newState = { ...(state ? state : {}) };
      newState.errorIndex = action.error || "GENERAL ERROR";
      break;
    case types.GET_NOTE_INDEX_COMPLETED:
      newState = { ...(state ? state : {}) };
      newState.isLoadingIndex = false;
      break;

    case types.ADD_NOTE_INDEX_ID:
      newState = { ...(state ? state : {}) };
      newState.index = defaultUniqueArray(action.index);
      break;
    case types.ADD_NOTES_ALL_NOTE:
      newState = { ...(state ? state : {}) };
      newState.notes = defaultUniqueArray(action.notes);
      break;

    default:
      newState = state;
  }
  return newState;
};

export default reducer;
