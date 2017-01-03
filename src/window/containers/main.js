import React from 'react';

export default class Main extends React.Component {
  render () {
    return (
      <div style={{height: '100%'}}>
        {this.props.children}
      </div>
    );
  }
}
