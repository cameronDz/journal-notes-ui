import * as types from "./types";

const initialState = {
  editNote: null,
  isLoadingEditNote: false,
  isLoadingIndex: false,
  isProcessingArticle: false,
  isProcessingIndex: false,
  latestIndex: null,
  latestUploadKey: null,
  loadingIndexError: null,
  processingArticleError: null,
  processingIndexError: null,
};

const reducer = (state = initialState, action = null) => {
  let newState;
  if (action) {
    switch (action?.type) {
      /* fetch latest index from data storage */
      case types.GET_INDEX_START:
        newState = { ...state, isLoadingIndex: true };
        break;
      case types.GET_INDEX_SUCCESSFUL:
        newState = {
          ...state,
          latestIndex: action.index,
          loadingIndexError: null,
        };
        break;
      case types.GET_INDEX_ERROR:
        newState = {
          ...state,
          latestIndex: null,
          loadingIndexError: action.error,
        };
        break;
      case types.GET_INDEX_COMPLETED:
        newState = { ...state, isLoadingIndex: false };
        break;

      /* fetch latest index from data storage */
      case types.GET_EDIT_NOTE_START:
        newState = { ...state, isLoadingEditNote: true };
        break;
      case types.GET_EDIT_NOTE_SUCCESSFUL:
        newState = {
          ...state,
          editNote: action.note || null,
          loadingEditNoteError: null,
        };
        break;
      case types.GET_EDIT_NOTE_ERROR:
        newState = {
          ...state,
          editNote: null,
          loadingEditNoteError: action.error || "ERROR",
        };
        break;
      case types.GET_EDIT_NOTE_COMPLETED:
        newState = { ...state, isLoadingEditNote: false };
        break;
      case types.CLEAR_EDIT_NOTE:
        newState = { ...state, editNote: null };
        break;

      /* upload a new article data storage */
      case types.UPSERT_NOTE_START:
        newState = { ...state, isProcessingArticle: true };
        break;
      case types.UPSERT_NOTE_SUCCESSFUL:
        newState = {
          ...state,
          latestUploadKey: action.key,
          processingArticleError: null,
        };
        break;
      case types.UPSERT_NOTE_ERROR:
        newState = {
          ...state,
          latestUploadKey: null,
          processingArticleError: action.error,
        };
        break;
      case types.UPSERT_NOTE_COMPLETED:
        newState = { ...state, isProcessingArticle: false };
        break;

      /* update index with new article key */
      case types.UPSERT_INDEX_START:
        newState = { ...state, isProcessingIndex: true };
        break;
      case types.UPSERT_INDEX_SUCCESSFUL:
        newState = { ...state, processingIndexError: null };
        break;
      case types.UPSERT_INDEX_ERROR:
        newState = { ...state, processingIndexError: action.error };
        break;
      case types.UPSERT_INDEX_COMPLETED:
        newState = {
          ...state,
          isProcessingIndex: false,
          latestIndex: null,
          latestUploadKey: null,
        };
        break;

      default:
        newState = state;
    }
  }
  return newState;
};

export default reducer;
