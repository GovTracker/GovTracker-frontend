import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import transitionMiddleware from '../middleware/transitionMiddleware';
import effects from 'redux-effects';
import {bearer} from 'redux-effects-credentials'
import headers from '../middleware/headersMiddleware';
import refreshToken from '../middleware/refreshTokenMiddleware';
import fetch from 'redux-effects-fetch';
import multi from 'redux-multi';
import logger from '../middleware/loggerMiddleware';
import apiUrl from '../middleware/apiUrlMiddleware';
import timeout from 'redux-effects-timeout'
import thunk from 'redux-thunk';

export default function createStore(reduxReactRouter, getRoutes, createHistory, cookieMiddleware, server_rendering, data) {
  let finalCreateStore;
  const apiPattern = /\/api\//;
  const getToken = state => state.user.get('token');
  const getTokenVal = state => {
    const tokenObj = state.user.get('token');
    if (tokenObj) {
      return tokenObj.token;
    } else {
      return null;
    }
  };
  const middleware = [
    multi,
    effects,
    thunk,
    apiUrl(apiPattern, server_rendering),
    bearer(apiPattern, getTokenVal),
    refreshToken(apiPattern, getToken),
    headers(apiPattern),
    fetch,
    cookieMiddleware,
    timeout(),
    transitionMiddleware(server_rendering),
    logger
  ];
  finalCreateStore = applyMiddleware(...middleware)(_createStore);
  finalCreateStore = reduxReactRouter({ getRoutes, createHistory })(finalCreateStore);

  const store = finalCreateStore(reducer, data);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
