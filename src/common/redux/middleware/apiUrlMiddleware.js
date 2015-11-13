/**
 * Action types
 */

const FETCH = 'EFFECT_FETCH'

export default (pattern, server_rendering) => ({dispatch, getState}) => next => action => {
  return action.type === FETCH && pattern.test(action.payload.url)
    ? next({...action, payload: {...action.payload, url: parseUrl(action.payload.url, server_rendering)}})
    : next(action)
  function parseUrl(url, server_rendering) {
    if (server_rendering) {
      // Prepend host and port of the API server to the path.
      const host = process.env.GOVTRACKER_BASE_HOST != undefined ? process.env.GOVTRACKER_BASE_HOST : 'localhost';
      return `http://${host}${url}`;
    }
    return url;
  }
};
