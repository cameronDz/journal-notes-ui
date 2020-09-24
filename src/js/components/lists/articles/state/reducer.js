import * as types from './types';

const initialState = { articlesLoading: 0, isLoadingIndex: false, list: [], articleErrors: [] };
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    // single article requests
    case types.FAILED_SINGLE_ARTICLE_GET_REQUEST:
      newState = { ...state, articleErrors: [...state.articleErrors, action.error] };
      break;
    case types.SUCCESSFUL_SINGLE_ARTICLE_GET_REQUEST:
      newState = { ...state, list: [...state.list, action.article] };
      break;
    case types.END_SINGLE_ARTICLE_GET_REQUEST:
      newState = { ...state, articlesLoading: state.articlesLoading - 1 };
      break;

    // article index requests
    case types.START_ARTICLE_LIST_GET_REQUEST:
      newState = { ...state, index: null, indexError: null, isLoadingIndex: true };
      break;
    case types.FAILED_ARTICLE_LIST_GET_REQUEST:
      newState = { ...state, index: null, indexError: action.error, articlesLoading: 0 };
      break;
    case types.SUCCESSFUL_ARTICLE_LIST_GET_REQUEST:
      newState = { ...state, index: action.index, indexError: null, articlesLoading: action.index.length };
      break;
    case types.END_ARTICLE_LIST_GET_REQUEST:
      newState = { ...state, isLoadingIndex: false };
      break;

    default:
      newState = state;
  }
  return newState;
};

export default reducer;
