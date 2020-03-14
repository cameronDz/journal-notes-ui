import * as _types from './types';
import axios from 'axios';

const baseHerokuUrl = 'https://log-notes-assets-api.herokuapp.com/';
const config = { header: { 'Content-Type': 'application/json' } };

const processSuccessfulUpload = payload => {
  return { payload, type: _types.SUCCESS_ARTICLE_UPLOAD };
};

export const uploadArticle = (content) => {
  return dispatch => {
    const url = baseHerokuUrl + 'upload?index=true';
    return axios.post(url, JSON.parse(content), config)
      .then(payload => { dispatch(processSuccessfulUpload(payload)); })
      .catch(error => { console.log('error::', error); });
  };
};
