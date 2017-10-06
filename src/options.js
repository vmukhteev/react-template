/* global NODE_ENV, __webpack_hash__, VERSION */
import {api as apiFromQuery} from './storage';
import {getAPI} from './common/basic';

export const API = getAPI(apiFromQuery, {
  dev: '//api-dev',
  prod: '//api-prod',
});

const publicPath = {
  test: `/static/${__webpack_hash__}/`,
  prod: `/static/${__webpack_hash__}/`
};

if(NODE_ENV !== 'development') {
  __webpack_public_path__ = publicPath[VERSION];
}