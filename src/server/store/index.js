import 'object.observe';
import {ipcMain} from 'electron';
import Rx from 'rx/dist/rx.all';
import createQuoteReducers from './quotes';
import createTickerSettingsReducers from './tickerSettings';

export default function createApplicationStore () {
  const actionSource = Rx.Observable.fromEvent(ipcMain, 'renderer-action', (event, action) => action);

  const quotes = combineReducers(createQuoteReducers(actionSource), ['AMD']);
  const tickerSettings = combineReducers(createTickerSettingsReducers(actionSource), 300);

  return combineStores({
    quotes,
    settings: combineStores({
      tickerWidth: tickerSettings
    })
  })
  .skip(1)
  // .startWith({
  //   quotes: [],
  //   settings: {
  //     tickerWidth: 300
  //   }
  // })
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
