import merge from "webpack-merge";
import { HotModuleReplacementPlugin } from "webpack";
import HtmlWebPackPlugin from "html-webpack-plugin";
import { resolve } from "path";
import common from "./common.babel";

const dev = {
  devServer: {
    static: { publicPath: resolve(__dirname, "..", "./dist") },
    hot: true,
  },
  devtool: "inline-source-map",
  mode: "development",
  output: { publicPath: "/" },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      filename: "./index.html",
      template: "./src/index.html",
      inject: "body",
      publicPath: "/",
    }),
  ],
};

module.exports = merge(common, dev);
