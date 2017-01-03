import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import expandedStockDetails from './expandedStockDetails';
import newStock from './newStock';
import settings from './settings';
import stocks from './stocks';
import quotes from './quotes';

export default combineReducers({
  routing: routerReducer,
  expandedStockDetails,
  newStock,
  settings,
  stocks,
  quotes
});
