import {ipcRenderer} from 'electron';

const middleware = store => {
  // main process actions
  ipcRenderer.on('main-action', (event, mainAction) => store.dispatch(mainAction));

  return next => action => {
    return next(action);
  };
};

export default middleware;
