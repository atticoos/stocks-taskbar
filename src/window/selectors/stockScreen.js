import {createStructuredSelector} from 'reselect';
import quotesSelector from './quotes';
const newStockSelector = state => state.newStock;

export default createStructuredSelector({
  quotes: quotesSelector,
  newStock: newStockSelector
});
