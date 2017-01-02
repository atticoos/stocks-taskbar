import menubar from 'menubar';
import path from 'path';
import {buildTray} from './tray';

require('electron-debug')({showDevTools: true});

var mb = menubar({
  index: 'file://' + path.normalize(path.join(__dirname, 'index.html')),
  width: 800
});

mb.on('ready', () => {
  buildTray(mb.tray);
});
