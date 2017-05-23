/* global NODE_ENV */

import {api as apiFromQuery} from './storage';
import {getAPI} from './common/basic';

export const API = getAPI(apiFromQuery, {
  dev: '//api-dev',
  prod: '//api-prod',
});
