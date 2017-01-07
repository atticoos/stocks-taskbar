import 'object.observe';
import {ipcMain} from 'electron';
import Rx from 'rx/dist/rx.all';
import createQuoteReducers from './quotes';
import createTickerSettingsReducers from './tickerSettings';

export default function createApplicationStore () {
  // Bind to actions dispatched from the React UI side
  const actionSource = Rx.Observable.fromEvent(ipcMain, 'renderer-action', (event, action) => action);

  // Create reducers
  const quotes = combineReducers(createQuoteReducers(actionSource), ['AMD']);
  const tickerSettings = combineReducers(createTickerSettingsReducers(actionSource), 300);

  // Combine reducers into a tree
  return combineStores({
    quotes,
    settings: combineStores({
      tickerWidth: tickerSettings
    })
  })
  .skip(1)
}

function combineReducers (reducers, initialState = []) {
  return Rx.Observable.merge(...reducers)
    .scan((state, reducer) => reducer(state), initialState)
    .startWith(initialState)
}

function combineStores (storeStructure) {
  const stores = Object.keys(storeStructure)
    .map(storeName => storeStructure[storeName].map(state => ({
      [storeName]: state
    })));

  return Rx.Observable.merge(...stores)
    .scan((state, storeState) => {
     return ({
      ...state,
      ...storeState
    })
  }, {});
}
