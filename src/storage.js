/* global __webpack_hash__ */

import {getQueryVariable} from '../vendor/basic';

if(localStorage) {

  //localStorage может стать неаткуальной в новом билде, поэтому чистим ее
  if(!localStorage.getItem("build") || localStorage.getItem("build") !== __webpack_hash__) {
    localStorage.clear();
    localStorage.setItem("build", __webpack_hash__);
  }

  let api = getQueryVariable('api');
  if(api){
    localStorage.setItem('api', api);
  }
  else if(api === null) {
    localStorage.removeItem('api');
  }
}

export const api = localStorage ? localStorage.getItem('api') : null;
