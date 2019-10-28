import merge from 'webpack-merge';
import { HotModuleReplacementPlugin } from 'webpack';
import { resolve } from 'path';
import common from './common.babel';

const dev = {
  devServer: {
    contentBase: resolve(__dirname, '..', './dist'),
    hot: true,
    watchContentBase: true
  },
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [new HotModuleReplacementPlugin()]
};

module.exports = merge(common, dev);
