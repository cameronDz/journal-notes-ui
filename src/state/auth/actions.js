import axios from "axios";
import * as _types from "./types";
import {
  authApiBaseUrl as authApiUrl,
  authApiEndpointLiveness as endpointLiveness,
  authApiEndpointToken as endpointToken,
  baseApiConfig as baseConfig,
} from "../../libs/apiConfig";
import { defaultEmptyObject, defaultEmptyString } from "../../libs/defaults";

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

const fetchToken = (credentials, config = {}) => {
  return (dispatch) => {
    dispatch(startRequest());
    const url = `${authApiUrl}/${endpointToken}`;
    return axios
      .post(url, credentials, { ...baseConfig, ...defaultEmptyObject(config) })
      .then((response) => {
        const data = defaultEmptyString(response?.data?.token);
        return dispatch({ type: _types.GET_TOKEN_SUCCESS, data });
      })
      .catch((error) => {
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
    return axios.post(url, {}, baseConfig);
  };
};

export { clearError, clearToken, fetchToken, livenessCheck };
