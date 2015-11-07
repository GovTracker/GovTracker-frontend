import {Map, List} from 'immutable';
import {handleActions} from 'redux-actions';

export const INITIAL_STATE = Map({
  intervalId: null,
  backdropIndex: -1,
  backdrop2Index: -1,
  preloadIndex: -1,
  backdropOpacity: 1.0,
  backdrop2Opacity: 0.0,
  images: List()
});

export default handleActions({
  INTERVAL_CREATED: (state, action) => {
    return state.set('intervalId', action.payload);
  },
  SET_BACKDROP_INDEX: (state, action) => {
    return state.set('backdropIndex', action.payload);
  },
  SET_BACKDROP2_INDEX: (state, action) => {
    return state.set('backdrop2Index', action.payload);
  },
  SET_PRELOAD_INDEX: (state, action) => {
    return state.set('preloadIndex', action.payload);
  },
  SET_BACKDROP_OPACITY: (state, action) => {
    return state.set('backdropOpacity', action.payload);
  },
  SET_BACKDROP2_OPACITY: (state, action) => {
    return state.set('backdrop2Opacity', action.payload);
  },
  SET_IMAGE_URLS: (state, action) => {
    return state.set('images', List(action.payload));
  }
}, INITIAL_STATE);
