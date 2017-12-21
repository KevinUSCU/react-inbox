import React, { Component } from 'react'
import CheckBox from './CheckBox'
import Star from './Star'
import Label from './Label'

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
    const [ toggleCheckBox, toggleStar, messageRead ] = this.props.functions
    const selected = this.props.selected

    return (
      <div>
        <div id={ id } 
            className={ 
                selected ? (read ? "row message read selected" : "row message unread selected")
                        : (read ? "row message read" : "row message unread")
            }
            onClick={ (event) => { this.toggleMessage(); messageRead(event) } }
        >
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <CheckBox isChecked={ selected } clickFunction={ toggleCheckBox } />
              </div>
              <div className="col-xs-2">
                <Star isStarred={ starred } clickFunction={ toggleStar } />
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

export default Message