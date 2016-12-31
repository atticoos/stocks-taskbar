import {app, Menu, Tray} from 'electron';
import {buildTray} from './tray';
require('electron-debug')();

app.on('ready', () => {
  buildTray()
});
