/* global NODE_ENV, ORIGIN, injectParams, __webpack_hash__ */

import {getAPI, googleEvent} from './common/basic';

export const API = getAPI(null, {
  dev: 'https://lc-land-toyota.dev.bstd.ru',
  prod: 'https://serviceportal.toyota.ru',
});


const injectParams = typeof injectParams !== 'undefined' ? injectParams : {};

export const BASE_URL = injectParams.baseUrl ? injectParams.baseUrl : '/';
export const CONTAINER = injectParams.container || '#app';
export const CSS = require('!!sass-variable-loader!./theme/partials/variables.scss');
