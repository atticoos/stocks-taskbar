import {createStore, applyMiddleware} from 'redux';
import {createIpcSenderMiddleware, ipcReceiverMiddleware} from './middleware';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import * as ActionTypes from '../actions/types';

const ipcSenderMiddleware = createIpcSenderMiddleware(
  ActionTypes.ADD_STOCK_SYMBOL,
  ActionTypes.REMOVE_STOCK_SYMBOL
);

const createStoreWithMiddleware = applyMiddleware(
  ipcSenderMiddleware,
  ipcReceiverMiddleware,
  createLogger()
)(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;
