import axios from "axios";
import * as _types from "./types";
import {
  authApiBaseUrl as authApiUrl,
  authApiEndpointLiveness as endpointLiveness,
  authApiEndpointToken as endpointToken,
  baseApiConfig as baseConfig,
} from "../../libs/apiConfig";
import { timing } from "../../libs/time";
import { defaultEmptyObject, defaultEmptyString } from "../../libs/defaults";

let hydrateTimer = -1;
const hydrateIntervalAmount = timing.FIVE_MINUTES;

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
  clearInterval(hydrateTimer);
  return (dispatch) => {
    return dispatch({ type: _types.CLEAR_TOKEN });
  };
};

const fetchToken = (credentials, config = {}) => {
  return (dispatch) => {
    dispatch(startRequest());
    const url = `${authApiUrl}/${endpointToken}`;
    const configuration = { ...baseConfig, ...defaultEmptyObject(config) };
    return axios
      .post(url, credentials, configuration)
      .then((response) => {
        const data = defaultEmptyString(response?.data?.token);
        dispatch(hydrateToken(credentials, config));
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

const hydrateToken = (credentials, config = {}) => {
  return (dispatch) => {
    hydrateTimer = setInterval(() => {
      const url = `${authApiUrl}/${endpointToken}`;
      const configuration = { ...baseConfig, ...defaultEmptyObject(config) };
      return axios
        .post(url, credentials, configuration)
        .then((response) => {
          const data = defaultEmptyString(response?.data?.token);
          return dispatch({ type: _types.HYDRATE_TOKEN, data });
        })
        .catch((error) => {
          console.warn("unable to hydrate token", error);
        })
        .finally(() => {
          /* do nothing */
        });
    }, hydrateIntervalAmount);
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
