'use stict';

import React from 'react';
import {render} from 'react-dom';
import App from './containers/app';
import {remote} from 'electron';

console.log(remote.getCurrentWindow());

render(
  <App />,
  document.getElementById('root')
);
