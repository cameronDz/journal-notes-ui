import axios from "axios";
import { getFullTimeStampString } from "../../../../libs/date";
import * as _types from "./types";

const baseHerokuUrl = "https://article-notes-storage-api.herokuapp.com/json/";
const config = { header: { "Content-Type": "application/json" } };

export const getIndex = () => {
  return (dispatch) => {
    const url = baseHerokuUrl + "object/index";
    dispatch(startRequestType(_types.GET_INDEX_START));
    return axios
      .get(url, config)
      .then((data) => {
        const extractedData = data?.data?.payload?.list || [];
        const index = Array.isArray(extractedData) ? extractedData : [];
        return dispatch({ index, type: _types.GET_INDEX_SUCCESSFUL });
      })
      .catch((error) => {
        return dispatch({ error, type: _types.GET_INDEX_ERROR });
      })
      .finally(() => {
        return dispatch({ type: _types.GET_INDEX_COMPLETED });
      });
  };
};

export const postArticle = (content) => {
  return (dispatch) => {
    const name = content?.id || getFullTimeStampString();
    const url = baseHerokuUrl + "upload/" + name;
    dispatch(startRequestType(_types.POST_ARTICLE_START));
    return axios
      .post(url, content, config)
      .then((payload) => {
        const key = payload?.data?.newObjectKeyName || "";
        return dispatch({ key, type: _types.POST_ARTICLE_SUCCESSFUL });
      })
      .catch((error) => {
        return dispatch({ error, type: _types.POST_ARTICLE_ERROR });
      })
      .finally(() => {
        return dispatch({ type: _types.POST_ARTICLE_COMPLETED });
      });
  };
};

export const putIndex = (updatedIndex) => {
  const index = { list: updatedIndex };
  return (dispatch) => {
    const url = baseHerokuUrl + "update/index";
    dispatch(startRequestType(_types.PUT_INDEX_START));
    return axios
      .put(url, index, config)
      .then(() => {
        return dispatch({ type: _types.PUT_INDEX_SUCCESSFUL });
      })
      .catch((error) => {
        return dispatch({ error, type: _types.PUT_INDEX_SUCCESSFUL });
      })
      .finally(() => {
        return dispatch({ type: _types.PUT_INDEX_COMPLETED });
      });
  };
};

const startRequestType = (type) => {
  return { type };
};
