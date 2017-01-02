import menubar from 'menubar';
import {buildTray} from './tray';

var mb = menubar();

mb.on('ready', () => {
  buildTray(mb.tray);
});
