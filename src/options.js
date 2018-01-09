/* global NODE_ENV, ORIGIN, injectParams, __webpack_hash__ */

import * as storage from './storage';
import {getAPI, googleEvent} from './common/basic';

export const API = getAPI(storage.api, {
  dev: 'https://lc-land-toyota.dev.bstd.ru',
  prod: 'https://serviceportal.toyota.ru',
});

export const ORIGIN = typeof injectParams !== 'undefined' && injectParams.origin ? injectParams.origin : '//pages.toyota.ru/lc-land';
export const DEALER = typeof injectParams !== 'undefined' && injectParams.dealer;
export const BASE_URL = typeof injectParams !== 'undefined' && injectParams.baseUrl ? injectParams.baseUrl : '/landcruiserland';
export const CONTAINER = (typeof injectParams !== 'undefined' && injectParams.container) || '#app';

export const CSS = {
  breakpoints: {
    maxTablet: 991,
    maxPhone: 767,
    siteMaxWidth: 1160,
    toyotaMaxTablet: 1199,
    dealerMaxBigHeader: 2080
  },
  sectionMenuHeight: 60
};


