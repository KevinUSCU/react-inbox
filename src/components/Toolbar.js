import React from 'react'
import Button from './Button'
import Select from './Select'

let messageSelected = true
let allMessagesSelected = false
const applyLabelOptions = [ 'Apply label', 'dev', 'personal', 'gschool' ]
const removeLabelOptions = [ 'Remove label', 'dev', 'personal', 'gschool' ]

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

          <Select selectEnabled={ messageSelected } selectOptions={ applyLabelOptions } changeFunction={ applyLabel } />

          <Select selectEnabled={ messageSelected } selectOptions={ removeLabelOptions } changeFunction={ removeLabel } />

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