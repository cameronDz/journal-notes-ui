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
    dispatch(startRequestType(_types.GET_EDIT_NOTE_START));
    return (async () => {
      try {
        const url = `${baseApiUrl}/object/${id}`;
        const configuration = { ...baseConfig, ...defaultEmptyObject(config) };
        const response = await window.fetch(url, {
          ...configuration,
          headers: { "Content-Type": "application/json" },
          method: "GET",
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        const note = data?.payload || null;
        dispatch({ note, type: _types.GET_EDIT_NOTE_SUCCESSFUL });
      } catch (error) {
        dispatch({ error, type: _types.GET_EDIT_NOTE_ERROR });
      } finally {
        dispatch({ type: _types.GET_EDIT_NOTE_COMPLETED });
      }
    })();
  };
};

const upsertIndex = (item, config = {}) => {
  return (dispatch, getState) => {
    return (async () => {
      dispatch(startRequestType(_types.UPSERT_INDEX_START));
      try {
        if (disableSave) {
          throw new Error("Saving is disabled");
        }
        const currIndex = defaultUniqueArray(getState().notes?.index);
        const newIndex = defaultUniqueArray([...currIndex, item]);
        const body = { list: newIndex };
        const url = `${baseApiUrl}/update/index`;
        const configuration = { ...baseConfig, ...defaultEmptyObject(config) };
        const auth = `Bearer ${getState().auth.token}`;
        const response = await window.fetch(url, {
          ...configuration,
          body: JSON.stringify(body),
          headers: { Authorization: auth, "Content-Type": "application/json" },
          method: "PUT",
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        const index = data?.payload || null;
        refreshIndex(dispatch, newIndex);
        dispatch({ index, type: _types.UPSERT_INDEX_SUCCESSFUL });
      } catch (error) {
        dispatch({ error, type: _types.UPSERT_INDEX_ERROR });
      } finally {
        dispatch({ type: _types.UPSERT_INDEX_COMPLETED });
      }
    })();
  };
};

const upsertNote = (content, isNew = true, config = {}) => {
  return (dispatch, getState) => {
    return (async () => {
      try {
        const name = content?.id || getFullTimeStampString();
        const url = `${baseApiUrl}/${isNew ? "upload" : "update"}/${name}`;
        const auth = `Bearer ${getState().auth.token}`;
        const configuration = { ...baseConfig, ...defaultEmptyObject(config) };
        const response = await window.fetch(url, {
          ...configuration,
          body: JSON.stringify(content),
          headers: { Authorization: auth, "Content-Type": "application/json" },
          method: isNew ? "POST" : "PUT",
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        const note = data?.payload || null;
        const currNotes = defaultUniqueArray(getState().notes?.notes);
        const newNotes = [...currNotes, content];
        refreshNotes(dispatch, newNotes);
        dispatch({ note, type: _types.UPSERT_NOTE_SUCCESSFUL });
      } catch (error) {
        dispatch({ error, type: _types.UPSERT_NOTE_ERROR });
      } finally {
        dispatch({ type: _types.UPSERT_NOTE_COMPLETED });
      }
    })();
  };
};

export { clearNote, getNote, upsertIndex, upsertNote };
