import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import { configureStore } from "./state/store";
import {
  authApiBaseUrl,
  authApiEndpointLiveness,
  baseApiUrl,
  baseApiLiveness,
} from "./libs/apiConfig";
import AppContainer from "./sections/appContainer";

const generateClassName = createGenerateClassName({
  productionPrefix: "nssd",
});

const FOUR_MINUTES = 240_000;

const App = () => {
  useEffect(() => {
    const livenessCheck = () => {
      window.fetch(`${authApiBaseUrl}/${authApiEndpointLiveness}`, {
        method: "POST",
      });
      window.fetch(`${baseApiUrl}/${baseApiLiveness}`, {
        method: "GET",
      });
    };
    livenessCheck();
    setInterval(livenessCheck, FOUR_MINUTES);
  }, []);
  return (
    <Provider store={configureStore()}>
      <HashRouter>
        <StylesProvider generateClassName={generateClassName}>
          <AppContainer />
        </StylesProvider>
      </HashRouter>
    </Provider>
  );
};

export default App;
