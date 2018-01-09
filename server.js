/* global __dirname, require */

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config from './webpack.config.dev.babel.js';
import pages from './src/pages.js';

pages.forEach( page => {
  const app = express();
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, page.path));
  });

  app.listen(page.port, 'localhost');
})
