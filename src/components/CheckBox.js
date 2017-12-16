import React from 'react'

function CheckBox({ isChecked, clickFunction }) {

  const captureClick = (event) => {
    event.stopPropagation()
  }
  
  return <input type="checkbox" checked={ isChecked ? "checked" : "" } onClick={ captureClick } onChange={ clickFunction } />
}

export default CheckBox