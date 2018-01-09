/* global __dirname */

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  devtool: 'eval',
  entry: {
    //нужно загрузить babel-polyfill раньше, чем react и react-dom из-за ошибки в IE в React 15.4
    vendor: [
      '@babel/polyfill',
      './src/common/polyfill',
    ],
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'whatwg-fetch',
      './src/common/device.js',
      './src/index.jsx',
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: '"development"',
      'process.env.NODE_ENV': '"development"',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      classNames: 'classnames',
      prop: 'safe-access',
      $: 'jquery',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      { from: './src/theme/fonts', to: './fonts' },
    ]),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      "node_modules",
      path.resolve(__dirname, "src/theme")
    ],
  },
  module: {
    rules: [
      { test: /\.(png|jpe?g|gif|ico|cur)$/, use: 'url-loader?limit=5000' },
      { test: /\.(eot|ttf|svg|woff|woff2|mp4|mov)$/, use: 'file-loader' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
            }
          }
        ],
        include: [
          path.join(__dirname, 'node_modules'),
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
        include: [
          path.join(__dirname, 'src/theme/styles/plugins'),
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '___[local]',
              modules: true,
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
        exclude: [
          path.join(__dirname, 'src/theme/styles/plugins'),
        ]
      },
      {
        test: /\.(js|jsx)?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-react",
              ["@babel/preset-env", {
                "modules": false
              }],
              "@babel/preset-stage-0"
            ],
            plugins: ["react-hot-loader/babel"],
            babelrc: false
          }
        },
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'data'),
        ]
      },
    ],
  },
};

