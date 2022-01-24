import axios from "axios";
import * as _types from "./types";
import {
  baseApiUrl as baseApiUrl,
  baseApiConfig as config,
} from "../../libs/apiConfig";

const shipEvent = (type, payload) => {
  return { type, ...(!!payload ? payload : {}) };
};

const fetchEntireListPayload = (dispatch, index) => {
  const url = `${baseApiUrl}/objects`;
  dispatch(shipEvent(_types.GET_NOTES_ALL_START));
  return axios
    .post(url, index, config)
    .then((payload) => {
      const list = payload?.data?.payload?.list || [];
      dispatch(shipEvent(_types.GET_NOTES_ALL_SUCCESS, { list }));
    })
    .catch((error) => {
      console.error("GET_NOTES_ALL_ERROR", error);
      dispatch(shipEvent(_types.GET_NOTES_ALL_ERROR, { error }));
    })
    .finally(() => {
      dispatch(shipEvent(_types.GET_NOTES_ALL_COMPLETED));
    });
};

export const fetchArticles = () => {
  return (dispatch) => {
    const url = `${baseApiUrl}/object/index`;
    dispatch(shipEvent(_types.GET_NOTE_INDEX_START));
    return axios
      .get(url, config)
      .then((payload) => {
        const index = payload?.data?.payload?.list || [];
        fetchEntireListPayload(dispatch, index);
        dispatch(shipEvent(_types.GET_NOTE_INDEX_SUCCESS, { index }));
      })
      .catch((error) => {
        console.error("GET_NOTE_INDEX_ERROR", error);
        dispatch(shipEvent(_types.GET_NOTE_INDEX_ERROR, { error }));
      })
      .finally(() => {
        dispatch(shipEvent(_types.GET_NOTE_INDEX_COMPLETED));
      });
  };
};
