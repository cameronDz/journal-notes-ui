import * as types from './types';

const initialState = { list: [] };
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case types.RECIEVE_SINGLE_ARTICLE:
      newState = { ...state, list: [...state.list, action.article] };
      break;
    case types.SUCCESS_ARTICLE_UPLOAD:
      newState = { ...state };
      console.log('SUCCESS_ARTICLE_UPLOAD: ', action);
    default:
      newState = state;
  }
  return newState;
};

export default reducer;
