import {Menu, Tray} from 'electron';
import path from 'path';
import stockSource from './stocks';
import {createTickerImage} from './graphicGenerator';

var mockData = [
  {Symbol: 'AAPL', ChangePercent: 3.02},
  {Symbol: 'TSLA', ChangePercent: 1.26},
  {Symbol: 'NVDA', ChangePercent: -5.32},
  {Symbol: 'AMD', ChangePercent: -2.45}
];

export function buildTray () {
  console.log('building tray')
  var icon = path.normalize(path.join(__dirname, 'icon.png'));
  //var tray = new Tray(icon);
  var tray = new Tray(createTickerImage(generateTickerText(mockData)));
  tray.setToolTip('Stock Ticker');

  tray.setContextMenu(buildStockMenu(mockData));

  /*
  stockSource.subscribe(
    data => {
      var menuItems = buildStockMenu(data);
      tray.setContextMenu(menuItems)
    }
    );
    */

  rotateTrayIcon(tray, mockData);

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
    frames.push(createTickerImage(text, i));
  }

  var interval = setInterval(() => {
    position += 1;
    //tray.setImage(createTickerImage(text, position));
    tray.setImage(frames[position]);

    if (position > 200) {
      position = 0;
    }
  }, 40);
}

function buildStockMenu (stocks) {
  var menuItems = stocks.map(stock => ({
    label: stock.Symbol + ' ' + stock.ChangePercent.toFixed(2),
    type: 'normal'
  }));
  return Menu.buildFromTemplate(menuItems);
}
