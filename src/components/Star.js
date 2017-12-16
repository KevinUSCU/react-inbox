import React from 'react'

function Star({ isStarred, clickFunction }) {

  const eventFunction = (event) => {
    event.stopPropagation()
    clickFunction()
  }

  return <i className={ isStarred ? "star fa fa-star" : "star fa fa-star-o" } onClick={ eventFunction }></i>
}

export default Star