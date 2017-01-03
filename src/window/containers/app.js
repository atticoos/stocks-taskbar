import React from 'react';
import {Provider} from 'react-redux';
import createRouter from './router';
import store from '../store';

const Router = createRouter(store);

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
