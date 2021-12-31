const authApiBaseUrl = "https://jwt-auth-access-api.herokuapp.com";
const authApiEndpointLiveness = "liveness";
const authApiEndpointToken = "token";
const baseApiUrl = "https://journal-notes-storage-api.herokuapp.com/json";
const baseApiConfig = { header: { "Content-Type": "application/json" } };

export {
  authApiBaseUrl,
  authApiEndpointLiveness,
  authApiEndpointToken,
  baseApiUrl,
  baseApiConfig,
};
