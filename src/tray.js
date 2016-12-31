import {Menu, Tray} from 'electron';
import path from 'path';
import stockSource from './stocks';

export function buildTray () {
  console.log('building tray')
  var icon = path.normalize(path.join(__dirname, 'icon.png'));
  var tray = new Tray(icon);
  tray.setToolTip('Stock Ticker');

  stockSource.subscribe(
    data => {
      console.log('data', data)
      var menuItems = buildStockMenu(data);
      tray.setContextMenu(menuItems)
    }
  );

  return tray;
}

function buildStockMenu (stocks) {
  var menuItems = stocks.map(stock => ({
    label: stock.Symbol + ' ' + stock.ChangePercent.toFixed(2),
    type: 'normal'
  }));
  return Menu.buildFromTemplate(menuItems);
}
