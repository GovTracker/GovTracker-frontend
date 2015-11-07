
export function setLoggedIn(userState, loggedIn) {
  var nextState = userState.set('loggedIn', loggedIn);
  if (!loggedIn) {
    nextState = nextState.set('firstName', null).set('lastName', null).set('email', null);
  }
  return nextState;
}

export function setFirstName(userState, firstName) {
  return userState.set('firstName', firstName);
}

export function setLastName(userState, lastName) {
  return userState.set('lastName', lastName);
}

export function setEmail(userState, email) {
  return userState.set('email', email);
}
