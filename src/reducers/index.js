import * as at from '../actions/types';

export const main = (state = {

}, action) => {
  switch (action.type) {
    case at.SET_SOMETHING: {
      return {
        ...state,
      }
    }
    default:
      return state;
  }
};
