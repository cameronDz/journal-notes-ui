import React from "react";
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
    <StylesProvider generateClassName={generateClassName}>
      <AppContainer />
    </StylesProvider>
  );
};

export default App;
