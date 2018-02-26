import React, { Component } from 'react'
import Message from './Message'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getMessageList } from '../actions'

class MessageList extends Component {

  componentDidMount() {
    this.props.getMessageList()
  }

  render() {
    return this.props.messageList.map((el, i) => {
      return <Message key={ i } message={ el } />
    })
  }
}

const mapStateToProps = state => ({
  messageList: state.messageList
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getMessageList
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList)