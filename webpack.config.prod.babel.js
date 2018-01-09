/* global __dirname */

import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  entry: {
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
  },
  output: {
    path: path.join(__dirname, 'build', 'static'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: '"production"',
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      classNames: 'classnames',
      prop: 'safe-access',
      $: 'jquery',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new CopyWebpackPlugin([
      { from: `./src/${process.env.WRAP ? 'appWithWrap' : 'app'}.html`, to: '../index.html' },
      { from: './src/inject.js', to: '../' },
      { from: './src/theme/fonts', to: '../fonts' }
    ]),
    new AssetsPlugin({ prettyPrint: true }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new webpack.optimize.UglifyJsPlugin({}),
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
              localIdentName: '[hash:base64:6]__[local]',
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

