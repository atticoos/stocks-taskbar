'use strict';

import Rx from 'rx';
import fetch from 'node-fetch';
import Promise from 'bluebird';
fetch.promise = Promise;

// rate limits apply
// try http://stackoverflow.com/questions/13458132/json-formatted-stock-quote-api-live-or-historical
const BASE_URL = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=';

const symbols = [
  'AAPL',
  'TSLA',
  'NVDA',
  'AMD'
];

var observable = Rx.Observable.create(o =>
  Promise.all(
    symbols.map(getStock)
  ).then(data => {
    o.onNext(data);
    o.onCompleted();
  })
  .catch(e => o.onError(e))
);

var source = observable
  .take(1)
  .merge(
    Rx.Observable
      .interval(60 * 1000)
    .flatMapLatest(observable)
  );

function getStock (symbol) {
  return fetch(`${BASE_URL}${symbol}`)
    .then(res => res.json());
}

export default source;
