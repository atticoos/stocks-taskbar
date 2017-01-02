import {Menu, Tray} from 'electron';
import path from 'path';
import stockSource from './stocks';
import {createTickerImage} from './graphicGenerator';
import {ipcMain} from 'electron';
import * as ActionTypes from './window/actions/types';

var mockData = [
  {Symbol: 'AAPL', ChangePercent: 3.02},
  {Symbol: 'TSLA', ChangePercent: 1.26},
  {Symbol: 'NVDA', ChangePercent: -5.32},
  {Symbol: 'AMD', ChangePercent: -2.45}
];

export function buildTray (tray) {
  console.log('building tray')
  var animateFrames = createTrayFrameAnimator(tray, FPS);

  var icon = path.normalize(path.join(__dirname, 'icon.png'));
  tray.setToolTip('Stock Ticker');

  generateFrames(mockData).then(frames => animateFrames(frames));

  //tray.setContextMenu(buildStockMenu(mockData));

  /*
  stockSource.subscribe(
    data => {
      var menuItems = buildStockMenu(data);
      tray.setContextMenu(menuItems)
    }
    );
    */

  //var stopRotation = rotateTrayIcon(tray, mockData);
  ipcMain.on('renderer-action', (event, action) => {
    console.log('action', action.type)
    switch (action.type) {
      case ActionTypes.ADD_STOCK_SYMBOL:
        var mockItem = {
          Symbol: action.symbol,
          ChangePercent: Math.random() * 10
        };
        mockData.push(mockItem);
        generateFrames(mockData).then(frames => animateFrames(frames));
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

function generateTickerText (quotes) {
  return quotes
    .map(quote => `$${quote.Symbol} : ${quote.ChangePercent}`)
    .join('  ');
}

const MAX_FRAMES = 200;
const FRAME_CHUNK_SIZE = 20;
const FPS = 40;

function generateFrames (mockData) {
  return new Promise(resolve => {
    function recurse (frames = []) {
      if (frames.length >= MAX_FRAMES) {
        return resolve(frames);
      }
      setImmediate(() => {
        var frameChunks = [];
        console.log('building batch', frames.length);
        for (let i = 0; i < FRAME_CHUNK_SIZE; i++) {
          frameChunks.push(createTickerImage(mockData, frames.length + i));
        }
        recurse(frames.concat(frameChunks));
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

function rotateTrayIcon (tray, mockData) {
  var position = 0;
  var interval;

  generateFrames(mockData).then(frames => {
    interval = setInterval(() => {
      position += 1;
      tray.setImage(frames[position]);

      if (position >= MAX_FRAMES - 1) {
        position = 0;
      }
    }, FPS);
  });


  return () => {
    console.log('clearing interval', interval);
    clearInterval(interval);
  }
}

function buildStockMenu (stocks) {
  var menuItems = stocks.map(stock => ({
    label: stock.Symbol + ' ' + stock.ChangePercent.toFixed(2),
    type: 'normal'
  }));
  return Menu.buildFromTemplate(menuItems);
}
