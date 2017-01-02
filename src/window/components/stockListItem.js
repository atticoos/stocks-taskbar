import React from 'react';
import IconClose from 'react-icons/lib/fa/close';
require('../styles/stockListItem.less');

export default class StockListItem extends React.Component {
  render () {
    return (
      <div className="stock-list-item">
        <div className="row-heading">
          <h3>
            {this.props.stock.symbol}
            {' '}
            {!!this.props.stock.quote && this.props.stock.quote.ChangePercent}
          </h3>
          <IconClose color="lightblue" onClick={this.props.onRemove} />
        </div>
        {!!this.props.stock.quote &&
            <div className="meta">
            <div className="item">
              <span className="item-label">Price:</span>
              <span className="item-value">${this.props.stock.quote.Price}</span>
            </div>
          </div>
        }
      </div>
    );
  }
}
