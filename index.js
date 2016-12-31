'use strict';

//import electron from 'electron';
const {app, Menu, Tray} = require('electron');
require('electron-debug')();

function buildTray () {
  var tray = new Tray('./icon.png');
  var menu = Menu.buildFromTemplate([
    {label: '$APPL - +3%', type: 'normal'}
  ]);
  tray.setToolTip('Stock Ticker');
  tray.setContextMenu(menu);
  return tray;
}

app.on('ready', () => {
  buildTray();
});
