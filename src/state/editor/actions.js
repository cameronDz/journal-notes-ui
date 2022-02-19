import axios from "axios";
import * as _types from "./types";
import { refreshIndex, refreshNotes } from "../notes/actions";
import { getFullTimeStampString } from "../../libs/date";
import { defaultEmptyObject, defaultUniqueArray } from "../../libs/defaults";
import {
  baseApiUrl as baseApiUrl,
  baseApiConfig as baseConfig,
  disableSave,
} from "../../libs/apiConfig";

const startRequestType = (type) => {
  return { type };
};

const clearNote = () => {
  return (dispatch) => {
    dispatch(startRequestType(_types.CLEAR_EDIT_NOTE));
  };
};

const getNote = (id, config = {}) => {
  return (dispatch) => {
    const url = `${baseApiUrl}/object/${id}`;
    dispatch(startRequestType(_types.GET_EDIT_NOTE_START));
    return axios
      .get(url, setConfig(config))
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

const upsertIndex = (item, config = {}) => {
  return (dispatch, getState) => {
    const currIndex = defaultUniqueArray(getState().notes?.index);
    const newIndex = defaultUniqueArray([...currIndex, item]);
    const payload = { list: newIndex };
    const url = `${baseApiUrl}/update/index`;
    if (!disableSave) {
      dispatch(startRequestType(_types.UPSERT_INDEX_START));
      return axios
        .put(url, payload, setConfig(config))
        .then(() => {
          refreshIndex(dispatch, newIndex);
          return dispatch({ type: _types.UPSERT_INDEX_SUCCESSFUL });
        })
        .catch((error) => {
          console.error("UPSERT_INDEX_SUCCESSFUL", error);
          return dispatch({ error, type: _types.UPSERT_INDEX_SUCCESSFUL });
        })
        .finally(() => {
          return dispatch({ type: _types.UPSERT_INDEX_COMPLETED });
        });
    } else {
      console.warn("SAVING disabled - url: ", url);
      console.warn("SAVING disabled - payload: ", payload);
    }
  };
};

const upsertNote = (content, isNew = true, config = {}) => {
  return (dispatch, getState) => {
    const name = content?.id || getFullTimeStampString();
    const requestType = isNew ? "post" : "put";
    const urlMethod = isNew ? "upload" : "update";
    const url = `${baseApiUrl}/${urlMethod}/${name}`;
    if (!disableSave) {
      dispatch(startRequestType(_types.UPSERT_NOTE_START));
      return axios[requestType](url, content, setConfig(config))
        .then(() => {
          const currNotes = defaultUniqueArray(getState().notes?.notes);
          const newNotes = [...currNotes, content];
          refreshNotes(dispatch, newNotes);
          return dispatch({ type: _types.UPSERT_NOTE_SUCCESSFUL });
        })
        .catch((error) => {
          console.error("UPSERT_NOTE_ERROR", error);
          return dispatch({ error, type: _types.UPSERT_NOTE_ERROR });
        })
        .finally(() => {
          return dispatch({ type: _types.UPSERT_NOTE_COMPLETED });
        });
    } else {
      console.warn("SAVING disabled - url: ", url);
      console.warn("SAVING disabled - content: ", content);
    }
  };
};

const setConfig = (config = {}) => {
  return { ...baseConfig, ...defaultEmptyObject(config) };
};

export { clearNote, getNote, upsertIndex, upsertNote };
