import React from 'react';
import Navbar from './components/Navbar'
import Toolbar from './components/Toolbar'
import ComposeForm from './components/ComposeForm'
import MessageList from './components/MessageList'

import { connect } from 'react-redux'

function App (props) {
  return (
    <div className="container">
      <Navbar />
      <Toolbar />
      { props.composeFormVisible && <ComposeForm /> }
      <MessageList />
    </div>
  )
}

const mapStateToProps = state => ({
  composeFormVisible: state.composeFormVisible
})

export default connect(
  mapStateToProps
)(App)
