import axios from "axios";
import * as _types from "./types";
import {
  baseApiUrl as baseApiUrl,
  baseApiConfig as config,
} from "../../libs/apiConfig";

const shipEvent = (type) => {
  return { type };
};

const fetchEntireListPayload = (dispatch, index) => {
  const url = `${baseApiUrl}/objects`;
  dispatch(shipEvent(_types.GET_NOTES_ALL_START));
  return axios
    .post(url, index, config)
    .then((response) => {
      const notes = response?.data?.payload?.list || [];
      return dispatch({ notes, type: _types.GET_NOTES_ALL_SUCCESS });
    })
    .catch((error) => {
      console.error("GET_NOTES_ALL_ERROR", error);
      return dispatch({ error, type: _types.GET_NOTES_ALL_ERROR });
    })
    .finally(() => {
      return dispatch({ type: _types.GET_NOTES_ALL_COMPLETED });
    });
};

const fetchArticles = () => {
  return (dispatch) => {
    const url = `${baseApiUrl}/object/index`;
    dispatch(shipEvent(_types.GET_NOTE_INDEX_START));
    return axios
      .get(url, config)
      .then((response) => {
        const index = response?.data?.payload?.list || [];
        fetchEntireListPayload(dispatch, index);
        return dispatch({ index, type: _types.GET_NOTE_INDEX_SUCCESS });
      })
      .catch((error) => {
        console.error("GET_NOTE_INDEX_ERROR", error);
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

export { fetchArticles, refreshIndex, refreshNotes };
