const authApiBaseUrl = "https://jwt-auth-access-api.herokuapp.com";
const authApiEndpointLiveness = "liveness";
const authApiEndpointToken = "token";
const baseApiUrl = "https://journal-notes-storage-api.herokuapp.com/json";
const baseApiLiveness = "liveness";
const baseApiConfig = { header: { "Content-Type": "application/json" } };
const disableSave = false;
const partialLoadCount = 25;

export {
  authApiBaseUrl,
  authApiEndpointLiveness,
  authApiEndpointToken,
  baseApiUrl,
  baseApiConfig,
  baseApiLiveness,
  disableSave,
  partialLoadCount,
};
