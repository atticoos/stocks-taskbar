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
  var icon = path.normalize(path.join(__dirname, 'icon.png'));
  tray.setToolTip('Stock Ticker');

  //tray.setContextMenu(buildStockMenu(mockData));

  /*
  stockSource.subscribe(
    data => {
      var menuItems = buildStockMenu(data);
      tray.setContextMenu(menuItems)
    }
    );
    */

  var interval = rotateTrayIcon(tray, mockData);
  ipcMain.on('renderer-action', (event, action) => {
    console.log('action', action.type)
    switch (action.type) {
      case ActionTypes.ADD_STOCK_SYMBOL:
        var mockItem = {
          Symbol: action.symbol,
          ChangePercent: Math.random() * 10
        };
        mockData.push(mockItem);
        clearInterval(interval);
        interval = rotateTrayIcon(tray, mockData);
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
        clearInterval(interval);
        interval = rotateTrayIcon(tray, mockData);
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

function rotateTrayIcon (tray, mockData) {
  var position = 0;
  var text = generateTickerText(mockData);
  var frames = [];
  for (let i = 0; i < 202; i++) {
    frames.push(createTickerImage(mockData, i));
  }

  var interval = setInterval(() => {
    position += 1;
    //tray.setImage(createTickerImage(text, position));
    tray.setImage(frames[position]);

    if (position > 200) {
      position = 0;
    }
  }, 40);

  return interval;
}

function buildStockMenu (stocks) {
  var menuItems = stocks.map(stock => ({
    label: stock.Symbol + ' ' + stock.ChangePercent.toFixed(2),
    type: 'normal'
  }));
  return Menu.buildFromTemplate(menuItems);
}
