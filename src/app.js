import menubar from 'menubar';
import path from 'path';
import {buildTray} from './tray';
import {ipcMain} from 'electron';

require('electron-debug')({showDevTools: true});

var mb = menubar({
  index: 'file://' + path.normalize(path.join(__dirname, 'window/index.html')),
  width: 800
});

mb.on('ready', () => {
  buildTray(mb.tray);

  ipcMain.on('renderer-action', (event, args) => {
    console.log('received from UI side', args);
  });
});
