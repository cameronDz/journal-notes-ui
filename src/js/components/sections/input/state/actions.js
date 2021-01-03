import axios from 'axios';
import get from 'lodash.get';
import { getFullTimeStampString } from '../../../../libs/date';
import * as _types from './types';

const baseHerokuUrl = 'https://log-notes-assets-api.herokuapp.com/json/';
const config = { header: { 'Content-Type': 'application/json' } };

const startUploadPostRequest = () => {
  return { type: _types.START_UPLOAD_ARTICLE_POST_REQUEST };
};

export const uploadArticle = (content) => {
  return dispatch => {
    const url = baseHerokuUrl + 'upload/' + getFullTimeStampString();
    dispatch(startUploadPostRequest());
    return axios.post(url, content, config)
      .then(payload => {
        const key = get(payload, 'data.newObjectKeyName', '');
        return dispatch({ key, type: _types.SUCCESS_ARTICLE_UPLOAD });
      })
      .catch(error => {
        console.log('article upload error:', error);
      })
      .finally(() => {
        return dispatch({ type: _types.END_UPLOAD_ARTICLE_POST_REQUEST });
      });
  };
};

export const updateIndex = (updatedIndex) => {
  return dispatch => {
    const url = baseHerokuUrl + 'update/index';
    return axios.put(url, updatedIndex, config)
      .then(payload => {})
      .catch(error => {
        console.log('index update error:', error);
      })
      .finally(() => {
        return dispatch({ type: _types.UPDATE_INDEX_COMPLETED });
      });
  };
};
