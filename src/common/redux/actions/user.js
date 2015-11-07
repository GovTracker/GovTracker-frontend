import {createAction} from 'redux-actions'
import {bind} from 'redux-effects'
import {cookie} from 'redux-effects-cookie'
import { pushState } from 'redux-router';
import { timeout } from 'redux-effects-timeout'
import parseToken from '../../helpers/parseToken';
import ApiClient from '../../helpers/ApiClient';

const loadUser = createAction('LOAD_USER');
const loadUserSuccess = createAction('LOAD_USER_SUCCESS');
const loadUserFail = createAction('LOAD_USER_FAIL');

const loginUser = createAction('LOGIN');
const loginUserSuccess = createAction('LOGIN_SUCCESS');
const loginUserFail = createAction('LOGIN_FAIL');

const logoutUser = createAction('LOGOUT');
const logoutUserSuccess = createAction('LOGOUT_SUCCESS');
const logoutUserFail = createAction('LOGOUT_FAIL');

const refreshToken = createAction('REFRESH_TOKEN');
const refreshTokenSuccess = createAction('REFRESH_TOKEN_SUCCESS');
const refreshTokenFail = createAction('REFRESH_TOKEN_FAIL');

const updateUserProfile = createAction('UPDATE_USER_PROFILE');
const updateUserProfileSuccess = createAction('UPDATE_USER_PROFILE_SUCCESS');
const updateUserProfileFail = createAction('UPDATE_USER_PROFILE_FAIL');

const setToken = createAction('SET_TOKEN');

const setSavedUpdateUserProfile = createAction('SET_SAVED_UPDATE_USER_PROFILE');

function accessTokenCookie(token) {
  if (token !== undefined) {
    const tokenObj = parseToken(token);
    let options = {};
    if (tokenObj) {
      options['expires'] = (new Date(tokenObj.exp*1000));
    }
    return cookie('access_token', token, options);
  } else {
    return cookie('access_token');
  }
}

export function isLoaded(globalState) {
  return globalState.user && globalState.user.has('loaded') && globalState.user.has('token') && globalState.user.get('token') !== null && globalState.user.get('loaded');
}

export function getToken(globalState) {
  if (globalState.user && globalState.user.has('token')) {
    return globalState.user.get('token');
  } else {
    return null;
  }
}

export function load(getFromCookie) {
  const fetchLoad = bind(
    ApiClient.get('/v1/users/current/'),
    loadUserSuccess,
    loadUserFail
  );
  if (getFromCookie) {
    return [
      loadUser(),
      bind(
        accessTokenCookie(),
        token => bind(
          setToken(token),
          () => fetchLoad
        )
      )
    ]
  } else {
    return [
      loadUser(),
      fetchLoad
    ]
  }
}

export function refresh(token) {
  return [
    refreshToken(),
    bind(
      ApiClient.post('/auth/refresh/', {
        data: {
          token: token
        }
      }),
      newToken => bind(
        accessTokenCookie(newToken.token),
        () => refreshTokenSuccess(newToken) 
      ),
      refreshTokenFail
    )
  ]
}

export function login(username, password, onSuccess, onFail) {
  return [
    loginUser(),
    bind(
      ApiClient.post('/auth/login/', {
        data: {
          username: username,
          password: password
        }
      }),
      user => bind(
        accessTokenCookie(user.token),
        () => bind(
          loginUserSuccess(user),
          () => bind(
            loadUserSuccess(user.user),
            onSuccess
          )
        )
      ),
      error => bind(
        accessTokenCookie(null),
        () => bind(
          loginUserFail(error),
          () => onFail(error)
        )
      )
    )
  ]
}

export function logout() {
  return [
    logoutUser(),
    bind(
      accessTokenCookie(null),
      logoutUserSuccess
    )
  ]
}

export function submitUpdateUserProfile(values, onSuccess, onFail) {
  return [
    updateUserProfile(),
    bind(
      ApiClient.put('/v1/users/current/', {
        data: values
      }),
      user => {
        onSuccess(user);
        return [
          updateUserProfileSuccess(user),
          setSavedUpdateUserProfile(true),
          timeout(() => setSavedUpdateUserProfile(false), 3000)
        ]
      },
      error => {
        onFail(error);
        return updateUserProfileFail(error);
      }
    )
  ]
}


