import * as _types from './types';
import axios from 'axios';

const baseS3Url = 'https://log-notes-assets.s3.amazonaws.com/';
const config = { header: { 'Content-Type': 'application/json' } };

const recieveSingleArticle = article => {
  return { article, type: _types.RECIEVE_SINGLE_ARTICLE };
};

const fetchArticle = articleId => {
  return dispatch => {
    const endpoint = baseS3Url + articleId + '.json';
    return axios.get(endpoint, config)
      .then(payload => dispatch(recieveSingleArticle(payload.data)))
      .catch(error => console.error('could not process data', error));
  };
};

const fetchSingleArticle = (articleId = 0) => {
  return dispatch => dispatch(fetchArticle(articleId));
};

const processArticleListPayload = payload => {
  return dispatch => {
    const { list } = payload.data;
    for (let inc = 0; inc < list.length; inc++) {
      dispatch(fetchSingleArticle(list[inc]));
    }
  };
};

export const fetchArticles = () => {
  return dispatch => {
    const url = baseS3Url + 'index.json';
    return axios.get(url, config)
      .then(payload => { dispatch(processArticleListPayload(payload)) })
      .catch(error => { console.error(error); });
  };
};
