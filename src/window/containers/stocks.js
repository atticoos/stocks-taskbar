import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import selector from '../selectors/stockScreen';
import StockListItem from '../components/stockListItem';
import * as StockActions from '../actions/stocks';
import {Button, FormControl} from 'react-bootstrap';
require('../styles/stocks.less');

class Stocks extends React.Component {
  render () {
    return (
      <div className="stocks">
        <div className="list">
          {this.props.quotes.map(quote => (
            <StockListItem
              key={quote.symbol}
              stock={quote}
              onRemove={() => this.props.stockActions.removeStock(quote.symbol)}
            />
          ))}
        </div>
        <div className="controls">
          <FormControl
            type="text"
            placeholder="$SYMBOL"
            value={this.props.newStock}
            onChange={event => this.props.stockActions.newStockTextChanged(event.target.value)}
          />
          <Button
            onClick={() => this.props.stockActions.addStock(this.props.newStock)}
          >
            Add
          </Button>
        </div>
      </div>
    )
  }
}

const actions = dispatch => ({
  stockActions: bindActionCreators(StockActions, dispatch)
});

export default connect(selector, actions)(Stocks);
