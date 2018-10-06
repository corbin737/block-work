import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Approval from './Approval';
import Deployment from './Deployment';
import Submittal from './Submittal';

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <Deployment />
            <Submittal />
            <Approval />
        </React.Fragment>
    );
  }
}

export default App;
