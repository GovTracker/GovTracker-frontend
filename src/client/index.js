import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { reduxReactRouter, ReduxRouter } from 'redux-router';

import createStore from '../common/redux/store/createStore';
import getRoutes from '../common/routes';
import makeRouteHooksSafe from '../common/helpers/makeRouteHooksSafe.js';
import { fromJSON } from 'transit-immutable-js';
import cookie from 'redux-effects-cookie';

const initialState = fromJSON(window.__INITIAL_STATE__);
const cookieMiddleware = cookie();

const store = createStore(reduxReactRouter, makeRouteHooksSafe(getRoutes), createHistory, cookieMiddleware, false, initialState);

ReactDOM.render(
  <Provider store={store} key="provider">
    <ReduxRouter routes={getRoutes(store)}/>
  </Provider>,
  document
);
