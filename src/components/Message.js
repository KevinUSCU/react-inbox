import React from 'react'
import CheckBox from './CheckBox'
import Star from './Star'
import Label from './Label'

function Message({ message, functions }) {
  const { id, selected, starred, labels, read, subject } = message
  const [ toggleCheckBox, toggleStar, selectMessage ] = functions
  return (
    <div id={ id } 
         className={ 
            selected ? (read ? "row message read selected" : "row message unread selected")
                     : (read ? "row message read" : "row message unread")
         }
         onClick={ selectMessage }
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
  )
}

export default Message