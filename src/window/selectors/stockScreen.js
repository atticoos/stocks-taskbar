import {createStructuredSelector} from 'reselect';
import quotesSelector from './quotes';
const newStockSelector = state => state.newStock;
const expandedStockDetailsSelector = state => state.expandedStockDetails;

export default createStructuredSelector({
  quotes: quotesSelector,
  newStock: newStockSelector,
  expandedSymbol: expandedStockDetailsSelector
});
