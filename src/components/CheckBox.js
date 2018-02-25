import React from 'react'

function Checkbox({ isChecked, clickFunction }) {

  const captureClick = (event) => {
    event.stopPropagation()
  }
  
  return <input type="checkbox" checked={ isChecked ? "checked" : "" } onClick={ captureClick } onChange={ clickFunction } />
}

export default Checkbox