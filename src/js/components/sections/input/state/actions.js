import axios from "axios";
import * as _types from "./types";
import { getFullTimeStampString } from "../../../../libs/date";
import _apiConfig from "../../../../../assets/apiConfig.json";

const baseApiUrl = _apiConfig.baseApiUrl;
const config = _apiConfig.baseApiConfig;

export const getIndex = () => {
  return (dispatch) => {
    const url = `${baseApiUrl}/object/index`;
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
    const url = `${baseApiUrl}/upload/${name}`;
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
    const url = `${baseApiUrl}/update/index`;
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
