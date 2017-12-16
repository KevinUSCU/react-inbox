import React from 'react'

function CheckBox({ isChecked, clickFunction }) {

  const eventFunction = (event) => {
    event.stopPropagation()
    clickFunction()
  }
  
  return <input type="checkbox" checked={ isChecked ? "checked" : "" } onClick={ eventFunction } />
}

export default CheckBox