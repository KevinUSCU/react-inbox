import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import messageSeeds from './data/seeds'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [ ...messageSeeds ],
      labelOptions: [ 'dev', 'personal', 'gschool' ]
    }
  }

  // TOOLBAR FUNCTIONS
  toggleSelectAllMessages = () => {
    console.log('Messages selected!!!')
  }

  applyLabel = () => {
    console.log('Label Applied!!!')
  }

  removeLabel = () => {
    console.log('Label Removed!!!')
  }

  deleteMessages = () => {
    console.log('Deleted!!!')
  }

  markRead = () => {
    console.log('Marked Read!!!')
  }

  markUnread = () => {
    console.log('Marked Unread!!!')
  }

  // MESSAGELIST FUNCTIONS
  toggleCheckBox () { console.log('Check toggle!') }
  toggleStar () { console.log('Star toggle!') }
  selectMessage () { console.log('Click on message!')}

  render() {
    return (
      <div className="container">
        <Navbar />
        <Toolbar messages={ this.state.messages }
                 labelOptions={ this.state.labelOptions }
                 functions={[ this.toggleSelectAllMessages, this.applyLabel, this.removeLabel, this.deleteMessages, this.markRead, this.markUnread ]}
        />
        <MessageList messages={ this.state.messages }
                     functions={[ this.toggleCheckBox, this.toggleStar, this.selectMessage ]}
        />
      </div>
    )
  }
}

export default App
