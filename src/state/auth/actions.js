import axios from "axios";
import * as _types from "./types";
import {
  authApiBaseUrl as authApiUrl,
  authApiEndpointLiveness as endpointLiveness,
  authApiEndpointToken as endpointToken,
  baseApiConfig as config,
} from "../../libs/apiConfig";

const startLiveness = () => {
  return { type: _types.LIVENESS_PROBE };
};

const startRequest = () => {
  return { type: _types.GET_TOKEN_START };
};

const clearError = () => {
  return (dispatch) => {
    return dispatch({ type: _types.CLEAR_ERROR });
  };
};

const clearToken = () => {
  return (dispatch) => {
    return dispatch({ type: _types.CLEAR_TOKEN });
  };
};

const fetchToken = (credentials) => {
  return (dispatch) => {
    dispatch(startRequest());
    const url = `${authApiUrl}/${endpointToken}`;
    return axios
      .post(url, credentials, config)
      .then((response) => {
        const data = response?.data || "";
        return dispatch({ type: _types.GET_TOKEN_SUCCESS, data });
      })
      .catch((error) => {
        console.error("GET_TOKEN_ERROR", error);
        return dispatch({ type: _types.GET_TOKEN_ERROR, error });
      })
      .finally(() => {
        return dispatch({ type: _types.GET_TOKEN_COMPLETED });
      });
  };
};

const livenessCheck = () => {
  return (dispatch) => {
    dispatch(startLiveness());
    const url = `${authApiUrl}/${endpointLiveness}`;
    return axios.post(url, {}, config);
  };
};

export { clearError, clearToken, fetchToken, livenessCheck };
