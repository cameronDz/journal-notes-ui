import HtmlWebPackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_module/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.html$/,
      use: {
        loader: 'html-loader'
      }
    }, {
      test: /\.(png|jpe?g|gif)$/i,
      use: {
        loader: 'file-loader',
      },
    }]
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '..', './dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};
