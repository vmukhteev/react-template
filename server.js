/* global __dirname, require */

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config , {templateParams} from './webpack.config.babel.js';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import pages from './pages';

pages.forEach( page => {

  let configM = {...config};
  let templateParamsM = {
    ...templateParams,
    ...page.params
  };
  configM.plugins.push(new HtmlWebpackPlugin(templateParamsM));

  const app = express();
  const compiler = webpack(configM);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: configM.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `/build/${templateParamsM.filename}`));
  });

  app.listen(page.port, 'localhost');
});
