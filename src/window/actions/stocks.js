import * as Types from './types';

export function addStock (symbol) {
  return {
    type: Types.ADD_STOCK_SYMBOL,
    symbol: symbol.toUpperCase()
  };
}

export function removeStock (symbol) {
  return {
    type: Types.REMOVE_STOCK_SYMBOL,
    symbol: symbol.toUpperCase()
  };
}

export function newStockTextChanged (text) {
  return {
    type: Types.NEW_STOCK_SYMBOL_CHANGED,
    text
  };
}

export function quoteData (quotes) {
  return {
    type: Types.QUOTE_DATA,
    quotes
  };
}
