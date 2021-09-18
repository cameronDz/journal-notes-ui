import axios from "axios";
import * as _types from "./types";
import _apiConfig from "../../../assets/apiConfig.json";

const authApiUrl = _apiConfig.authApiUrl;
const config = _apiConfig.baseApiConfig;

const startRequest = () => {
  return { type: _types.GET_TOKEN_START };
};

const fetchToken = (credentials) => {
  return (dispatch) => {
    console.info("start");
    dispatch(startRequest());
    return axios.post(authApiUrl, credentials, config).then((payload) => {
      console.info("then: ", payload);
      const type = _types.GET_TOKEN_SUCCESS;
      return dispatch({ data: payload?.data, type });
    }).catch((error) => {
      console.info("error: ", error);
      const type = _types.GET_TOKEN_ERROR;
      return dispatch({ error, type });
    }).finally(() => {
      console.info("finally");
      dispatch({ type: _types.GET_TOKEN_COMPLETED });
    });
  };
};

export { fetchToken };
