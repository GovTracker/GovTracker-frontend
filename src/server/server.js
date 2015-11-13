/* eslint-disable no-console, no-use-before-define */
import Express from 'express';
import Helmet from 'react-helmet';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';

import createStore from '../common/redux/store/createStore';
import getRoutes from '../common/routes';
import parseToken from '../common/helpers/parseToken';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { reduxReactRouter, match } from 'redux-router/server';
import bodyParser from 'body-parser';
import qs from 'query-string';
import getStatusFromRoutes from '../common/helpers/getStatusFromRoutes';
import { toJSON } from 'transit-immutable-js';
import cookieParser from 'cookie-parser';
import cookie from 'redux-effects-cookie';
import {Map} from 'immutable';

const app = new Express();
const port = 3000;
const address = '0.0.0.0';

// Use this middleware to set up hot module reloading via webpack.
if (process.env.NODE_ENV != 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));

  //expose public folder as static assets
  app.use('/static', Express.static(__dirname + '/../../static'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser())

app.use(function(req, res, next) {
  const cookieMiddleware = cookie(req.cookies);
  req.store = createStore(reduxReactRouter, getRoutes, createMemoryHistory, cookieMiddleware, true);
  req.store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      return res.status(500).send("Server Error: " + '<br/>' + error.stack);
    } else if (!routerState) {
      // 404
      return res.status(404).send("Page not found.");
    } else {
      if (routerState.location.search && !routerState.location.query) {
        routerState.location.query = qs.parse(routerState.location.search);
      }

      req.store.getState().router.then(() => {
        const componentInstance = (
          <Provider store={req.store} key="provider">
            <ReduxRouter/>
          </Provider>
        );
        const status = getStatusFromRoutes(routerState.routes);
        if (status) {
          res.status(status);
        }

        const clientInitialState = req.store.getState();
        let html = "<!DOCTYPE html>";
        html += ReactDOMServer.renderToString(componentInstance);
        let head = Helmet.rewind();
        let newHead = `
            ${head.title.toString()}
            ${head.meta.toString()}
            ${head.link.toString()}
            <script>
              window.__INITIAL_STATE__ = '${toJSON(clientInitialState)}';
            </script>
          </head>
        `;
        html = html.replace('</head>', newHead);
        for (const key in req.cookies) {
          let options = {};
          if (key == 'access_token') {
            const token = req.cookies[key];
            if (token) {
              const tokenObj = parseToken(token);
              if (tokenObj) {
                options['expires'] = (new Date(tokenObj.exp*1000));
              }
            }
          }
          res.cookie(key, req.cookies[key], options);
        }
        res.send(html);
      }).catch((err) => console.log(err.stack));
    }
  }));
});

const server = app.listen(port, address, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
