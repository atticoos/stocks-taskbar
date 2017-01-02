'use stict';

import React from 'react';
import {render} from 'react-dom';
import App from './containers/app';
import {remote} from 'electron';
require('./styles/main.less');

render(
  <App />,
  document.getElementById('root')
);
