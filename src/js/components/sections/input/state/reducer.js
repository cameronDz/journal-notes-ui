import * as types from './types';

const initialState = {
  isLoadingIndex: false,
  isProcessingArticle: false,
  isProcessingIndex: false,
  latestIndex: null,
  latestUploadKey: null,
  loadingIndexError: null,
  processingArticleError: null,
  processingIndexError: null
};

const reducer = (state = initialState, action) => {
  let newState;
  if (action) {
    switch (action.type) {
      /* fetch latest index from data storage */
      case types.GET_INDEX_START:
        newState = { ...state, isLoadingIndex: true };
        break;
      case types.GET_INDEX_SUCCESSFUL:
        newState = { ...state, latestIndex: action.index, loadingIndexError: null };
        break;
      case types.GET_INDEX_ERROR:
        newState = { ...state, latestIndex: null, loadingIndexError: action.error };
        break;
      case types.GET_INDEX_COMPLETED:
        newState = { ...state, isLoadingIndex: false };
        break;

      /* upload a new article data storage */
      case types.POST_ARTICLE_START:
        newState = { ...state, isProcessingArticle: true };
        break;
      case types.POST_ARTICLE_SUCCESSFUL:
        newState = { ...state, latestUploadKey: action.key, processingArticleError: null };
        break;
      case types.POST_ARTICLE_ERROR:
        newState = { ...state, latestUploadKey: null, processingArticleError: action.error };
        break;
      case types.POST_ARTICLE_COMPLETED:
        newState = { ...state, isProcessingArticle: false };
        break;

      /* update index with new article key */
      case types.PUT_INDEX_START:
        newState = { ...state, isProcessingIndex: true };
        break;
      case types.PUT_INDEX_SUCCESSFUL:
        newState = { ...state, processingIndexError: null };
        break;
      case types.PUT_INDEX_ERROR:
        newState = { ...state, processingIndexError: action.error };
        break;
      case types.PUT_INDEX_COMPLETED:
        newState = { ...state, isProcessingIndex: false, latestIndex: null, latestUploadKey: null };
        break;

      default:
        newState = state;
    }
  }
  return newState;
};

export default reducer;
