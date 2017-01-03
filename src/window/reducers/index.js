import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import newStock from './newStock';
import stocks from './stocks';
import quotes from './quotes';

export default combineReducers({
  routing: routerReducer,
  newStock,
  stocks,
  quotes
});
