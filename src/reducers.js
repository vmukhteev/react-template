import { List, Map, OrderedMap } from 'immutable';
import * as at from './actionTypes';

export const main = (state = Map({
  example: Map({})
}), action) => {
  switch (action.type) {
    case at.SET_EXAMPLE: {
      return state.set('example', action.dataExample)
    }
    default:
      return state;
  }
};