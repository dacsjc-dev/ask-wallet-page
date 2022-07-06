const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 4000,
    compress: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
    new DotEnv(),
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            extends: './.babelrc'
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
};
