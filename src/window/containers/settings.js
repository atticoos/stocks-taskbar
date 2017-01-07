import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Button, Image, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import * as SettingActions from '../actions/settings';
require('../styles/settings.less');

class Settings extends React.Component {
  render () {
    return (
      <div className="settings">
        <Form onSubmit={e => e.preventDefault()}>
          <h3>Ticker Settings</h3>
          <FormGroup>
            <ControlLabel>Ticker Width</ControlLabel>
            <FormControl
              type="number"
              value={this.props.tickerWidth}
              onChange={event => this.props.settingActions.setTickerWidth(event.target.value)}
            />
          </FormGroup>
          <Button className="connect robinhood">
            <Image
              src={require("file-loader?name=robinhood.jpg!../assets/robinhood.jpg")}
            />
            Connect RobinHood
          </Button>
          <Button className="connect etrade">
            <Image
              src={require('file-loader?name=etrade.jpg!../assets/etrade.jpg')}
            />
            Connect ETrade
          </Button>
        </Form>
        <Button className="back" onClick={() => hashHistory.goBack()}>Back</Button>
      </div>
    );
  }
}

const actions = dispatch => ({
  settingActions: bindActionCreators(SettingActions, dispatch)
});

const selector = state => ({
  tickerWidth: state.settings.tickerWidth
});

export default connect(selector, actions)(Settings);
