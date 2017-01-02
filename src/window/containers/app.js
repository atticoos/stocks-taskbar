import React from 'react';
import {Provider} from 'react-redux';
import Stocks from './stocks';
import store from '../store';

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Stocks />
      </Provider>
    );
  }
}
