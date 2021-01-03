import * as _types from './types';
import axios from 'axios';
import get from 'lodash.get';

// get index from heroku, get jsons from s3 directly
const baseS3Url = 'https://log-notes-assets.s3.amazonaws.com/';
const baseHerokuUrl = 'https://log-notes-assets-api.herokuapp.com/json/';
const config = { header: { 'Content-Type': 'application/json' } };

const fetchArticle = articleId => {
  return dispatch => {
    const endpoint = baseS3Url + articleId + '.json';
    return axios.get(endpoint, config)
      .then(payload => {
        return dispatch({ article: payload.data, type: _types.SUCCESSFUL_SINGLE_ARTICLE_GET_REQUEST });
      })
      .catch(error => {
        console.log('article fetch error:', error);
        return dispatch({ error: error, type: _types.FAILED_SINGLE_ARTICLE_GET_REQUEST });
      })
      .finally(() => {
        return dispatch({ type: _types.END_SINGLE_ARTICLE_GET_REQUEST });
      });
  };
};

const fetchSingleArticle = (dispatch, articleId = 0) => {
  return dispatch(fetchArticle(articleId));
};

const processArticleListPayload = (dispatch, list) => {
  const length = Array.isArray(list) ? list.length : -1;
  for (let inc = 0; inc < length; inc++) {
    fetchSingleArticle(dispatch, list[inc]);
  }
};

const startListGetRequest = () => {
  return { type: _types.START_ARTICLE_LIST_GET_REQUEST };
};

export const fetchArticles = () => {
  return dispatch => {
    const url = baseHerokuUrl + 'object/index';
    dispatch(startListGetRequest());
    return axios.get(url, config)
      .then(payload => {
        const list = get(payload, 'data.payload', []);
        processArticleListPayload(dispatch, list);
        return dispatch({ index: list, type: _types.SUCCESSFUL_ARTICLE_LIST_GET_REQUEST });
      })
      .catch(error => {
        console.log('index fetch error:', error);
        return dispatch({ error: error, type: _types.FAILED_ARTICLE_LIST_GET_REQUEST });
      })
      .finally(() => {
        return dispatch({ type: _types.END_ARTICLE_LIST_GET_REQUEST });
      });
  };
};
