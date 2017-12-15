import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Toolbar from './components/Toolbar'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <Toolbar />
      </div>
    )
  }
}

export default App
