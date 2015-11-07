/**
 * Logs all actions and states after they are dispatched.
 */
export default store => next => action => {
  let result;
  if (typeof console.group === 'function') {
    console.group(action.type);
    console.info('dispatching', action);
    result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
  } else {
    console.log("⎢ " + action.type);
    console.info('dispatching', action);
    result = next(action);
    console.log("⎢ " + 'next state', store.getState());
    console.log('⎣ ' + action.type);
  }
  return result;
};
