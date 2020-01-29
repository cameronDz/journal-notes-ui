
import * as types from './types';

const initialState = {};
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case types.SUCCESS_ARTICLE_UPLOAD:
      newState = { ...state };
      console.log('SUCCESS_ARTICLE_UPLOAD: ', action);
    default:
      newState = state;
  }
  return newState;
};

export default reducer;
