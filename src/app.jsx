import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import { configureStore } from "./state/store";
import AppContainer from "./sections/appContainer";

const generateClassName = createGenerateClassName({
  productionPrefix: "nssd",
});

const App = () => {
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
