import HtmlWebPackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/../dist',
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
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
    }]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
