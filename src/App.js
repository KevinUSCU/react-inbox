import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Toolbar from './components/Toolbar'
import ComposeForm from './components/ComposeForm'
import MessageList from './components/MessageList'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      selected: [],
      labelOptions: [ 'dev', 'personal', 'gschool' ],
      composeFormVisible: false
    }
  }

  // LOAD STATE ON MOUNT
  async componentDidMount() {
    const messagesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const messagesJson = await messagesResponse.json()
    this.setState({ messages: messagesJson._embedded.messages })
  }

  // UPDATE FUNCTION
  updateMessages = async (messageIds, command, attribute) => {
    const request = {
      messageIds,
      command
    }
    if (attribute) {
      const key = Object.keys(attribute)[0]
      request[key] = attribute[key]
    }
    // Send updated data to API
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    // Update local state from API
    const messagesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const messagesJson = await messagesResponse.json()
    this.setState({ messages: messagesJson._embedded.messages })
  }

  // TOOLBAR FUNCTIONS
  toggleComposeForm = () => {
    this.setState(prevState => {
      return { composeFormVisible: !prevState.composeFormVisible }
    })
  }

  sendMessage = async (event) => {
    // prevent default refresh
    event.preventDefault()
    // get form values
    const subject = event.target.subject.value
    const body = event.target.subject.value
    // Send post data to API
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'POST',
      body: JSON.stringify({ subject, body }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    // Update local state from API & close form
    const messagesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const messagesJson = await messagesResponse.json()
    this.setState({ composeFormVisible: false, messages: messagesJson._embedded.messages })
  }

  toggleSelectAllMessages = () => {
    // note that selected state is not server-side persistant, so we will only save it to local state
    this.setState((prevState) => {
      const allMessagesSelected = (prevState.selected.length === prevState.messages.length)
      // if all messages are selected, deselect all; otherwise select all
      if (allMessagesSelected) return { selected: [] }
      else {
        const newSelected = prevState.messages.map(message => message.id)
        return { selected: newSelected }
      }
    })
  }

  applyLabel = (event) => {
    const label = event.target.value
    event.target.selectedIndex = 0 // reset selection box to default
    if (label) { // ignores cases where the selection header is selected
      this.updateMessages(this.state.selected, 'addLabel', { label })
    }
  }

  removeLabel = (event) => {
    const label = event.target.value
    event.target.selectedIndex = 0 // reset selection box to default
    if (label) { // ignores cases where the selection header is selected
      this.updateMessages(this.state.selected, 'removeLabel', { label })
    }
  }

  deleteMessages = () => {
    this.updateMessages(this.state.selected, 'delete')
    this.setState({ selected: [] }) // empty selected list since they are deleted
  }

  markRead = () => {
    this.updateMessages(this.state.selected, 'read', { read: true })
  }

  markUnread = () => {
    this.updateMessages(this.state.selected, 'read', { read: false })
  }

  // MESSAGELIST FUNCTIONS
  toggleCheckBox = (event) => { 
    const messageId = Number(event.target.closest('.message').id)
    this.setState((prevState) => {
      const newSelected = [ ...prevState.selected ] //make copy
      const index = newSelected.indexOf(messageId) //check for currently selected
      if (index >= 0) newSelected.splice(index, 1) //remove from selected
      else newSelected.push(messageId) //add to selected
      return { selected: newSelected }
    })
  }

  toggleStar = (event) => {
    const messageId = Number(event.target.closest('.message').id)
    const currentState = this.state.messages.filter(el => el.id === messageId)[0].starred
    this.updateMessages([ messageId ], 'star', { star: !currentState })
  }

  messageRead = (event) => {
    const messageId = Number(event.target.closest('.message').id)
    this.updateMessages([ messageId ], 'read', { read: true })
  }

  // RENDER
  render() {
    return (
      <div className="container">
        <Navbar />
        <Toolbar messages={ this.state.messages }
                 selected={ this.state.selected }
                 labelOptions={ this.state.labelOptions }
                 functions={[ this.toggleComposeForm, this.toggleSelectAllMessages, this.applyLabel, this.removeLabel, this.deleteMessages, this.markRead, this.markUnread ]}
        />
        { this.state.composeFormVisible && <ComposeForm function={ this.sendMessage }/> }
        <MessageList messages={ this.state.messages }
                     selected={ this.state.selected }
                     functions={[ this.toggleCheckBox, this.toggleStar, this.messageRead ]}
        />
      </div>
    )
  }
}

export default App
