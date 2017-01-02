import React from 'react';
require('../styles/stockListItem.less');
export default class StockListItem extends React.Component {
  render () {
    return (
      <div className="stock-list-item">
        <div>
          <h2>{this.props.stock.symbol}</h2>
          <a onClick={this.props.onRemove}>remove</a>
        </div>
        {!!this.props.stock.quote &&
          <div>
            <div>Change: {this.props.stock.quote.ChangePercent}</div>
            <div>Price: ${this.props.stock.quote.Price}</div>
          </div>
        }
      </div>
    );
  }
}
