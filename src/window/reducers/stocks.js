import * as Types from '../actions/types';

const initialState = ['AAPL', 'TSLA', 'NVDA', 'AMD'];

export default function stocksReducer (stocks = initialState, action = {}) {
  switch (action.type) {
    case Types.ADD_STOCK_SYMBOL:
      if (stocks.indexOf(action.symbol) === -1) {
        return stocks.concat(action.symbol);
      }
      return stocks;
    case Types.REMOVE_STOCK_SYMBOL:
      let index = stocks.indexOf(action.symbol);
      // stock doesn't exist, don't do anything
      if (index === -1) {
        return stocks;
      }

      // otherwise, it does exist, and now create a new array without it
      return stocks.slice(0, index).concat(stocks.slice(index + 1));
    default:
      return stocks;
  }
}
