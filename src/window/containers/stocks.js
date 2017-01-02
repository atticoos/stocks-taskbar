import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StockListItem from '../components/stockListItem';
import * as StockActions from '../actions/stocks';

class Stocks extends React.Component {
  render () {
    return (
      <div className="stocks">
        {this.props.stocks.map(stock => (
          <StockListItem
            key={stock}
            stock={stock}
            onRemove={() => this.props.stockActions.removeStock(stock)}
          />
        ))}
        <div className="controls">
          <input
            type="text"
            value={this.props.newStock}
            onChange={event => this.props.stockActions.newStockTextChanged(event.target.value)}
          />
          <button
            onClick={() => this.props.stockActions.addStock(this.props.newStock)}
          >
            Add Stock
          </button>
        </div>
      </div>
    )
  }
}

const actions = dispatch => ({
  stockActions: bindActionCreators(StockActions, dispatch)
});

const selector = state => ({
  stocks: state.stocks,
  newStock: state.newStock
});

export default connect(selector, actions)(Stocks);
