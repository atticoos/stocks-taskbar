import {combineReducers} from 'redux';
import newStock from './newStock';
import stocks from './stocks';

export default combineReducers({
  newStock,
  stocks
});
