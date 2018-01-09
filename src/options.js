/* global NODE_ENV, ORIGIN, injectParams, __webpack_hash__ */

import {getAPI, googleEvent} from './common/basic';

export const API = getAPI(null, {
  dev: 'https://lc-land-toyota.dev.bstd.ru',
  prod: 'https://serviceportal.toyota.ru',
});

export const ORIGIN = typeof injectParams !== 'undefined' && injectParams.origin ? injectParams.origin : '//pages.toyota.ru/lc-land';
export const DEALER = typeof injectParams !== 'undefined' && injectParams.dealer;
export const BASE_URL = typeof injectParams !== 'undefined' && injectParams.baseUrl ? injectParams.baseUrl : '/';
export const CONTAINER = (typeof injectParams !== 'undefined' && injectParams.container) || '#app';

export const CSS = require('!!sass-variable-loader!./theme/partials/variables.scss');
