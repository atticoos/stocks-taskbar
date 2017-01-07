import 'object.observe';
import {ipcMain} from 'electron';
import Rx from 'rx/dist/rx.all';
import * as ActionTypes from '../window/actions/types';

const addQuote = newQuote => quotes => quotes.concat(newQuote);
// const removeQuote = removableQuote => quotes => quotes.filter(quote => quote !== removableQuote);
const removeQuote = removableQuote => quotes => quotes;

function createQuoteIntents (actionInputSource) {
  const added = actionInputSource
    .filter(action => action.type === ActionTypes.ADD_STOCK_SYMBOL)
    .map(action => action.symbol);

  const removed = actionInputSource
    .filter(action => action.type === ActionTypes.REMOVE_STOCK_SYMBOL)
    .map(action => action.symbol);

  return {added, removed};
}

function createQuoteReducers (intents) {
  const addRedcuer = intents.added.map(addQuote);
  const removeReducer = intents.removed.map(removeQuote);
  return [addRedcuer, removeReducer];
}

function createQuoteStore (actionSource, initialState = []) {
  const intents = createQuoteIntents(actionSource);
  const reducers = createQuoteReducers(intents);
  return createStore(reducers, initialState);
}


function createCountStore (actionSource) {
  const increment = () => count => count + 1;
  const decrement = () => count => count - 1;
  const intents = createQuoteIntents(actionSource);

  const incrementReducer = intents.added.map(increment)
  const decrementRedcuer = intents.removed.map(decrement);

  return createStore([incrementReducer, decrementRedcuer], 0);
}



function createStore (reducers, initialState) {
  return Rx.Observable.merge(...reducers)
    .scan((state, reducer) => reducer(state), initialState);
}

function createStructuredStore (stores) {
  const structuredStores = Object.keys(stores).reduce((stream, storeName) => {
    const store = stores[storeName].map(state => ({
      [storeName]: state
    }));

    if (!stream) {
      return store;
    }
    return stream.combineLatest(store);
  }, null);

  return structuredStores.map(reducers => {
    return reducers.reduce((state, reducerState) => ({
        ...state,
        ...reducerState
      }), {})
  });
}

function createApplicationStore (data) {
  const actionSource = Rx.Observable.fromEvent(
    ipcMain,
    'renderer-action',
    (event, action) => action
  );

  const counterStore = createCountStore(actionSource);
  const quoteStore = createQuoteStore(actionSource);

  return createStructuredStore({
    count: counterStore,
    quotes: quoteStore
  });
}
