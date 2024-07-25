import axios from "axios";
import * as _types from "./types";
import {
  baseApiUrl as baseUrl,
  baseApiConfig as baseConfig,
  partialLoadCount,
} from "../../libs/apiConfig";
import { defaultEmptyObject, defaultUniqueArray } from "../../libs/defaults";

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
      const response = await axios.post(url, ids, setConfig(apiConfig));
      notes.push(...(response?.data?.payload?.list || []));
    }
    const isLoadedAll = !apiConfig.limit;
    dispatch({ isLoadedAll, notes, type: _types.GET_NOTES_ALL_SUCCESS });
  } catch (err) {
    return dispatch({ err, type: _types.GET_NOTES_ALL_ERROR });
  }
  return dispatch({ type: _types.GET_NOTES_ALL_COMPLETED });
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
        if (apiConfig.limit && payload.length > partialLoadCount) {
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
