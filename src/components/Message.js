import React, { Component } from 'react'
import Checkbox from './Checkbox'
import Star from './Star'
import Label from './Label'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { messageRead, toggleSelectMessage, toggleStar } from '../actions'

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      body: ''
    }
  }

  toggleMessage = async (event) => {
    if (this.state.expanded) this.setState({ expanded: false })
    else {
      // fetch message body from API
      const messagesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/${ this.props.message.id }`)
      const messagesJson = await messagesResponse.json()
      // set body and expanded into state
      this.setState({ body: messagesJson.body, expanded: true })
    }
    return true
  }

  render() {
    const { id, starred, labels, read, subject } = this.props.message
    const isSelected = this.props.selectedMessages.includes(id) // will be true or false

    return (
      <div>
        <div id={ id } 
            className={ 
                isSelected ? (read ? "row message read selected" : "row message unread selected")
                        : (read ? "row message read" : "row message unread")
            }
            onClick={ (event) => { this.toggleMessage(); this.props.messageRead(event) } }
        >
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <Checkbox isChecked={ isSelected } clickFunction={ this.props.toggleSelectMessage } />
              </div>
              <div className="col-xs-2">
                <Star isStarred={ starred } clickFunction={ this.props.toggleStar } />
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            { labels.map((el, i) => <Label key={ i } label={ el } />)}
            <a>
              { subject }
            </a>
          </div>
        </div>

        { this.state.expanded ?
          <div className="row message-body">
            <div className="col-xs-11 col-xs-offset-1">
              { this.state.body }
            </div>
          </div>
          : ''
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messageList: state.messageList,
  selectedMessages: state.selectedMessages
})

const mapDispatchToProps = dispatch => bindActionCreators({
  messageRead,
  toggleSelectMessage,
  toggleStar
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)