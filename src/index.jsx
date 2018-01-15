/* global NODE_ENV, injectContainers */

import {CONTAINER, BASE_URL} from './options';
import './theme/css.js';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import * as reducers from './reducers';
import App from './containers/App';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

let history = createBrowserHistory({ basename: BASE_URL });
//history.replace(`${window.location.pathname.replace('.json','').replace(BASE_URL,'')}${window.location.search}${window.location.hash}`);

let middleware = store => next => action => {
  let result = next(action);
  if(NODE_ENV === 'development') {
    //console.log('store', store.getState().main);
  }
  return result;
};

const store = createStore(
  combineReducers({
    ...reducers,
    form: formReducer,
  }),
  applyMiddleware(
    thunk,
    middleware,
  )
);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route component={App}/>
        </Switch>
      </ConnectedRouter>
    </Provider>,
    $(CONTAINER).addClass('injectedBlock').get(0)
  );
};
render();

/////////////////////////

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render();
  });
}
