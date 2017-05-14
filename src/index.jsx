/* global NODE_ENV */

import Raven from 'raven-js';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

import Root from './components/Root';
import * as reducers from './reducers';

//Sentry
if (NODE_ENV !== 'development') {
  Raven.config('http://0677002d3f074c0bbfa0c85290c8920b@sentry.bstd.ru/24').install();
}

const history = createHistory();

let middleware = store => next => action => {
  let result = next(action);

  //log
  if(NODE_ENV === 'development') {
    // console.log('dispatching', action);
    // console.log('store', store.getState().main);
    // console.log("-------------------");
  }

  return result;
};

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
    form: formReducer,
  }),
  applyMiddleware(
    thunk,
    routerMiddleware(history),
    middleware,
  )
);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root/>
      </ConnectedRouter>
    </Provider>,
    $('#app').get(0)
  );
};

render();

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    render();
  });
}