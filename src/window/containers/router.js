import React from 'react';
import {IndexRoute, Router, Route, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import Main from './main';
import Stocks from './stocks';
import Settings from './settings';

export default function createRouter(store) {
  const history = syncHistoryWithStore(hashHistory, store);

  return function AppRouter () {
    return (
      <Router history={history}>
        <Route path="/" component={Main}>
          <IndexRoute component={Stocks} />
          <Route path="settings" component={Settings} />
        </Route>
      </Router>
    );
  };
}
