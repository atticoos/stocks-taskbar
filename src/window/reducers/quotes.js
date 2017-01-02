import {remote} from 'electron';
import * as Types from '../actions/types';

const quotesCollectionToState = quotes => quotes.reduce((map, quote) => {
  map[quote.Symbol] = quote;
  return map;
}, {});

var quoteData = remote.getCurrentWindow().quotes || [];

const initialState = quotesCollectionToState(quoteData);

export default function quotesReducer (state = initialState, action = {}) {
  switch (action.type) {
    case Types.QUOTE_DATA:
      return {
        ...state,
        ...quotesCollectionToState(action.quotes)
      };
    default:
      return state;
  }
}
