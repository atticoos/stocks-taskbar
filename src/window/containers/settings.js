import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Button} from 'react-bootstrap';
require('../styles/settings.less');

class Settings extends React.Component {
  render () {
    return (
      <div className="settings">
        <Button onClick={() => hashHistory.goBack()}>Back</Button>
      </div>
    );
  }
}

export default connect()(Settings);
