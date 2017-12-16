import React from 'react'
import Button from './Button'

let messageSelected = true
let allMessagesSelected = false

function selectMessages() {
  console.log('Messages selected!!!')
}

function applyLabel() {
  console.log('Label Applied!!!')
}

function removeLabel() {
  console.log('Label Removed!!!')
}

function deleteMessages() {
  console.log('Deleted!!!')
}

function markUnread() {
  console.log('Marked Unread!!!')
}

function markRead() {
  console.log('Marked Read!!!')
}

function Toolbar() {
  return (
    <div>
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{ 2 }</span>
            { true ? 'unread messages' : 'unread message' }
          </p>

          {/* Select All Button */}
          <Button buttonEnabled={ true }
                  buttonContents={ messageSelected ?
                    allMessagesSelected ? <i className="fa fa-check-square-o"></i> : <i className="fa fa-minus-square-o"></i>
                    : <i className="fa fa-square-o"></i> }
                  clickFunction={ selectMessages }
          />

          <Button buttonEnabled={ messageSelected } buttonContents={ 'Mark As Read' } clickFunction={ markRead } />
          
          <Button buttonEnabled={ messageSelected } buttonContents={ 'Mark As Unread' } clickFunction={ markUnread } />

          <select className="form-control label-select" disabled={ messageSelected ? "" : "disabled" } onChange={ applyLabel }>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={ messageSelected ? "" : "disabled" } onChange={ removeLabel }>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <Button buttonEnabled={ messageSelected }
                  buttonContents={ <i className="fa fa-trash-o"></i> } 
                  clickFunction={ deleteMessages }
          />
        </div>
      </div>
    </div>
  )
}

export default Toolbar