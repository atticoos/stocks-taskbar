import React from 'react';
import {Line} from 'react-chartjs-2';

const defaultOptions = {
  legend: {
    display: false
  }
};

export default class LineChart extends React.Component {
  static defaultProps = {
    options: {}
  };
  render () {
    var {options, ...props} = this.props;
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: '',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        // backgroundColor: 'rgba(200,200,200,0.4)',
        // borderColor: 'rgba(75,192,192,1)',
        // backgroundColor: 'rgba(200,200,200,0.4)',
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
        data: [65, 59, 80, 81, 56, 55, 40],
      }]
    };
    return (
      <Line
        data={data}
        options={{...defaultOptions, ...options}}
      />
    );
  }
}
