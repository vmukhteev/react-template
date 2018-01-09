import * as at from './types';

export function setSomething(param) {
  return { type: at.SET_SOMETHING, param};
}

