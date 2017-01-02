import menubar from 'menubar';
import path from 'path';
import {buildTray} from './tray';

var mb = menubar({
  index: 'file://' + path.normalize(path.join(__dirname, 'index.html'))
});

mb.on('ready', () => {
  buildTray(mb.tray);
});
