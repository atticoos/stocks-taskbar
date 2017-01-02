import React from 'react';
require('../styles/stockListItem.less');
export default class StockListItem extends React.Component {
  render () {
    return (
      <div className="stock-list-item">
        <h2>{this.props.stock.symbol}</h2>
        <a onClick={this.props.onRemove}>remove</a>
      </div>
    );
  }
}
