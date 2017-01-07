import {Menu, Tray} from 'electron';
import {createTickerImage} from './graphicGenerator';
import {ipcMain} from 'electron';
import path from 'path';
import stockSource from './stocks';
import * as ActionTypes from '../window/actions/types';
import * as StockActions from '../window/actions/stocks';
import createObservables from './observables';
import createStore from './store';
import 'object.observe';
import Rx, {Observable} from 'rx/dist/rx.all';

const MAX_FRAMES = 200;
const FPS = 40;

var mockData = [
  {Symbol: 'AAPL', ChangePercent: 3.02, Price: 115.82},
  {Symbol: 'TSLA', ChangePercent: 1.26, Price: 108.23},
  {Symbol: 'NVDA', ChangePercent: -5.32, Price: 102.19},
  {Symbol: 'AMD', ChangePercent: -2.45, Price: 11.74}
];

export function buildTray (menubar) {
  const {tray} = menubar;
  var animateFrames = createTrayFrameAnimator(tray, FPS);
  var store = createStore();

  tray.setToolTip('Stock Ticker');
  const quotesChanged = store
    .map(state => state.quotes)
    .distinctUntilChanged();

  const tickerWidthChanged = store
    .map(state => state.settings.tickerWidth)
    .distinctUntilChanged();

  Observable.combineLatest(
    quotesChanged.debounce(1000),
    tickerWidthChanged,
    (quotes, width) => [quotes, width]
  )
    .flatMap(([quotes, width]) => Observable.fromPromise(generateFrames(quotes, width)))
    .subscribe(frames => animateFrames(frames));


  return tray;
}

function generateQuote (symbol) {
  var percent = Math.random() * 10;
  var price = Math.random() * 100;
  percent = Math.random() < 0.5 ? -1 * percent : percent;
  return {
    Symbol: symbol,
    ChangePercent: percent.toFixed(2),
    Price: price.toFixed(2)
  };
}

function generateFrames (mockData, width) {
  return new Promise(resolve => {
    function recurse (frames = []) {
      if (frames.length >= MAX_FRAMES) {
        return resolve(frames);
      }

      // Generate each image on its own event loop
      setImmediate(() => {
        console.log('building item', frames.length);
        recurse(frames.concat(createTickerImage(mockData, frames.length, width)));
      });
    }
    recurse();
  });
}

function createTrayFrameAnimator (tray, fps) {
  var interval;
  var position = 0;

  return function animateTrayFrames (frames) {
    clearInterval(interval);
    interval = setInterval(() => {
      tray.setImage(frames[position]);
      if (position >= MAX_FRAMES - 1) {
        position = 0;
      } else {
        position++;
      }
    }, fps);
  }
}
