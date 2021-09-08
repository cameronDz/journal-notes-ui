import React from "react";
import { HashRouter } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import AppContainer from "./appContainer";

const generateClassName = createGenerateClassName({
  productionPrefix: "nssd",
});

const App = () => {
  return (
    <HashRouter>
      <StylesProvider generateClassName={generateClassName}>
        <AppContainer />
      </StylesProvider>
    </HashRouter>
  );
};

export default App;
