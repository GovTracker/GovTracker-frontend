import {Map} from 'immutable';
import {expect} from 'chai';

import reducer from '../reducers';

describe('reducer', () => {

  it('has an initial state', () => {
    const actions = [
      {type: 'SET_LOGGED_IN', loggedIn: true},
      {type: 'SET_FIRST_NAME', firstName: "Ritesh"},
      {type: 'SET_LAST_NAME', lastName: "Patel"},
      {type: 'SET_EMAIL', email: "xpatel@pulsecode.ca"}
    ];
    const nextState = actions.reduce(reducer, undefined);
    expect(nextState).to.have.property('router').that.is.null;
    expect(nextState).to.have.property('user').that.is.equal(Map({
      loggedIn: true,
      firstName: "Ritesh",
      lastName: "Patel",
      email: "xpatel@pulsecode.ca"
    }));
  });

  it('handles SET_LOGGED_IN', () => {
    const initialState = {};
    const action = {type: 'SET_LOGGED_IN', loggedIn: true};
    const nextState = reducer(initialState, action);
    expect(nextState).to.have.property('router').that.is.null;
    expect(nextState).to.have.property('user').that.is.equal(Map({
      loggedIn: true,
      firstName: null,
      lastName: null,
      email: null
    }));
  });

  it('handles SET_FIRST_NAME', () => {
    const initialState = {};
    const action = {type: 'SET_FIRST_NAME', firstName: "Ritesh"};
    const nextState = reducer(initialState, action);
    expect(nextState).to.have.property('router').that.is.null;
    expect(nextState).to.have.property('user').that.is.equal(Map({
      loggedIn: false,
      firstName: "Ritesh",
      lastName: null,
      email: null
    }));
  });

  it('handles SET_LAST_NAME', () => {
    const initialState = {};
    const action = {type: 'SET_LAST_NAME', lastName: "Patel"};
    const nextState = reducer(initialState, action);
    expect(nextState).to.have.property('router').that.is.null;
    expect(nextState).to.have.property('user').that.is.equal(Map({
      loggedIn: false,
      firstName: null,
      lastName: "Patel",
      email: null
    }));
  });

  it('handles SET_EMAIL', () => {
    const initialState = {};
    const action = {type: 'SET_EMAIL', email: "xpatel@pulsecode.ca"};
    const nextState = reducer(initialState, action);
    expect(nextState).to.have.property('router').that.is.null;
    expect(nextState).to.have.property('user').that.is.equal(Map({
      loggedIn: false,
      firstName: null,
      lastName: null,
      email: "xpatel@pulsecode.ca"
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_LOGGED_IN', loggedIn: true},
      {type: 'SET_FIRST_NAME', firstName: "Ritesh"},
      {type: 'SET_LAST_NAME', lastName: "Patel"},
      {type: 'SET_EMAIL', email: "xpatel@pulsecode.ca"}
    ];
    const nextState = actions.reduce(reducer, {});
    expect(nextState).to.have.property('router').that.is.null;
    expect(nextState).to.have.property('user').that.is.equal(Map({
      loggedIn: true,
      firstName: "Ritesh",
      lastName: "Patel",
      email: "xpatel@pulsecode.ca"
    }));
  });
});
