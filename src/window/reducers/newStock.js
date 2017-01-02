import * as Types from '../actions/types';

export default function newStockReducer (text = '', action = {}) {
  switch (action.type) {
    case Types.NEW_STOCK_SYMBOL_CHANGED:
      return action.text;
    case Types.ADD_STOCK_SYMBOL:
      return '';
    default:
      return text;
  }
}
