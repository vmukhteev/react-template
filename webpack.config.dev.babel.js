/* global __dirname */

import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'babel-polyfill', //в частности, promise-полифилл
    'whatwg-fetch', //fetch-полифилл
    './src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: '"development"',
      'process.env.NODE_ENV': '"development"',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      React: 'react',
      classNames: 'classnames',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    rules: [
      { test: /\.(png|jpe?g|gif|ico|cur)$/, use: 'url-loader?limit=5000' },
      { test: /\.(eot|ttf|svg|woff|woff2)$/, use: 'file-loader' },
      { test: /\.css$/, loader: 'style-loader!css' },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader'
        ],
      },
      { test: /\.(eot|ttf|svg|woff|woff2)$/, use: 'file-loader' },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "react",
              ["es2015", {"modules": false}],
              "stage-0"
            ],
            plugins: ["react-hot-loader/babel"],
            babelrc: false
          }
        },
        include: path.join(__dirname, 'src'),
      },
    ],
  },
};

