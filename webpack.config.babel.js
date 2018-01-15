/* global __dirname, process */

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackInjectPlugin from './src/common/webpack-inject-plugin';

const NODE_ENV = process.env.NODE_ENV;

export const templateParams = {
  container: 'app',
  title: 'Template',
  filename: 'index.html',
  template: 'src/templates/default.html'
};

export default {
  entry:
    NODE_ENV === 'production' ?
    {
      vendor: [
        '@babel/polyfill',
        'whatwg-fetch',
        'react',
        'react-dom',
        'react-select',
        './src/common/device.js',
        './src/common/polyfill',
        './src/common/basic',
        './src/injectOptions.js',
      ],
      app: [
        './src/index.jsx',
      ],
    } :
    {
      app: [
        '@babel/polyfill',
        './src/common/polyfill',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        'whatwg-fetch',
        './src/common/device.js',
        './src/index.jsx',
      ],
    },
  output: NODE_ENV === 'production' ?
    {
      path: path.join(__dirname, 'build'),
      filename: '[name].[chunkhash:4].js',
      chunkFilename: '[name].[chunkhash:4].js',
      publicPath: '/',
    } :
    {
      path: path.join(__dirname, 'build'),
      filename: '[name].js',
      publicPath: '/',
    }
  ,
  plugins: [

    new webpack.DefinePlugin({
      NODE_ENV: `"${NODE_ENV}"`,
      'process.env.NODE_ENV': `"${NODE_ENV}"`,
    }),

    new webpack.ProvidePlugin({
      React: 'react',
      classNames: 'classnames',
      prop: 'safe-access',
      $: 'jquery',
    }),

    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    }),

    NODE_ENV === 'development' &&
    new webpack.HotModuleReplacementPlugin(),

    NODE_ENV === 'development' &&
    new webpack.NoEmitOnErrorsPlugin(),

    NODE_ENV === 'production' && new HtmlWebpackPlugin(templateParams),

    NODE_ENV === 'production' &&
    new webpack.HashedModuleIdsPlugin(),

    NODE_ENV === 'production' &&
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),

    NODE_ENV === 'production' &&
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),

    NODE_ENV === 'production' &&
    new WebpackInjectPlugin(),

    NODE_ENV === 'production' &&
    new webpack.optimize.UglifyJsPlugin({}),

  ].filter(item => item),
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
              localIdentName:
                NODE_ENV === 'production' ? '[hash:base64:6]__[local]' : '___[local]'
              ,
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
            plugins: NODE_ENV === 'production' ? [] : ["react-hot-loader/babel"],
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

