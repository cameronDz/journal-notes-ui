import axios from "axios";
import * as _types from "./types";
import {
  baseApiUrl as baseUrl,
  baseApiConfig as baseConfig,
  partialLoad,
  partialLoadCount,
} from "../../libs/apiConfig";
import { defaultEmptyObject, defaultUniqueArray } from "../../libs/defaults";

const shipEvent = (type) => {
  return { type };
};

const fetchEntireListPayload = (dispatch, index, apiConfig = {}) => {
  const url = `${baseUrl}/objects`;
  dispatch(shipEvent(_types.GET_NOTES_ALL_START));
  return axios
    .post(url, index, setConfig(apiConfig))
    .then((response) => {
      const notes = defaultUniqueArray(response?.data?.payload?.list);
      return dispatch({ notes, type: _types.GET_NOTES_ALL_SUCCESS });
    })
    .catch((error) => {
      return dispatch({ error, type: _types.GET_NOTES_ALL_ERROR });
    })
    .finally(() => {
      return dispatch({ type: _types.GET_NOTES_ALL_COMPLETED });
    });
};

const fetchArticles = (apiConfig = {}) => {
  return (dispatch) => {
    const url = `${baseUrl}/object/index`;
    dispatch(shipEvent(_types.GET_NOTE_INDEX_START));
    return axios
      .get(url, setConfig(apiConfig))
      .then((response) => {
        const index = defaultUniqueArray(response?.data?.payload?.list);
        let payload = [...(index || [])];
        if (partialLoad && payload.length > partialLoadCount) {
          payload = [...payload.slice(-partialLoadCount)];
        }
        fetchEntireListPayload(dispatch, payload, apiConfig);
        return dispatch({ index, type: _types.GET_NOTE_INDEX_SUCCESS });
      })
      .catch((error) => {
        return dispatch({ error, type: _types.GET_NOTE_INDEX_ERROR });
      })
      .finally(() => {
        return dispatch({ type: _types.GET_NOTE_INDEX_COMPLETED });
      });
  };
};

const refreshIndex = (dispatch, index) => {
  return dispatch({ index, type: _types.ADD_NOTE_INDEX_ID });
};

const refreshNotes = (dispatch, notes) => {
  return dispatch({ notes, type: _types.ADD_NOTES_ALL_NOTE });
};

const setConfig = (config = {}) => {
  return { ...baseConfig, ...defaultEmptyObject(config) };
};

export { fetchArticles, refreshIndex, refreshNotes };
