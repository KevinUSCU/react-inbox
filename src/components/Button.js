import React from 'react'

function Button({ buttonEnabled, buttonContents, clickFunction }) {
  return (
    <button className="btn btn-default" disabled={ buttonEnabled ? "" : "disabled" } onClick={ clickFunction }>
      { buttonContents }
    </button>
  )
}

export default Button