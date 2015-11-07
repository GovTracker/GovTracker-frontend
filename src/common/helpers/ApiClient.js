import qs from 'query-string';
import {fetch} from 'redux-effects-fetch'

class ApiClient {
  constructor() {
    ['get', 'post', 'put', 'patch', 'del'].
      forEach((method) => {
        this[method] = (path, options) => {
          let fetchUrl = this.formatUrl(path);
          if (options && options.params) {
            fetchUrl += "?";
            fetchUrl += qs.stringify(options.params);
          }
          let body = {};
          if (options && options.data) {
            body = JSON.stringify(options.data);
          }
          return fetch(fetchUrl, {
            method: method,
            body: body
          });
        };
      });
  }

  /* This was originally a standalone function outside of this class, but babel kept breaking, and this fixes it  */
  formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    // Prepend `/api` to relative URL, to proxy to API server.
    return '/api' + adjustedPath;
  }
}

export default new ApiClient();
