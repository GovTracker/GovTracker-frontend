import {Map} from 'immutable';
import {handleActions} from 'redux-actions';
import parseToken from '../../helpers/parseToken';

export const INITIAL_STATE = Map({
  loaded: false
});

export default handleActions({
  LOAD_USER: (state, action) => {
    return state.set('loading', true).remove('loginError').remove('error').remove('logoutError');
  },

  LOAD_USER_SUCCESS: (state, action) => {
    return state.set('loading', false).set('loaded', true).set('user', action.payload).set('loggedIn', true).remove('error');
  },

  LOAD_USER_FAIL: (state, action) => {
    return state.set('loading', false).set('loaded', false).set('user', null).set('loggedIn', false).set('error', action.payload);
  },

  LOGIN: (state, action) => {
    return state.set('loggingIn', true).remove('loginError').remove('error').remove('logoutError');
  },

  LOGIN_SUCCESS: (state, action) => {
    return state.set('loggingIn', false).set('user', action.payload.user).set('token', parseToken(action.payload.token)).set('loggedIn', true).remove('loginError');
  },

  LOGIN_FAIL: (state, action) => {
    return state.set('loggingIn', false).set('user', null).set('token', parseToken(null)).set('loggedIn', false).set('loginError', action.payload);
  },

  LOGOUT: (state, action) => {
    return state.set('loggingOut', true).remove('loginError').remove('error').remove('logoutError');
  },

  LOGOUT_SUCCESS: (state, action) => {
    return state.set('loggingOut', false).set('user', null).set('token', parseToken(null)).set('loggedIn', false).remove('logoutError');
  },

  LOGOUT_FAIL: (state, action) => {
    return state.set('loggingOut', false).set('logoutError', action.payload);
  },

  REFRESH_TOKEN: (state, action) => {
    return state.set('refreshingToken', true);
  },

  REFRESH_TOKEN_SUCCESS: (state, action) => {
    return state.set('refreshingToken', false).set('token', parseToken(action.payload.token)).remove('refreshTokenError');
  },

  REFRESH_TOKEN_FAIL: (state, action) => {
    return state.set('refreshingToken', false).set('refreshTokenError', action.payload);
  },

  SET_TOKEN: (state, action) => {
    return state.set('token', parseToken(action.payload));
  },

  UPDATE_USER_PROFILE: (state, action) => {
    return state.set('updating', true);
  },

  UPDATE_USER_PROFILE_SUCCESS: (state, action) => {
    return state.set('updating', false).set('user', action.payload);
  },

  UPDATE_USER_PROFILE_FAIL: (state, action) => {
    return state.set('updating', false).set('updateUserProfileError', action.payload);
  },

  SET_SAVED_UPDATE_USER_PROFILE: (state, action) => {
    return state.set('updateSaved', action.payload);
  }
}, INITIAL_STATE);
