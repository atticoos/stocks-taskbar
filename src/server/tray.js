import {Menu, Tray} from 'electron';
import {createTickerImage} from './graphicGenerator';
import {ipcMain} from 'electron';
import path from 'path';
import stockSource from './stocks';
import * as ActionTypes from '../window/actions/types';
import * as StockActions from '../window/actions/stocks';

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

  var icon = path.normalize(path.join(__dirname, 'icon.png'));
  tray.setToolTip('Stock Ticker');

  generateFrames(mockData).then(frames => animateFrames(frames));

  menubar.on('after-create-window', () => {
    menubar.window.quotes = mockData;
  });

  /*
  stockSource.subscribe(
    data => {
      var menuItems = buildStockMenu(data);
      tray.setContextMenu(menuItems)
    }
    );
  */

  var tickerWidth = 200;

  ipcMain.on('renderer-action', (event, action) => {
    console.log('action', action.type)
    switch (action.type) {
      case ActionTypes.ADD_STOCK_SYMBOL:
        var mockItem = generateQuote(action.symbol);
        mockData.push(mockItem);
        event.sender.send('main-action', StockActions.quoteData(mockData));
        break;
      case ActionTypes.REMOVE_STOCK_SYMBOL:
        let match = mockData.find(item => item.Symbol === action.symbol);
        if (!match) {
          break;
        }
        let index = mockData.indexOf(match);
        if (index === -1) {
          break;
        }
        mockData.splice(index, 1);
        break;
      case ActionTypes.TICKER_WIDTH:
        tickerWidth = action.width;
        break;
    }
    generateFrames(mockData, tickerWidth).then(frames => animateFrames(frames));
  });

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
