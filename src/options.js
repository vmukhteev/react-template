/* global NODE_ENV */

import {api as apiFromQuery} from './storage';
import {getAPI} from '../vendor/basic';

export const API = getAPI(apiFromQuery, {
  dev: '//api-dev',
  prod: '//api-prod',
});
