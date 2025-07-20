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
    return (async () => {
      try {
        const url = `${authApiUrl}/${endpointToken}`;
        const configuration = { ...baseConfig, ...defaultEmptyObject(config) };
        const response = await window.fetch(url, {
          ...configuration,
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        const token = defaultEmptyString(data?.token);
        dispatch(hydrateToken(credentials, config));
        dispatch({ type: _types.GET_TOKEN_SUCCESS, data: token });
      } catch (error) {
        dispatch({ type: _types.GET_TOKEN_ERROR, error });
      } finally {
        dispatch({ type: _types.GET_TOKEN_COMPLETED });
      }
    })();
  };
};

const hydrateToken = (credentials, config = {}) => {
  return (dispatch) => {
    hydrateTimer = setInterval(() => {
      return (async () => {
        try {
          const url = `${authApiUrl}/${endpointToken}`;
          const configuration = { ...baseConfig, ...defaultEmptyObject(config) };
          const response = await window.fetch(url, {
            ...configuration,
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
            method: "POST",
          });
          if (!response.ok) {
            throw new Error();
          }
          const data = await response.json();
          const token = defaultEmptyString(data?.token);
          dispatch({ type: _types.HYDRATE_TOKEN, data: token });
        } catch (error) {
          console.error("unable to hydrate token", error);
        } finally {
          // do nothing
        }
      })();
    }, hydrateIntervalAmount);
  };
};

const livenessCheck = () => {
  return (dispatch) => {
    dispatch(startLiveness());
    const url = `${authApiUrl}/${endpointLiveness}`;
    return (async () => {
      try {
        await window.fetch(url, { ...baseConfig, method: "POST" });
      } catch (err) {
        console.error("Liveness check failed", err);
      } finally {
        // do nothing
      }
    })();
  };
};

export { clearError, clearToken, fetchToken, livenessCheck };
