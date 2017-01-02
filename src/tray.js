import {Menu, Tray} from 'electron';
import {createTickerImage} from './graphicGenerator';
import {ipcMain} from 'electron';
import path from 'path';
import stockSource from './stocks';
import * as ActionTypes from './window/actions/types';
import * as StockActions from './window/actions/stocks';

const MAX_FRAMES = 200;
const FRAME_CHUNK_SIZE = 20;
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

  ipcMain.on('renderer-action', (event, action) => {
    console.log('action', action.type)
    switch (action.type) {
      case ActionTypes.ADD_STOCK_SYMBOL:
        var mockItem = {
          Symbol: action.symbol,
          ChangePercent: (Math.random() * 10).toFixed(2),
          Price: (Math.random() * 100).toFixed(2)
        };
        mockData.push(mockItem);
        generateFrames(mockData).then(frames => animateFrames(frames));
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
        generateFrames(mockData).then(frames => animateFrames(frames));
        break;
    }
  });

  return tray;
}

function generateFrames (mockData) {
  return new Promise(resolve => {
    function recurse (frames = []) {
      if (frames.length >= MAX_FRAMES) {
        return resolve(frames);
      }
      setTimeout(() => {
        var frameChunks = [];
        console.log('building batch', frames.length);
        for (let i = 0; i < FRAME_CHUNK_SIZE; i++) {
          frameChunks.push(createTickerImage(mockData, frames.length + i));
        }
        recurse(frames.concat(frameChunks));
      }, 10);
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
