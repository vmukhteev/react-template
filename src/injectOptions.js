/* global NODE_ENV, __webpack_public_path__, injectParams, __webpack_hash__ */

if(typeof injectParams !== 'undefined' && injectParams.origin) {
  __webpack_public_path__= `${injectParams.origin}/static/${__webpack_hash__}/`;
}