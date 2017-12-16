import React from 'react'
import CheckBox from './CheckBox'
import Star from './Star'
import Label from './Label'

function checkFunction () { console.log('Check toggle!') }
function starFunction () { console.log('Star toggle!') }
function selectMessageFunction () { console.log('Click on message!')}

function Message({ message }) {
  const { selected, starred, labels, read, subject } = message
  return (
    <div className={ 
        selected ? (read ? "row message read selected" : "row message unread selected")
                  : (read ? "row message read" : "row message unread")
      } onClick={ selectMessageFunction }>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <CheckBox isChecked={ selected } clickFunction={ checkFunction } />
          </div>
          <div className="col-xs-2">
            <Star isStarred={ starred } clickFunction={ starFunction } />
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
  )
}

export default Message