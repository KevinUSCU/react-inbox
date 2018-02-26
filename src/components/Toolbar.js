import React from 'react'
import Button from './Button'
import Select from './Select'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
  toggleComposeForm, 
  toggleSelectAllMessages, 
  applyLabel, 
  removeLabel, 
  deleteMessages, 
  markRead, 
  markUnread 
} from '../actions'

function Toolbar(props) {
  const unreadMessageCount = props.messageList.filter(el => !el.read).length
  const selectedMessageCount = props.selectedMessages.length
  return (
    <div>
      <div className="row toolbar">
        <div className="col-md-12">

          {/* Unread messages badge */}
          <p className="pull-right">
            { unreadMessageCount > 0 ? <span className="badge badge">{ unreadMessageCount }</span> : 'no ' }
            { unreadMessageCount === 1 ? 'unread message' : 'unread messages' }
          </p>

          <Button buttonEnabled={ true }
                  buttonAlertStyle={ true }
                  buttonContents={ <i className="fa fa-plus"></i> }
                  clickFunction={ props.toggleComposeForm }
          />

          {/* Select All Button */}
          <Button buttonEnabled={ true }
                  buttonContents={ selectedMessageCount ?
                    selectedMessageCount === props.messageList.length ? <i className="fa fa-check-square-o"></i> 
                      : <i className="fa fa-minus-square-o"></i>
                    : <i className="fa fa-square-o"></i> }
                  clickFunction={ () => props.toggleSelectAllMessages(props.messageList) }
          />

          <Button buttonEnabled={ selectedMessageCount } 
                  buttonContents="Mark As Read"
                  clickFunction={ props.markRead }
          />
          
          <Button buttonEnabled={ selectedMessageCount }
                  buttonContents="Mark As Unread"
                  clickFunction={ props.markUnread }
          />

          <Select selectEnabled={ selectedMessageCount }
                  selectLabel="Apply label"
                  selectOptions={ props.labelOptions }
                  changeFunction={ props.applyLabel }
          />

          <Select selectEnabled={ selectedMessageCount } 
                  selectLabel="Remove label"
                  selectOptions={ props.labelOptions }
                  changeFunction={ props.removeLabel }
          />

          <Button buttonEnabled={ selectedMessageCount }
                  buttonContents={ <i className="fa fa-trash-o"></i> } 
                  clickFunction={ props.deleteMessages }
          />

        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  labelOptions: state.labelOptions,
  messageList: state.messageList,
  selectedMessages: state.selectedMessages
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleComposeForm, 
  toggleSelectAllMessages, 
  applyLabel, 
  removeLabel, 
  deleteMessages, 
  markRead, 
  markUnread
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)