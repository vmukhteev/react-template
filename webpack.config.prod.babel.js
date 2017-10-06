/* global __dirname */

import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';

export default {
  devtool: 'eval',
  entry: {
    app: [
      './src/index.jsx',
    ],
    vendor: [
      'babel-polyfill', //в частности, promise-полифилл
      'whatwg-fetch', //fetch-полифилл
      'react',
      'react-dom',
      'react-router',
      'react-router-redux',
      'react-redux',
      'redux',
      './src/common/polyfill',
      './src/common/basic',
      'raven-js',
    ]
  },
  output: {
    path: path.join(__dirname, 'build', 'static', '[hash]'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: '"production"',
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      React: 'react',
      classNames: 'classnames',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: '../../' }
    ]),
    new AssetsPlugin({ prettyPrint: true }),
    new webpack.ExtendedAPIPlugin()
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
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(js|jsx)?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "react",
              ["es2015", {"modules": false}],
              "stage-0"
            ],
            babelrc: false
          }
        },
        include: path.join(__dirname, 'src'),
      },
    ],
  },
};

