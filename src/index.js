import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./js/app";
import { configureStore } from "./js/state/store";

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("app-anchor-tag")
);
