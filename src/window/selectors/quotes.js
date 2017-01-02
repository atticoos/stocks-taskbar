import {createSelector} from 'reselect';

const symbolsSelector = state => state.stocks;
const quotesSelector = state => state.quotes;

export default createSelector(
  symbolsSelector,
  quotesSelector,
  (symbols, quotes) => {
    return symbols.map(symbol => ({
      symbol,
      quote: quotes[symbol]
    }));
  }
);
