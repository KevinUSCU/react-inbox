import React from 'react'
import CheckBox from './CheckBox'
import Star from './Star'

const isSelected = true
const isRead = false
const isStarred = false
const messageText = 'Here is some message text that has a bunch of stuff - yeah!'
function checkFunction () { console.log('Check toggle!') }
function starFunction () { console.log('Star toggle!') }
function selectMessageFunction () { console.log('Click on message!')}

function Message() {
  return (
    <div className={ 
        isSelected ? (isRead ? "row message read selected" : "row message unread selected")
                  : (isRead ? "row message read" : "row message unread")
      } onClick={ selectMessageFunction }>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <CheckBox isChecked={ isSelected } clickFunction={ checkFunction } />
          </div>
          <div className="col-xs-2">
            <Star isStarred={ isStarred } clickFunction={ starFunction } />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a>
          { messageText }
        </a>
      </div>
    </div>
  )
}

export default Message