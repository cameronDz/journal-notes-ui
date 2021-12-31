import axios from "axios";
import * as _types from "./types";
import {
  baseApiUrl as baseApiUrl,
  baseApiConfig as config,
} from "../../../libs/apiConfig";

const fetchArticle = (articleId) => {
  return (dispatch) => {
    const endpoint = `${baseApiUrl}/object/${articleId}.json`;
    return axios
      .get(endpoint, config)
      .then((payload) => {
        return dispatch({
          article: payload.data,
          type: _types.SUCCESSFUL_SINGLE_ARTICLE_GET_REQUEST,
        });
      })
      .catch((error) => {
        console.error("article fetch error:", error);
        return dispatch({
          error: error,
          type: _types.FAILED_SINGLE_ARTICLE_GET_REQUEST,
        });
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

const fetchEntireListPayload = (dispatch, list) => {
  const url = `${baseApiUrl}/objects`;
  dispatch(startListGetRequest());
  return axios
    .post(url, list, config)
    .then((payload) => {
      const articlesList = payload?.data?.payload?.list || [];
      return dispatch({
        list: articlesList,
        type: _types.SUCCESSFUL_ARTICLES_GET_REQUEST,
      });
    })
    .catch((error) => {
      console.error("catch error", error);
      return dispatch({
        error: error,
        type: _types.FAILED_ARTICLE_LIST_GET_REQUEST,
      });
    })
    .finally(() => {
      dispatch({ type: _types.END_ARTICLE_LIST_GET_REQUEST });
    });
};

export const fetchArticles = () => {
  return (dispatch) => {
    const url = `${baseApiUrl}/object/index`;
    dispatch(startListGetRequest());
    return axios
      .get(url, config)
      .then((payload) => {
        const list = payload?.data?.payload?.list || [];
        fetchEntireListPayload(dispatch, list);
        return dispatch({
          index: list,
          type: _types.SUCCESSFUL_ARTICLE_LIST_GET_REQUEST,
        });
      })
      .catch((error) => {
        console.error("index fetch error:", error);
        return dispatch({
          error: error,
          type: _types.FAILED_ARTICLE_LIST_GET_REQUEST,
        });
      })
      .finally(() => {
        // return dispatch({ type: _types.END_ARTICLE_LIST_GET_REQUEST });
      });
  };
};
