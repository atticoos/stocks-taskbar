import {ipcRenderer} from 'electron';

const createMiddleware = (...actionTypes) => store => next => action => {
  if (actionTypes.indexOf(action.type) > -1) {
    // send the action to the main electron process
    ipcRenderer.send('renderer-action', action);
  }
  // otherwise continue as normal
  return next(action);
};

export default createMiddleware;
