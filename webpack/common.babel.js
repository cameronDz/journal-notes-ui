import CopyWebpackPlugin from "copy-webpack-plugin";
import { resolve } from "path";

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
    path: resolve(__dirname, "..", "dist"),
    clean: true,
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
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
};

export default common;
