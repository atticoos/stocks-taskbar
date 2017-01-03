import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import selector from '../selectors/stockScreen';
import StockListItem from '../components/stockListItem';
import CogIcon from 'react-icons/lib/fa/cog';
import * as StockActions from '../actions/stocks';
import {
  Button,
  Form,
  FormControl,
  FormGroup
} from 'react-bootstrap';
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
          <Form onSubmit={(e) => e.preventDefault() && this.props.stockActions.addStock(this.props.newStock)}>
          <FormControl
            type="text"
            placeholder="$SYMBOL"
            value={this.props.newStock}
            onChange={event => this.props.stockActions.newStockTextChanged(event.target.value)}
          />
        <Button
            className="settings-button"
            onClick={() => {}}
          >
            <CogIcon color="lightgray" />
          </Button>
          <button
            type="submit"
            onClick={() => this.props.stockActions.addStock(this.props.newStock)}
            style={{display: 'none'}}
          />
        </Form>
        </div>
      </div>
    )
  }
}

const actions = dispatch => ({
  stockActions: bindActionCreators(StockActions, dispatch)
});

export default connect(selector, actions)(Stocks);
