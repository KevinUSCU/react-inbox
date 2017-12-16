import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import messageSeeds from './data/seeds'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [...messageSeeds]
    }
  }


  render() {
    return (
      <div className="container">
        <Navbar />
        <Toolbar />
        <MessageList />
      </div>
    )
  }
}

export default App
