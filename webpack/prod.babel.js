import merge from 'webpack-merge';
import common from './common.babel';

const prod = { mode: 'production' };

module.exports = merge(common, prod);
