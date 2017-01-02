import {combineReducers} from 'redux';
import newStock from './newStock';
import stocks from './stocks';
import quotes from './quotes';

export default combineReducers({
  newStock,
  stocks,
  quotes
});
