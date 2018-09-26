import React, { Component } from 'react';
import './App.css';
import Calc from './components/Calc';
import 'bootstrap/dist/css/bootstrap.css';
class App extends Component {
  render() {
    return (
      <div className="container">

      <Calc/>
      </div>
    );
  }
}

export default App;
