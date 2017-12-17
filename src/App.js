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
    this.setState((prevState) => {
      const allMessagesSelected = (prevState.messages.filter(el => el.selected).length === prevState.messages.length)
      const newMessages = prevState.messages.map(el => {
        allMessagesSelected ? el.selected = false : el.selected = true
        return el
      })
      return { messages: newMessages }
    })
  }

  applyLabel = (event) => {
    const label = event.target.value
    if (label) { // ignores cases where the selection header is selected
      this.setState((prevState) => {
        const newMessages = prevState.messages.map(el => {
          if (el.selected) {
            if (!el.labels.includes(label)) {
              const newLabels = [ ...el.labels, label ]
              el.labels = newLabels
            } 
          }
          return el
        })
        return { messages: newMessages }
      })
    }
  }

  removeLabel = (event) => {
    const label = event.target.value
    if (label) { // ignores cases where the selection header is selected
      this.setState((prevState) => {
        const newMessages = prevState.messages.map(el => {
          if (el.selected) {
            const newLabels = el.labels.filter(el => el !== label)
            el.labels = newLabels 
          }
          return el
        })
        return { messages: newMessages }
      })
    }
  }

  deleteMessages = () => {
    this.setState((prevState) => {
      const newMessages = prevState.messages.filter(el => !el.selected)
      return { messages: newMessages }
    })
  }

  markRead = () => {
    this.setState((prevState) => {
      const newMessages = prevState.messages.map(el => {
        if (el.selected) el.read = true
        return el
      })
      return { messages: newMessages }
    })
  }

  markUnread = () => {
    this.setState((prevState) => {
      const newMessages = prevState.messages.map(el => {
        if (el.selected) el.read = false
        return el
      })
      return { messages: newMessages }
    })
  }

  // MESSAGELIST FUNCTIONS
  toggleCheckBox = (event) => { 
    const messageId = Number(event.target.closest('.message').id)
    this.setState((prevState) => {
      const newMessages = [ ...prevState.messages ]
      const index = newMessages.findIndex(el => el.id === messageId)
      newMessages[index].selected = !newMessages[index].selected
      return { messages: newMessages }
    })
  }

  toggleStar = (event) => {
    const messageId = Number(event.target.closest('.message').id)
    this.setState((prevState) => {
      const newMessages = [ ...prevState.messages ]
      const index = newMessages.findIndex(el => el.id === messageId)
      newMessages[index].starred = !newMessages[index].starred
      return { messages: newMessages }
    })
  }

  selectMessage = (event) => {
    const messageId = Number(event.target.closest('.message').id)
    this.setState((prevState) => {
      const newMessages = [ ...prevState.messages ]
      const index = newMessages.findIndex(el => el.id === messageId)
      newMessages[index].read = true
      return { messages: newMessages }
    })
  }

  // RENDER
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
