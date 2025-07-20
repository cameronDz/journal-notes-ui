// Set NODE_ENV for GitHub Pages deployment
import HtmlWebPackPlugin from "html-webpack-plugin";
process.env.NODE_ENV = "production";

import merge from "webpack-merge";
import common from "./common.babel";

const prod = {
  mode: "production",
  output: { publicPath: "/journal-notes-ui/" },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "./index.html",
      inject: "body",
      publicPath: "/journal-notes-ui/",
      template: "./src/index.html",
    }),
  ],
};

module.exports = merge(common, prod);
