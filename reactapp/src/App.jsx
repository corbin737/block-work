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
  constructor(props) {
      super(props);
      this.state = {
          address: '',
          work: ''
      }
      this.handleContractDeployed = this.handleContractDeployed.bind(this);
      this.handleContractWorked = this.handleContractWorked.bind(this);
      this.isContractWorked = this.isContractWorked.bind(this);
  }

  handleContractDeployed(address) {
      this.setState({ address });
  }

  handleContractWorked(work) {
      this.setState({ work });
  }

  isContractWorked() {
      return !!this.state['work'];
  }

  render() {
    return (
        <React.Fragment>
            <Deployment onContractDeployed={this.handleContractDeployed} />
            {
                this.isContractWorked()
                ? <React.Fragment>
                    <h1>Work submitted:</h1>
                    <p>{this.state['work']}</p>
                    <Approval address={this.state['address']} />
                    <Rejection address={this.state['address']} />
                  </React.Fragment>
                : null
            }
            {/*
            <Submittal />
            <ArbiterApproval />
            <ArbiterRejection />
            */}
        </React.Fragment>
    );
  }
}

export default App;
