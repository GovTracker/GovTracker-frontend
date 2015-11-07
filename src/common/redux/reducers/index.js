import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';
import user from './user';
import login from './login';
import {reducer as form} from 'redux-form';

export default combineReducers({
  router,
  login,
  user,
  form
});
