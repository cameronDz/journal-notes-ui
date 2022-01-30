import axios from "axios";
import * as _types from "./types";
import { getFullTimeStampString } from "../../libs/date";
import {
  baseApiUrl as baseApiUrl,
  baseApiConfig as config,
} from "../../libs/apiConfig";

const startRequestType = (type) => {
  return { type };
};

const clearNote = () => {
  return (dispatch) => {
    dispatch(startRequestType(_types.CLEAR_EDIT_NOTE));
  };
};

const getNote = (id) => {
  return (dispatch) => {
    const url = `${baseApiUrl}/object/${id}`;
    dispatch(startRequestType(_types.GET_EDIT_NOTE_START));
    return axios
      .get(url, config)
      .then((response) => {
        const note = response?.data?.payload || null;
        return dispatch({ note, type: _types.GET_EDIT_NOTE_SUCCESSFUL });
      })
      .catch((error) => {
        console.error("GET_EDIT_NOTE_ERROR", error);
        return dispatch({ error, type: _types.GET_EDIT_NOTE_ERROR });
      })
      .finally(() => {
        return dispatch({ type: _types.GET_EDIT_NOTE_COMPLETED });
      });
  };
};

const upsertIndex = (item) => {
  return (dispatch, getState) => {
    const currIndex = getState().notes?.index || [];
    const payload = { list: [...currIndex, item] };
    const url = `${baseApiUrl}/update/index`;
    dispatch(startRequestType(_types.UPSERT_INDEX_START));
    return axios
      .put(url, payload, config)
      .then(() => {
        return dispatch({ type: _types.UPSERT_INDEX_SUCCESSFUL });
      })
      .catch((error) => {
        console.error("UPSERT_INDEX_SUCCESSFUL", error);
        return dispatch({ error, type: _types.UPSERT_INDEX_SUCCESSFUL });
      })
      .finally(() => {
        return dispatch({ type: _types.UPSERT_INDEX_COMPLETED });
      });
  };
};

const upsertNote = (content, isNew = true) => {
  return (dispatch) => {
    const name = content?.id || getFullTimeStampString();
    const requestType = isNew ? "post" : "put";
    const urlMethod = isNew ? "upload" : "update";
    const url = `${baseApiUrl}/${urlMethod}/${name}`;
    dispatch(startRequestType(_types.UPSERT_NOTE_START));
    return axios[requestType](url, content, config)
      .then(() => {
        return dispatch({ type: _types.UPSERT_NOTE_SUCCESSFUL });
      })
      .catch((error) => {
        console.error("UPSERT_NOTE_ERROR", error);
        return dispatch({ error, type: _types.UPSERT_NOTE_ERROR });
      })
      .finally(() => {
        return dispatch({ type: _types.UPSERT_NOTE_COMPLETED });
      });
  };
};

export { clearNote, getNote, upsertIndex, upsertNote };
