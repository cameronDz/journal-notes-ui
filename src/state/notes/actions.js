import * as _types from "./types";
import { baseApiUrl as baseUrl, partialLoadCount } from "../../libs/apiConfig";
import { defaultUniqueArray } from "../../libs/defaults";

const shipEvent = (type) => {
  return { type };
};

const CHUNK_SIZE = 100;
const splitListIntoHundreds = (list = []) => {
  const chunkList = [];
  for (let i = 0; i < list.length; i += CHUNK_SIZE) {
    chunkList.push(list.slice(i, i + CHUNK_SIZE));
  }
  return chunkList;
};

const fetchEntireListPayload = async (dispatch, index, apiConfig = {}) => {
  const url = `${baseUrl}/objects`;
  const idLists = splitListIntoHundreds(index);
  dispatch(shipEvent(_types.GET_NOTES_ALL_START));
  const notes = [];
  try {
    for (const ids of idLists) {
      try {
        const response = await window.fetch(url, {
          body: JSON.stringify(ids),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        notes.push(...(data?.payload?.list || []));
      } catch (error) {
        console.error("Error fetching notes:", { ids, error });
      } finally {
        // do nothing
      }
    }
    dispatch({
      isLoadedAll: !apiConfig.limit,
      notes,
      type: _types.GET_NOTES_ALL_SUCCESS,
    });
  } catch (err) {
    dispatch({ err, type: _types.GET_NOTES_ALL_ERROR });
  } finally {
    dispatch({ type: _types.GET_NOTES_ALL_COMPLETED });
  }
};

const fetchArticles = (apiConfig = {}) => {
  return (dispatch) => {
    const url = `${baseUrl}/object/index`;
    dispatch(shipEvent(_types.GET_NOTE_INDEX_START));
    return (async () => {
      try {
        const response = await window.fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        const index = defaultUniqueArray(data?.payload?.list);
        let payload = [...(index || [])];
        if (apiConfig.limit && payload.length > partialLoadCount) {
          payload = [...payload.slice(-partialLoadCount)];
        }
        fetchEntireListPayload(dispatch, payload, apiConfig);
        dispatch({ index, type: _types.GET_NOTE_INDEX_SUCCESS });
      } catch (error) {
        dispatch({ error, type: _types.GET_NOTE_INDEX_ERROR });
      } finally {
        dispatch({ type: _types.GET_NOTE_INDEX_COMPLETED });
      }
    })();
  };
};

const refreshIndex = (dispatch, index) => {
  return dispatch({ index, type: _types.ADD_NOTE_INDEX_ID });
};

const refreshNotes = (dispatch, notes) => {
  return dispatch({ notes, type: _types.ADD_NOTES_ALL_NOTE });
};

export { fetchArticles, refreshIndex, refreshNotes };
