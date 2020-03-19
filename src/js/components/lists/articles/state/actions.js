import * as _types from './types';
import axios from 'axios';
import get from 'lodash.get';

// get index from heroku, get jsons from s3 directly
const baseS3Url = 'https://log-notes-assets.s3.amazonaws.com/';
const baseHerokuUrl = 'https://log-notes-assets-api.herokuapp.com/';
const config = { header: { 'Content-Type': 'application/json' } };

const recieveSingleArticle = article => {
  return { article, type: _types.RECIEVE_SINGLE_ARTICLE };
};

const fetchArticle = articleId => {
  return dispatch => {
    const endpoint = baseS3Url + articleId + '.json';
    return axios.get(endpoint, config)
      .then(payload => dispatch(recieveSingleArticle(payload.data)))
      .catch(error => console.log('could not process data', error));
  };
};

const fetchSingleArticle = (articleId = 0) => {
  return dispatch => dispatch(fetchArticle(articleId));
};

const processArticleListPayload = payload => {
  return dispatch => {
    const list = get(payload, 'data.payload.list', []);
    const length = Array.isArray(list) ? list.length : -1;
    for (let inc = 0; inc < length; inc++) {
      dispatch(fetchSingleArticle(list[inc]));
    }
  };
};

export const fetchArticles = () => {
  return dispatch => {
    const url = baseHerokuUrl + 'index';
    return axios.get(url, config)
      .then(payload => { dispatch(processArticleListPayload(payload)); })
      .catch(error => { console.log('error::', error); });
  };
};
