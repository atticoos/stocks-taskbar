'use stict';

import React from 'react';
import {render} from 'react-dom';

class Test extends React.Component {
  render () {
    return (
      <h1>Hello World</h1>
    );
  }
}

render(
  <Test />,
  document.getElementById('root')
);
