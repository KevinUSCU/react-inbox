import React from 'react'
import Button from './Button'
import Select from './Select'

function Toolbar({ messages, labelOptions, functions }) {
  const unreadMessageCount = messages.filter(el => !el.read).length
  const selectedMessageCount = messages.filter(el => el.selected).length
  const [ toggleSelectAllMessages, applyLabel, removeLabel, deleteMessages, markRead, markUnread ] = functions
  return (
    <div>
      <div className="row toolbar">
        <div className="col-md-12">

          {/* Unread messages badge */}
          { unreadMessageCount > 0 ?
            <p className="pull-right">
              <span className="badge badge">{ unreadMessageCount }</span>
              { unreadMessageCount > 1 ? 'unread messages' : 'unread message' }
            </p>
            : ''
          }

          {/* Select All Button */}
          <Button buttonEnabled={ true }
                  buttonContents={ selectedMessageCount ?
                    selectedMessageCount === messages.length ? <i className="fa fa-check-square-o"></i> 
                      : <i className="fa fa-minus-square-o"></i>
                    : <i className="fa fa-square-o"></i> }
                  clickFunction={ toggleSelectAllMessages }
          />

          <Button buttonEnabled={ selectedMessageCount } 
                  buttonContents="Mark As Read"
                  clickFunction={ markRead }
          />
          
          <Button buttonEnabled={ selectedMessageCount }
                  buttonContents="Mark As Unread"
                  clickFunction={ markUnread }
          />

          <Select selectEnabled={ selectedMessageCount }
                  selectLabel="Apply label"
                  selectOptions={ labelOptions }
                  changeFunction={ applyLabel }
          />

          <Select selectEnabled={ selectedMessageCount } 
                  selectLabel="Remove label"
                  selectOptions={ labelOptions }
                  changeFunction={ removeLabel }
          />

          <Button buttonEnabled={ selectedMessageCount }
                  buttonContents={ <i className="fa fa-trash-o"></i> } 
                  clickFunction={ deleteMessages }
          />

        </div>
      </div>
    </div>
  )
}

export default Toolbar