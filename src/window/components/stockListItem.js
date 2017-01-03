import React from 'react';
import IconClose from 'react-icons/lib/fa/close';
import IconPlus from 'react-icons/lib/fa/plus';
import IconMinus from 'react-icons/lib/fa/minus';
import {
  Label,
  Table
} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';
require('../styles/stockListItem.less');

// console.log('test', Charts)

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    legend: {
      display: false
    },
  datasets: [
    {
      legend: {
        display: false
      },
      label: '',
      // label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      backgroundColor: 'rgba(200,200,200,0.4)',
      // borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(200,200,200,0.4)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      // pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
var chartOptions = {
  legend: {
    display: false
  }
}
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
          <div>
            <StockDetails
              open={111.35}
              close={112.15}
              low={110.23}
              cap="58.2B"
              pe="55.7B"
              div="0.52%"
            />
            <Line data={data} options={chartOptions} />
          </div>
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
