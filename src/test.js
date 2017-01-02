const React = require('react');
const {render} = require('react-dom');

class Test extends React.Component {
  render () {
    return (
      <div>Test</div>
    );
  }
}

render(
  <Test />,
  document.getElementById('root')
);
