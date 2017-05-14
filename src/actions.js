import * as at from './actionTypes';
import {API} from './options';

export function loadExample() {
  return (dispatch) => {
    return fetch(`${API}/path`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        const dataExample = json.data.map((item, key) => {
          return {

          }
        });
        dispatch(setExample(dataExample));
        return dataExample;
      })
  };
}

export function setExample(dataExample) {
  return { type: at.SET_EXAMPLE, dataExample };
}
