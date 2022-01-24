import * as types from "./types";

const initialState = {
  errorLoadIndex: null,
  errorLoadNote: null,
  errorProcessIndex: null,
  errorProcessNote: null,
  isLoadingIndex: false,
  isLoadingNote: false,
  isProcessingIndex: false,
  isProcessingNote: false,
  latestIndex: null,
  latestUploadKey: null,
  note: null,
};

const reducer = (state = initialState, action = null) => {
  let newState;
  switch (action?.type) {
    /* fetch latest index from data storage */
    case types.GET_INDEX_START:
      newState = { ...(!!state ? state : {}) };
      newState.isLoadingIndex = true;
      break;
    case types.GET_INDEX_SUCCESSFUL:
      newState = { ...(!!state ? state : {}) };
      newState.latestIndex = action.index;
      newState.errorLoadIndex = null;
      break;
    case types.GET_INDEX_ERROR:
      newState = { ...(!!state ? state : {}) };
      newState.latestIndex = null;
      newState.errorLoadIndex = action.error || "GENERAL ERROR";
      break;
    case types.GET_INDEX_COMPLETED:
      newState = { ...(!!state ? state : {}) };
      newState.isLoadingIndex = false;
      break;

    /* fetch latest index from data storage */
    case types.CLEAR_EDIT_NOTE:
      newState = { ...(!!state ? state : {}) };
      newState.note = null;
      break;
    case types.GET_EDIT_NOTE_START:
      newState = { ...(!!state ? state : {}) };
      newState.isLoadingNote = true;
      break;
    case types.GET_EDIT_NOTE_SUCCESSFUL:
      newState = { ...(!!state ? state : {}) };
      newState.note = action.note || null;
      newState.errorLoadNote = null;
      break;
    case types.GET_EDIT_NOTE_ERROR:
      newState = { ...(!!state ? state : {}) };
      newState.note = null;
      newState.errorLoadNote = action.error || "GENERAL ERROR";
      break;
    case types.GET_EDIT_NOTE_COMPLETED:
      newState = { ...(!!state ? state : {}) };
      newState.isLoadingNote = false;
      break;

    /* upload a new article data storage */
    case types.UPSERT_NOTE_START:
      newState = { ...(!!state ? state : {}) };
      newState.isProcessingNote = true;
      break;
    case types.UPSERT_NOTE_SUCCESSFUL:
      newState = { ...(!!state ? state : {}) };
      newState.latestUploadKey = action.key || null;
      newState.errorProcessNote = null;
      break;
    case types.UPSERT_NOTE_ERROR:
      newState = { ...(!!state ? state : {}) };
      newState.latestUploadKey = null;
      newState.errorProcessNote = action.error || "GENERAL ERROR";
      break;
    case types.UPSERT_NOTE_COMPLETED:
      newState = { ...(!!state ? state : {}) };
      newState.isProcessingNote = false;
      break;

    /* update index with new article key */
    case types.UPSERT_INDEX_START:
      newState = { ...(!!state ? state : {}) };
      newState.isProcessingIndex = true;
      break;
    case types.UPSERT_INDEX_SUCCESSFUL:
      newState = { ...(!!state ? state : {}) };
      newState.errorProcessIndex = null;
      break;
    case types.UPSERT_INDEX_ERROR:
      newState = { ...(!!state ? state : {}) };
      newState.errorProcessIndex = action.error || "GENERAL ERROR";
      break;
    case types.UPSERT_INDEX_COMPLETED:
      newState = { ...(!!state ? state : {}) };
      newState.isProcessingIndex = false;
      newState.latestIndex = null;
      newState.latestUploadKey = null;
      break;

    default:
      newState = state;
  }
  return newState;
};

export default reducer;
