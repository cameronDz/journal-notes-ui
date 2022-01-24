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

export const clearNote = () => {
  return (dispatch) => {
    dispatch(startRequestType(_types.CLEAR_EDIT_NOTE));
  };
};

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
        console.error("GET_INDEX_ERROR", error);
        return dispatch({ error, type: _types.GET_INDEX_ERROR });
      })
      .finally(() => {
        return dispatch({ type: _types.GET_INDEX_COMPLETED });
      });
  };
};

export const getNote = (id) => {
  return (dispatch) => {
    const url = `${baseApiUrl}/object/${id}`;
    dispatch(startRequestType(_types.GET_EDIT_NOTE_START));
    return axios
      .get(url, config)
      .then((data) => {
        const note = data?.data?.payload || null;
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

export const upsertNote = (content, isNew = true) => {
  return (dispatch) => {
    const name = content?.id || getFullTimeStampString();
    const requestType = isNew ? "post" : "put";
    const urlMethod = isNew ? "upload" : "update";
    const url = `${baseApiUrl}/${urlMethod}/${name}`;
    dispatch(startRequestType(_types.UPSERT_NOTE_START));
    return axios[requestType](url, content, config)
      .then((payload) => {
        const key = payload?.data?.newObjectKeyName || "";
        return dispatch({ key, type: _types.UPSERT_NOTE_SUCCESSFUL });
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

export const upsertIndex = (updatedIndex) => {
  const index = { list: updatedIndex };
  return (dispatch) => {
    const url = `${baseApiUrl}/update/index`;
    dispatch(startRequestType(_types.UPSERT_INDEX_START));
    return axios
      .put(url, index, config)
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
