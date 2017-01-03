import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Button, FormControl} from 'react-bootstrap';
import * as SettingActions from '../actions/settings';
require('../styles/settings.less');

class Settings extends React.Component {
  render () {
    return (
      <div className="settings">
        <Button onClick={() => hashHistory.goBack()}>Back</Button>
        <FormControl
          type="number"
          value={this.props.tickerWidth}
          onChange={event => this.props.settingActions.setTickerWidth(event.target.value)}
        />
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
