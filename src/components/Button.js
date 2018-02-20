import React from 'react'

function Button({ buttonEnabled, buttonAlertStyle, buttonContents, clickFunction }) {
  return (
    <button className={ buttonAlertStyle ? "btn btn-danger" : "btn btn-default" } disabled={ buttonEnabled ? "" : "disabled" } onClick={ clickFunction }>
      { buttonContents }
    </button>
  )
}

export default Button