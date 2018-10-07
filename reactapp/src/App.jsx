import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Approval from './Approval';
import Deployment from './Deployment';
import Submittal from './Submittal';
import Rejection from './Rejection';
import ArbiterApproval from './ArbiterApproval';
import ArbiterRejection from './ArbiterRejection';

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <Deployment />
            {/*
            <Submittal />
            <Approval />
            <Rejection />
            <ArbiterApproval />
            <ArbiterRejection />
            */}
        </React.Fragment>
    );
  }
}

export default App;
