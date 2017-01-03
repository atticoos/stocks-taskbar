import * as Types from '../actions/types';

export default function expandedStockReducer (symbol = null, action = {}) {
  switch (action.type) {
    case Types.EXPAND_STOCK_DETAILS:
      return action.symbol;
    case Types.COLLAPSE_STOCK_DETAILS:
      return null;
    default:
      return symbol;
  }
}
