import React from 'react';
import IconClose from 'react-icons/lib/fa/close';
import IconPlus from 'react-icons/lib/fa/plus';
import IconMinus from 'react-icons/lib/fa/minus';
import {
  Label
} from 'react-bootstrap';
require('../styles/stockListItem.less');

export default class StockListItem extends React.Component {
  render () {
    return (
      <div className="stock-list-item">
        <div className="row-heading">
          <h3>
            <span className="stock-symbol">
              {this.props.stock.symbol}
            </span>
            {!!this.props.stock.quote &&
              <Quote
                change={this.props.stock.quote.ChangePercent}
                price={this.props.stock.quote.Price}
              />
            }
          </h3>
          <IconClose color="lightgray" onClick={this.props.onRemove} />
        </div>
      </div>
    );
  }
}

function Quote ({change, price}) {
  return (
    <div className="stock-quote">
      <span className="price">{price}</span>
      <ChangePercent percent={change} />
    </div>
  );
}

function ChangePercent ({percent}) {
  var change = parseFloat(percent);
  var positive = percent > 0;

  return (
    <Label cssClass="change-percent" bsStyle={positive ? 'success' : 'danger'}>
      {positive && <IconPlus cssClass="positive" />}
      {!positive && <IconMinus cssClass="negiatve" />}
      <span cssClass="change">{Math.abs(change).toFixed(2)}%</span>
    </Label>
  );
}
