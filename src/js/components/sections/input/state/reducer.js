
import * as types from './types';

const initialState = { processingUpload: false };
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case types.SUCCESS_ARTICLE_UPLOAD:
      newState = { ...state, latestUploadKey: action.key };
      break;
    case types.START_UPLOAD_ARTICLE_POST_REQUEST:
      newState = { ...state, processingUpload: true };
      break;
    case types.END_UPLOAD_ARTICLE_POST_REQUEST:
      newState = { ...state, processingUpload: false };
      break;
    default:
      newState = state;
  }
  return newState;
};

export default reducer;
