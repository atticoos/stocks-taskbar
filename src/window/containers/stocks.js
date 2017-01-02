import React from 'react';
import StockListItem from '../components/stockListItem';

export default class Stocks extends React.Component {
  render () {
    var stocks = [
      'AAPL',
      'TSLA',
      'NVDA',
      'AMD'
    ];
    return (
      <div className="stocks">
        {stocks.map(stock => (
          <StockListItem
            key={stock}
            stock={stock}
          />
        ))}
      </div>
    )
  }
}
