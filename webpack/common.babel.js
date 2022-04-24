import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebPackPlugin from "html-webpack-plugin";
import { resolve } from "path";
import _package from "../package";

const common = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        exclude: /node_module/,
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "..", "dist", _package.version),
    publicPath: "",
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, "..", "./src/assets/favicon.ico"),
          to: "favicon.ico",
        },
      ],
    }),
    new HtmlWebPackPlugin({
      filename: "./index.html",
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
};

export default common;
