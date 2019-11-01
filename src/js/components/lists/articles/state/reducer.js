import * as types from './types';

const initialState = { list: [] };
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case types.RECIEVE_SINGLE_ARTICLE:
      newState = { ...state, list: [ ...state.list, action.article ] };
      break;
    default:
      newState = state;
  }
  return newState;
};

export default reducer;
