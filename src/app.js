import menubar from 'menubar';
import path from 'path';
import {buildTray} from './tray';

require('electron-debug')({showDevTools: true});

var mb = menubar({
  index: 'file://' + path.normalize(path.join(__dirname, 'window/index.html')),
  width: 800,
  //width: 300,
  height: 400
});

mb.on('ready', () => {
  buildTray(mb);
});
