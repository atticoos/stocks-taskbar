import React from 'react';
import IconClose from 'react-icons/lib/fa/close';
import IconPlus from 'react-icons/lib/fa/plus';
import IconMinus from 'react-icons/lib/fa/minus';
import {
  Label,
  Table
} from 'react-bootstrap';
require('../styles/stockListItem.less');

export default class StockListItem extends React.Component {
  constructor (props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
  }
  onRemove (e) {
    e.stopPropagation();
    this.props.onRemove();
  }
  render () {
    return (
      <div className="stock-list-item" onClick={this.props.onClick}>
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
          <IconClose color="lightgray" onClick={this.onRemove} />
        </div>
        {!!this.props.stock.symbol && this.props.expanded &&
          <StockDetails
            open={111.35}
            close={112.15}
            low={110.23}
            cap="58.2B"
            pe="55.7B"
            div="0.52%"
          />
        }
      </div>
    );
  }
}

function StockDetails (props) {
  return (
    <Table className="stock-details" condensed>
      <tbody>
        <tr>
          <td>Open</td>
          <td>{props.open}</td>
          <td>Mkt Cap</td>
          <td>{props.cap}</td>
        </tr>
        <tr>
          <td>Close</td>
          <td>{props.close}</td>
          <td>P/E ratio</td>
          <td>{props.pe}</td>
        </tr>
        <tr>
          <td>Low</td>
          <td>{props.low}</td>
          <td>Div yield</td>
          <td>{props.div}</td>
        </tr>
      </tbody>
    </Table>
  )
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
    <Label className="change-percent" bsStyle={positive ? 'success' : 'danger'}>
      {positive && <IconPlus className="positive" />}
      {!positive && <IconMinus className="negiatve" />}
      <span className="change">{Math.abs(change).toFixed(2)}%</span>
    </Label>
  );
}
